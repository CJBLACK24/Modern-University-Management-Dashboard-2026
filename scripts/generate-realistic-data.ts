import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const seedDataPath = path.join(__dirname, "../seed/data.json");

const DEPARTMENTS = [
  {
    code: "CS",
    name: "Computer Science",
    desc: "Study of computers and computational systems.",
  },
  {
    code: "IT",
    name: "Information Technology",
    desc: "Implementation and management of computer systems.",
  },
  {
    code: "BSCE",
    name: "Civil Engineering",
    desc: "Design and construction of infrastructure.",
  },
  {
    code: "BSME",
    name: "Mechanical Engineering",
    desc: "Design and manufacturing of mechanical systems.",
  },
  {
    code: "BSEE",
    name: "Electrical Engineering",
    desc: "Study of electricity and electronics.",
  },
  {
    code: "BSBA",
    name: "Business Administration",
    desc: "Management of business operations.",
  },
  {
    code: "BSA",
    name: "Accountancy",
    desc: "Measurement and communication of financial information.",
  },
  {
    code: "BSHM",
    name: "Hotel Management",
    desc: "Management of hospitality operations.",
  },
  { code: "BSPSY", name: "Psychology", desc: "Study of mind and behavior." },
  { code: "BSBIO", name: "Biology", desc: "Study of living organisms." },
  {
    code: "ABM",
    name: "Agribusiness",
    desc: "Business of agricultural production.",
  },
  {
    code: "ABPS",
    name: "Political Science",
    desc: "Study of government and politics.",
  },
];

const SECTIONS = ["A", "B", "C"];
const GENDERS = ["male", "female"];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateName(gender: string) {
  const firstNamesMale = [
    "John",
    "Michael",
    "David",
    "James",
    "Robert",
    "William",
    "Joseph",
    "Thomas",
    "Christopher",
    "Daniel",
    "Matthew",
    "Anthony",
    "Mark",
    "Donald",
    "Steven",
    "Paul",
    "Andrew",
    "Joshua",
    "Kenneth",
    "Kevin",
  ];
  const firstNamesFemale = [
    "Mary",
    "Jennifer",
    "Linda",
    "Patricia",
    "Elizabeth",
    "Susan",
    "Jessica",
    "Sarah",
    "Karen",
    "Nancy",
    "Lisa",
    "Betty",
    "Margaret",
    "Sandra",
    "Ashley",
    "Kimberly",
    "Emily",
    "Donna",
    "Michelle",
    "Dorothy",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
  ];

  const first =
    gender === "male"
      ? getRandomItem(firstNamesMale)
      : getRandomItem(firstNamesFemale);
  const last = getRandomItem(lastNames);
  return `${first} ${last}`;
}

interface SeedUser {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
  password: string;
  image: string;
  gender: string;
  departmentCode?: string;
  yearLevel?: number;
  section?: string;
  semester?: number;
}

interface SeedSubject {
  code: string;
  name: string;
  description: string;
  departmentCode: string;
  yearLevel: number;
  semester: number;
  credits: number;
}

interface SeedClass {
  name: string;
  description: string;
  capacity: number;
  status: string;
  inviteCode: string;
  subjectCode: string;
  teacherId: string;
  bannerUrl: string;
  section: string;
  semester: number;
}

interface SeedEnrollment {
  classInviteCode: string;
  studentId: string;
  grade: number | null;
}

interface SeedDepartment {
  code: string;
  name: string;
  description: string;
}

async function generateData() {
  const users: SeedUser[] = [];
  const subjects: SeedSubject[] = [];
  const classes: SeedClass[] = [];
  const enrollments: SeedEnrollment[] = [];
  const departmentsData: SeedDepartment[] = [];

  // 1. Add Admin
  users.push({
    id: "admin_001",
    name: "System Admin",
    email: "admin@academic-suite.test",
    role: "admin",
    password: "password123",
    image: "",
    gender: "male",
  });

  for (const dept of DEPARTMENTS) {
    departmentsData.push({
      code: dept.code,
      name: dept.name,
      description: dept.desc,
    });

    // 2. Generate Professors (~30 per dept)
    const deptProfessors: string[] = [];
    for (let i = 1; i <= 30; i++) {
      const gender = getRandomItem(GENDERS);
      const profId = `prof_${dept.code}_${i}`;
      users.push({
        id: profId,
        name: `Prof. ${generateName(gender)}`,
        email: `prof.${profId}@university.edu.ph`,
        role: "teacher",
        password: "password123",
        image: "",
        gender: gender,
        departmentCode: dept.code,
      });
      deptProfessors.push(profId);
    }

    // 3. Generate Curriculum (4 years, 2 sems, 9-11 subjects per sem)
    for (let year = 1; year <= 4; year++) {
      for (let sem = 1; sem <= 2; sem++) {
        const subCount = 9 + Math.floor(Math.random() * 3); // 9, 10, or 11
        const semSubjects: string[] = [];
        for (let s = 1; s <= subCount; s++) {
          const subCode = `${dept.code}${year}${sem}${s
            .toString()
            .padStart(2, "0")}`;
          subjects.push({
            code: subCode,
            name: `${dept.name} Subject ${year}-${sem}-${s}`,
            description: `Description for ${subCode}`,
            departmentCode: dept.code,
            yearLevel: year,
            semester: sem,
            credits: 3,
          });
          semSubjects.push(subCode);

          // 4. Generate Classes for each Section (A, B, C)
          for (const section of SECTIONS) {
            const profId = getRandomItem(deptProfessors); // Each subject has a different instructor (random from dept pool)

            classes.push({
              name: `${subCode} - Section ${section}`,
              description: `Class for ${subCode} section ${section}`,
              capacity: 50,
              status: "active",
              inviteCode: `INV_${subCode}_${section}`,
              subjectCode: subCode,
              teacherId: profId,
              bannerUrl: "",
              section: section,
              semester: sem,
            });
          }
        }
      }

      // 5. Generate Students (150 per year level per dept)
      // Distributed into Section A, B, C (50 each)
      for (const section of SECTIONS) {
        for (let st = 1; st <= 50; st++) {
          const gender = getRandomItem(GENDERS);
          const studentId = `std_${dept.code}_Y${year}_S${section}_${st
            .toString()
            .padStart(3, "0")}`;
          users.push({
            id: studentId,
            name: generateName(gender),
            email: `s${studentId}@university.edu.ph`,
            role: "student",
            password: "password123",
            image: "",
            gender: gender,
            yearLevel: year,
            section: section,
            semester: 1, // Current enrollment semester default
            departmentCode: dept.code,
          });

          // 6. Enrollments: Enroll student into all subjects of their year level, semester 1, and assigned section
          const currentSemSubjects = subjects.filter(
            (s) =>
              s.departmentCode === dept.code &&
              s.yearLevel === year &&
              s.semester === 1
          );
          for (const sub of currentSemSubjects) {
            enrollments.push({
              classInviteCode: `INV_${sub.code}_${section}`,
              studentId: studentId,
              grade: null,
            });
          }
        }
      }
    }
  }

  const data = {
    users,
    departments: departmentsData,
    subjects,
    classes,
    enrollments,
    attendance: [],
  };

  console.log(`Summary:`);
  console.log(`- Users: ${users.length}`);
  console.log(`- Departments: ${departmentsData.length}`);
  console.log(`- Subjects: ${subjects.length}`);
  console.log(`- Classes: ${classes.length}`);
  console.log(`- Enrollments: ${enrollments.length}`);

  fs.writeFileSync(seedDataPath, JSON.stringify(data, null, 2));
  console.log(`Data generated and saved to ${seedDataPath}`);
}

generateData();
