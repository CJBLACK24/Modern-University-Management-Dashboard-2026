export type Subject = {
  id: number;
  name: string;
  code: string;
  description: string;
  yearLevel: number;
  semester: number;
  credits: number;
  departmentId?: number;
  department?: Department;
  createdAt?: string;
  updatedAt?: string;
};

export type ListResponse<T = unknown> = {
  data?: T[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type CreateResponse<T = unknown> = {
  data?: T;
};

export type GetOneResponse<T = unknown> = {
  data?: T;
};

declare global {
  interface CloudinaryUploadWidgetResults {
    event: string;
    info: {
      secure_url: string;
      public_id: string;
      delete_token?: string;
      resource_type: string;
      original_filename: string;
    };
  }

  interface CloudinaryWidget {
    open: () => void;
  }

  interface Window {
    cloudinary?: {
      createUploadWidget: (
        options: Record<string, unknown>,
        callback: (
          error: unknown,
          result: CloudinaryUploadWidgetResults
        ) => void
      ) => CloudinaryWidget;
    };
  }
}

export interface UploadWidgetValue {
  url: string;
  publicId: string;
}

export interface UploadWidgetProps {
  value?: UploadWidgetValue | null;
  onChange?: (value: UploadWidgetValue | null) => void;
  disabled?: boolean;
}

export enum UserRole {
  STUDENT = "student",
  TEACHER = "teacher",
  ADMIN = "admin",
}

export type UserRoles = "student" | "teacher" | "admin";

export type User = {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  name: string;
  role: "student" | "teacher" | "admin";
  gender?: "male" | "female" | "other";
  yearLevel?: number;
  section?: string;
  semester?: number;
  image?: string;
  imageCldPubId?: string;
  departmentId?: number;
  department?: Department;
};

export type Schedule = {
  day: string;
  startTime: string;
  endTime: string;
  room?: string;
};

export type Department = {
  id: number;
  name: string;
  code: string;
  description: string;
};

export type Class = {
  id: number;
  name: string;
  description: string;
  capacity: number;
  status: "active" | "inactive" | "archived";
  inviteCode: string;
  subjectId: number;
  teacherId: string;
  bannerUrl?: string;
  bannerCldPubId?: string;
  section: string;
  semester: number;
  schedules: Schedule[];
  subject?: Subject;
  teacher?: User;
  department?: Department;
  createdAt?: string;
  updatedAt?: string;
};

export type SignUpPayload = {
  email: string;
  name: string;
  image?: string;
  imageCldPubId?: string;
  role: UserRole;
};

export type AcademicCalendar = {
  id: number;
  url: string;
  publicId: string;
  year: number;
  createdAt: string;
};
