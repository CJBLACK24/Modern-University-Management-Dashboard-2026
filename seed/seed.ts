import "dotenv/config";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inArray } from "drizzle-orm";

import { db } from "../db";
import {
  account,
  classes,
  departments,
  enrollments,
  session,
  subjects,
  user,
} from "../db/schema";

async function checkConnection() {
  try {
    console.log("🔌 Testing database connection...");
    // Just a simple query to see if it works
    await db.select().from(user).limit(1);
    console.log("✅ Database connection successful!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}

type SeedUser = {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
  password: string;
  image: string;
  yearLevel?: number;
  section?: string;
};

type SeedDepartment = {
  code: string;
  name: string;
  description: string;
};

type SeedSubject = {
  code: string;
  name: string;
  description: string;
  departmentCode: string;
};

type SeedClass = {
  name: string;
  description: string;
  capacity: number;
  status: "active" | "inactive" | "archived";
  inviteCode: string;
  subjectCode: string;
  teacherId: string;
  bannerUrl: string;
};

type SeedEnrollment = {
  classInviteCode: string;
  studentId: string;
};

type SeedData = {
  users: SeedUser[];
  departments: SeedDepartment[];
  subjects: SeedSubject[];
  classes: SeedClass[];
  enrollments: SeedEnrollment[];
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadSeedData = async (): Promise<SeedData> => {
  const dataPath = path.join(__dirname, "data.json");
  const raw = await readFile(dataPath, "utf-8");
  return JSON.parse(raw) as SeedData;
};

const ensureMapValue = <T>(map: Map<string, T>, key: string, label: string) => {
  const value = map.get(key);
  if (!value) {
    throw new Error(`Missing ${label} for key: ${key}`);
  }
  return value;
};

const seed = async () => {
  const data = await loadSeedData();

  await db.delete(enrollments);
  await db.delete(classes);
  await db.delete(subjects);
  await db.delete(departments);
  await db.delete(session);
  await db.delete(account);
  await db.delete(user);

  if (data.users.length) {
    // Batch users and accounts
    const BATCH_SIZE = 500;
    for (let i = 0; i < data.users.length; i += BATCH_SIZE) {
      const batch = data.users.slice(i, i + BATCH_SIZE);
      await db
        .insert(user)
        .values(
          batch.map((seedUser) => ({
            id: seedUser.id,
            name: seedUser.name,
            email: seedUser.email,
            emailVerified: true,
            image: seedUser.image,
            role: seedUser.role,
            yearLevel: seedUser.yearLevel,
            section: seedUser.section,
          }))
        )
        .onConflictDoNothing({ target: user.id });

      await db
        .insert(account)
        .values(
          batch.map((seedUser) => ({
            id: `acc_${seedUser.id}`,
            userId: seedUser.id,
            accountId: seedUser.email,
            providerId: "credentials",
            password: seedUser.password,
          }))
        )
        .onConflictDoNothing({
          target: [account.providerId, account.accountId],
        });
    }
  }

  if (data.departments.length) {
    await db
      .insert(departments)
      .values(
        data.departments.map((dept) => ({
          code: dept.code,
          name: dept.name,
          description: dept.description,
        }))
      )
      .onConflictDoNothing({ target: departments.code });
  }

  const departmentCodes = data.departments.map((dept) => dept.code);
  const departmentRows =
    departmentCodes.length === 0
      ? []
      : await db
          .select({ id: departments.id, code: departments.code })
          .from(departments)
          .where(inArray(departments.code, departmentCodes));
  const departmentMap = new Map(
    departmentRows.map((row) => [row.code, row.id])
  );

  if (data.subjects.length) {
    const BATCH_SIZE = 500;
    for (let i = 0; i < data.subjects.length; i += BATCH_SIZE) {
      const batch = data.subjects.slice(i, i + BATCH_SIZE);
      await db
        .insert(subjects)
        .values(
          batch.map((subject) => ({
            code: subject.code,
            name: subject.name,
            description: subject.description,
            departmentId: ensureMapValue(
              departmentMap,
              subject.departmentCode,
              "department"
            ),
          }))
        )
        .onConflictDoNothing({ target: subjects.code });
    }
  }

  const subjectCodes = data.subjects.map((subject) => subject.code);
  const subjectRows =
    subjectCodes.length === 0
      ? []
      : await db
          .select({ id: subjects.id, code: subjects.code })
          .from(subjects)
          .where(inArray(subjects.code, subjectCodes));
  const subjectMap = new Map(subjectRows.map((row) => [row.code, row.id]));

  if (data.classes.length) {
    const BATCH_SIZE = 500;
    for (let i = 0; i < data.classes.length; i += BATCH_SIZE) {
      const batch = data.classes.slice(i, i + BATCH_SIZE);
      await db
        .insert(classes)
        .values(
          batch.map((classItem) => ({
            name: classItem.name,
            description: classItem.description,
            capacity: classItem.capacity,
            status: classItem.status,
            inviteCode: classItem.inviteCode,
            subjectId: ensureMapValue(
              subjectMap,
              classItem.subjectCode,
              "subject"
            ),
            teacherId: classItem.teacherId,
            bannerUrl: classItem.bannerUrl,
            bannerCldPubId: null,
            schedules: [],
          }))
        )
        .onConflictDoNothing({ target: classes.inviteCode });
    }
  }

  const classInviteCodes = data.classes.map(
    (classItem) => classItem.inviteCode
  );
  const classRows = await db
    .select({ id: classes.id, inviteCode: classes.inviteCode })
    .from(classes)
    .where(inArray(classes.inviteCode, classInviteCodes));
  const classMap = new Map(classRows.map((row) => [row.inviteCode, row.id]));

  if (data.enrollments.length) {
    const BATCH_SIZE = 1000;
    for (let i = 0; i < data.enrollments.length; i += BATCH_SIZE) {
      const batch = data.enrollments.slice(i, i + BATCH_SIZE);
      await db
        .insert(enrollments)
        .values(
          batch.map((enrollment) => ({
            studentId: enrollment.studentId,
            classId: ensureMapValue(
              classMap,
              enrollment.classInviteCode,
              "class"
            ),
          }))
        )
        .onConflictDoNothing();
    }
  }
};

const main = async () => {
  try {
    await checkConnection();
    await seed();
    console.log("✅ Seed completed.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
};

main();
