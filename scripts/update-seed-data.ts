import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const seedDataPath = path.join(__dirname, "../seed/data.json");

const genders = ["male", "female"];

function getRandomGender() {
  return genders[Math.floor(Math.random() * genders.length)];
}

function getYearLevelFromSubjectCode(code: string) {
  // Extract number from code, e.g., "CSC 101" -> 1, "ENG 202" -> 2
  const match = code.match(/\d+/);
  if (match) {
    const num = parseInt(match[0]);
    if (num >= 100 && num < 200) return 1;
    if (num >= 200 && num < 300) return 2;
    if (num >= 300 && num < 400) return 3;
    if (num >= 400 && num < 500) return 4;
  }
  return 1; // Default to 1
}

async function updateSeedData() {
  console.log("Reading data.json...");
  const rawData = fs.readFileSync(seedDataPath, "utf-8");
  const data = JSON.parse(rawData);

  console.log("Updating users with gender...");
  data.users = data.users.map(
    (user: { gender?: string; [key: string]: unknown }) => ({
      ...user,
      gender: user.gender || getRandomGender(),
    })
  );

  console.log("Updating subjects with yearLevel...");
  // Check if subject exists before mapping
  if (data.subjects) {
    data.subjects = data.subjects.map(
      (subject: {
        code: string;
        yearLevel?: number;
        [key: string]: unknown;
      }) => ({
        ...subject,
        yearLevel:
          subject.yearLevel || getYearLevelFromSubjectCode(subject.code),
      })
    );
  }

  console.log("Writing updated data.json...");
  fs.writeFileSync(seedDataPath, JSON.stringify(data, null, 2));
  console.log("Done!");
}

updateSeedData();
