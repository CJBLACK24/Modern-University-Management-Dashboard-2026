import { GraduationCap, School } from "lucide-react";

export const USER_ROLES = {
  STUDENT: "student",
  TEACHER: "teacher",
  ADMIN: "admin",
};

export const ROLE_OPTIONS = [
  {
    value: USER_ROLES.STUDENT,
    label: "Student",
    icon: GraduationCap,
  },
  {
    value: USER_ROLES.TEACHER,
    label: "Teacher",
    icon: School,
  },
];

export const DEPARTMENTS = [
  "Information Technology",
  "Civil Engineering",
  "Marine Transportation",
  "Maritime Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Agricultural Engineering",
  "Biomedical Engineering",
  "Chemical Engineering",
  "Environmental Engineering",
  "Geotechnical Engineering",
  "Mining Engineering",
  "Nuclear Engineering",
  "Petroleum Engineering",
  "Structural Engineering",
  "Water Resources Engineering",
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Geography",
  "Economics",
  "Business Administration",
  "Engineering",
  "Psychology",
  "Sociology",
  "Political Science",
  "Philosophy",
  "Education",
  "Fine Arts",
  "Music",
  "Physical Education",
  "Law",
] as const;

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((dept) => ({
  value: dept,
  label: dept,
}));

export const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes
export const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export const CLOUDINARY_UPLOAD_URL =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL ?? "";
export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";

const isBrowser = typeof window !== "undefined";

export const BACKEND_BASE_URL = isBrowser
  ? `${window.location.origin}/api`
  : process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:3000/api";

export const BASE_URL = isBrowser
  ? `${window.location.origin}/api`
  : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const ACCESS_TOKEN_KEY = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY ?? "";
export const REFRESH_TOKEN_KEY =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY ?? "";

export const REFRESH_TOKEN_URL = `${BASE_URL}/refresh-token`;

export const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "";
