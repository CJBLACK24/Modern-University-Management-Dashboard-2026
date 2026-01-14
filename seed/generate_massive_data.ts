import fs from "fs";
import { z } from "zod";

// Zod schemas for the seed data following rules.md (Zod is mandatory)
const SeedUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["student", "teacher", "admin"]),
  password: z.string(),
  image: z.string().optional(),
  yearLevel: z.number().optional(),
  section: z.string().optional(),
  departmentCode: z.string().optional(),
});

const SeedDepartmentSchema = z.object({
  code: z.string(),
  name: z.string(),
  description: z.string(),
});

const SeedSubjectSchema = z.object({
  code: z.string(),
  name: z.string(),
  description: z.string(),
  departmentCode: z.string(),
});

const SeedClassSchema = z.object({
  name: z.string(),
  description: z.string(),
  capacity: z.number(),
  status: z.enum(["active", "inactive", "archived"]),
  inviteCode: z.string(),
  subjectCode: z.string(),
  teacherId: z.string(),
  bannerUrl: z.string().optional(),
});

const SeedEnrollmentSchema = z.object({
  classInviteCode: z.string(),
  studentId: z.string(),
});

const SeedDataSchema = z.object({
  users: z.array(SeedUserSchema),
  departments: z.array(SeedDepartmentSchema),
  subjects: z.array(SeedSubjectSchema),
  classes: z.array(SeedClassSchema),
  enrollments: z.array(SeedEnrollmentSchema),
});

type SeedUser = z.infer<typeof SeedUserSchema>;
type SeedDepartment = z.infer<typeof SeedDepartmentSchema>;
type SeedSubject = z.infer<typeof SeedSubjectSchema>;
type SeedClass = z.infer<typeof SeedClassSchema>;
type SeedEnrollment = z.infer<typeof SeedEnrollmentSchema>;

// Real Departments from User Request
const departmentsList = [
  {
    code: "BSCE",
    name: "BS Civil Engineering",
    desc: "The official department for BS Civil Engineering",
  },
  {
    code: "BSBA",
    name: "BS Business Administration",
    desc: "The official department for BS Business Administration",
  },
  {
    code: "ABE",
    name: "AB English",
    desc: "The official department for AB English",
  },
  {
    code: "BSHM",
    name: "BS Hospitality Management",
    desc: "The official department for BS Hospitality Management",
  },
  {
    code: "BSOA",
    name: "BS Office Administration",
    desc: "The official department for BS Office Administration",
  },
  {
    code: "ABPS",
    name: "AB Political Science",
    desc: "The official department for AB Political Science",
  },
  {
    code: "BSEE",
    name: "BS Electrical Engineering",
    desc: "The official department for BS Electrical Engineering",
  },
  {
    code: "BSMARE",
    name: "BS Marine Engineering",
    desc: "The official department for BS Marine Engineering",
  },
  {
    code: "BSBIO",
    name: "BS Biology",
    desc: "The official department for BS Biology",
  },
  {
    code: "BSMT",
    name: "BS Marine Transportation",
    desc: "The official department for BS Marine Transportation",
  },
];

const departments: SeedDepartment[] = departmentsList.map((d) => ({
  code: d.code,
  name: d.name,
  description: d.desc,
}));

// Name Generator Helpers
const firstNames = [
  "Emmanuel",
  "Angelo",
  "Juan",
  "Maria",
  "Jose",
  "Kristine",
  "Michael",
  "James",
  "John",
  "Robert",
  "Jennifer",
  "Linda",
  "Elizabeth",
  "David",
  "William",
  "Richard",
  "Joseph",
  "Thomas",
  "Charles",
  "Daniel",
  "Matthew",
  "Anthony",
  "Donald",
  "Mark",
  "Paul",
  "Steven",
  "Andrew",
  "Kenneth",
  "Joshua",
  "Kevin",
  "Brian",
  "George",
  "Edward",
  "Ronald",
  "Timothy",
  "Jason",
  "Jeffrey",
  "Ryan",
  "Jacob",
  "Gary",
  "Nicholas",
  "Eric",
  "Jonathan",
  "Stephen",
  "Larry",
  "Justin",
  "Scott",
  "Brandon",
  "Benjamin",
  "Samuel",
  "Gregory",
  "Frank",
  "Alexander",
  "Patrick",
  "Raymond",
  "Jack",
  "Dennis",
  "Jerry",
  "Tyler",
  "Aaron",
  "Jose",
  "Adam",
  "Henry",
  "Nathan",
  "Douglas",
  "Zachary",
  "Peter",
  "Kyle",
  "Walter",
  "Harold",
  "Jeremy",
  "Ethan",
  "Carl",
  "Keith",
  "Roger",
  "Gerald",
  "Christian",
  "Terry",
  "Sean",
  "Arthur",
  "Austin",
  "Noah",
  "Lawrence",
  "Jesse",
  "Joe",
  "Bryan",
  "Billy",
  "Jordan",
  "Albert",
  "Dylan",
  "Bruce",
  "Willie",
  "Gabriel",
  "Alan",
  "Juan",
  "Logan",
  "Wayne",
  "Ralph",
  "Roy",
  "Eugene",
  "Randy",
  "Vincent",
  "Russell",
  "Louis",
  "Philip",
  "Bobby",
  "Johnny",
  "Bradley",
  "Kian",
  "Clyde",
];

const lastNames = [
  "Penas",
  "Dela Cruz",
  "Santos",
  "Reyes",
  "Garcia",
  "Bautista",
  "Ocampo",
  "Gonzales",
  "Lopez",
  "Sy",
  "Tan",
  "Lim",
  "Dy",
  "Cruz",
  "Aquino",
  "Mendoza",
  "Delos Santos",
  "Villanueva",
  "Fernandez",
  "Castillo",
  "De Leon",
  "Domingo",
  "Martinez",
  "Rodriguez",
  "Perez",
  "Sanchez",
  "Ramirez",
  "Flores",
  "Rivera",
  "Gomez",
  "Diaz",
  "Hernandez",
  "Torres",
  "Velasco",
  "Roque",
  "Francisco",
  "Ramos",
  "Sison",
  "Mercado",
  "Santiago",
  "Salazar",
  "Aguilar",
  "Navarro",
  "David",
  "Manalo",
  "Guevarra",
  "Sarmiento",
  "Pineda",
  "Dizon",
  "Soriano",
  "Mariano",
  "Valdez",
  "Enriquez",
  "Miranda",
  "Pascual",
  "Espiritu",
  "De Jesus",
  "Salcedo",
  "Ferrer",
  "Estrella",
];

const generateName = () => {
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const middle =
    firstNames[Math.floor(Math.random() * firstNames.length)].charAt(0) + ".";
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${first} ${middle} ${last}`;
};

const teachers: SeedUser[] = departments.map((dept) => ({
  id: `teacher_${dept.code}`,
  name: `Prof. ${generateName()}`,
  email: `${dept.code.toLowerCase()}@academic-suite.test`,
  role: "teacher",
  password: "password123",
  image: "",
}));

// Real Subjects Mapping (Simplified for now, but linked to depts)
const subjectTemplates = [
  { name: "Mathematics in the Modern World", code: "GE4" },
  { name: "Understanding the Self", code: "GE1" },
  { name: "Readings in Philippine History", code: "GE2" },
  { name: "The Contemporary World", code: "GE3" },
  { name: "Purposive Communication", code: "GE5" },
  { name: "Art Appreciation", code: "GE6" },
  { name: "Science, Technology, and Society", code: "GE7" },
  { name: "Ethics", code: "GE8" },
  { name: "Rizal's Life and Works", code: "GE9" },
  { name: "Data Structures and Algorithms", code: "IT211" },
  { name: "Computer Programming 1", code: "IT111" },
  { name: "Introduction to Computing", code: "IT101" },
  { name: "Differential Calculus", code: "MATH101" },
  { name: "Engineering Physics", code: "PHYS101" },
  { name: "Basic Accounting", code: "ACCT101" },
  { name: "Business Management", code: "BM101" },
  { name: "Anatomy and Physiology", code: "BIO101" },
  { name: "Political Theory", code: "POL101" },
];

const subjects: SeedSubject[] = [];
const classes: SeedClass[] = [];
const enrollments: SeedEnrollment[] = [];
const sections = ["A", "B", "C"];

// Generate Students - Boosting count to satisfy "many number of students"
const students: SeedUser[] = [];
let studentIdCounter = 50000; // Starting ID

departments.forEach((dept) => {
  // 4 years
  for (let year = 1; year <= 4; year++) {
    // Generate ~40-60 students per year per department -> ~2000-3000 total students
    const studentCount = 40 + Math.floor(Math.random() * 20);

    for (let i = 1; i <= studentCount; i++) {
      const idNum = studentIdCounter++;
      const section = sections[idNum % sections.length]!;

      students.push({
        id: idNum.toString(),
        name: generateName(),
        email: `s${idNum}@university.edu.ph`,
        role: "student",
        password: "password123",
        image: "",
        yearLevel: year,
        section: section,
        departmentCode: dept.code,
      });
    }
  }
});

// Generate Subjects & Classes
departments.forEach((dept) => {
  // Assign random subset of subjects to this department + some specialized ones
  const deptSubjects = subjectTemplates.slice(0, 8).map((s) => ({
    ...s,
    code: `${s.code}-${dept.code}`, // Make code unique per dept for simplicity in this seed
  }));

  deptSubjects.forEach((sub) => {
    subjects.push({
      code: sub.code,
      name: sub.name,
      description: `Subject for ${dept.name}`,
      departmentCode: dept.code,
    });

    sections.forEach((section) => {
      const inviteCode = `${sub.code}-${section}`;
      classes.push({
        name: `${sub.name} - ${section}`,
        description: `${sub.name} class for section ${section}`,
        capacity: 50,
        status: "active",
        inviteCode: inviteCode,
        subjectCode: sub.code,
        teacherId: `teacher_${dept.code}`,
        bannerUrl: "",
      });
    });
  });
});

// Enroll students in classes
students.forEach((student) => {
  // Find subjects for their department
  const deptSubs = subjects.filter(
    (s) => s.departmentCode === student.departmentCode
  );

  // Enroll in all of them for their section
  deptSubs.forEach((sub) => {
    const classInviteCode = `${sub.code}-${student.section}`;
    enrollments.push({
      classInviteCode,
      studentId: student.id,
    });
  });
});

const finalData = {
  users: [
    {
      id: "admin_001",
      name: "System Admin",
      email: "admin@academic-suite.test",
      role: "admin" as const,
      password: "password123",
      image: "",
    },
    ...teachers,
    ...students,
  ],
  departments,
  subjects,
  classes,
  enrollments,
};

// Validate and Write
try {
  const validatedData = SeedDataSchema.parse(finalData);
  fs.writeFileSync("seed/data.json", JSON.stringify(validatedData, null, 2));
  console.log(
    `✅ Production-ready data.json generated with ${students.length} students!`
  );
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error(
      "❌ Validation failed:",
      JSON.stringify(error.errors, null, 2)
    );
  } else {
    console.error("❌ Unexpected error:", error);
  }
  process.exit(1);
}
