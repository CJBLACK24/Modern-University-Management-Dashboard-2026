"use client";

import { useMemo } from "react";
import { useList } from "@refinedev/core";
import type { Department, Subject, User, Class } from "@/types";

export type YearLevel = "1" | "2" | "3" | "4" | "all";
export type Semester = "1" | "2" | "all";
export type Section = "A" | "B" | "C" | "all";

export interface DemographicData {
  students: {
    total: number;
    male: number;
    female: number;
    sections: {
      A: number;
      B: number;
      C: number;
    };
  };
  faculty: {
    total: number;
    male: number;
    female: number;
  };
}

export const useDashboardData = () => {
  const { query: usersQuery } = useList<User>({
    resource: "users",
    pagination: { mode: "off" },
    liveMode: "auto",
  });

  const { query: subjectsQuery } = useList<Subject>({
    resource: "subjects",
    pagination: { mode: "off" },
    liveMode: "auto",
  });

  const { query: departmentsQuery } = useList<Department>({
    resource: "departments",
    pagination: { mode: "off" },
    liveMode: "auto",
  });

  const { query: classesQuery } = useList<Class>({
    resource: "classes",
    pagination: { mode: "off" },
    liveMode: "auto",
  });

  const usersData = usersQuery.data?.data;
  const subjectsData = subjectsQuery.data?.data;
  const departmentsData = departmentsQuery.data?.data;
  const classesData = classesQuery.data?.data;

  const users = useMemo(() => usersData ?? [], [usersData]);
  const subjects = useMemo(() => subjectsData ?? [], [subjectsData]);
  const departments = useMemo(() => departmentsData ?? [], [departmentsData]);
  const classes = useMemo(() => classesData ?? [], [classesData]);

  const usersByRole = useMemo(() => {
    const counts = users.reduce<Record<string, number>>((acc, user) => {
      const role = user.role ?? "unknown";
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([role, total]) => ({ role, total }));
  }, [users]);

  // Demographics broken down by gender and section for students and faculty
  const getDemographicsByYear = useMemo(() => {
    return (
      yearLevel: YearLevel,
      departmentId: string | "all"
    ): DemographicData => {
      const students = users.filter((user) => {
        if (user.role !== "student") return false;

        // Year Level Filter
        if (yearLevel !== "all" && user.yearLevel !== parseInt(yearLevel)) {
          return false;
        }

        // Department Filter
        if (
          departmentId !== "all" &&
          user.departmentId !== parseInt(departmentId)
        ) {
          return false;
        }

        return true;
      });

      const faculty = users.filter((user) => {
        if (user.role !== "teacher" && user.role !== "admin") return false;

        // Department Filter for Faculty
        if (
          departmentId !== "all" &&
          user.departmentId !== parseInt(departmentId)
        ) {
          return false;
        }

        return true;
      });

      return {
        students: {
          total: students.length,
          male: students.filter((s) => s.gender === "male").length,
          female: students.filter((s) => s.gender === "female").length,
          sections: {
            A: students.filter((s) => s.section === "A").length,
            B: students.filter((s) => s.section === "B").length,
            C: students.filter((s) => s.section === "C").length,
          },
        },
        faculty: {
          total: faculty.length,
          male: faculty.filter((f) => f.gender === "male").length,
          female: faculty.filter((f) => f.gender === "female").length,
        },
      };
    };
  }, [users]);

  // Subjects by department with year and semester filter
  const getSubjectsByDepartment = useMemo(() => {
    return (yearLevel: YearLevel, semester: Semester) => {
      const counts = subjects.reduce<Record<string, number>>((acc, subject) => {
        // Filter by year level
        if (yearLevel !== "all" && subject.yearLevel !== parseInt(yearLevel)) {
          return acc;
        }
        // Filter by semester
        if (semester !== "all" && subject.semester !== parseInt(semester)) {
          return acc;
        }

        const departmentName = subject.department?.name ?? "Unassigned";
        acc[departmentName] = (acc[departmentName] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(counts).map(([departmentName, totalSubjects]) => ({
        departmentName,
        totalSubjects,
      }));
    };
  }, [subjects]);

  const subjectsByDepartment = useMemo(() => {
    const counts = subjects.reduce<Record<string, number>>((acc, subject) => {
      const departmentName = subject.department?.name ?? "Unassigned";
      acc[departmentName] = (acc[departmentName] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([departmentName, totalSubjects]) => ({
      departmentName,
      totalSubjects,
    }));
  }, [subjects]);

  const newestClasses = useMemo(() => {
    return [...classes]
      .sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      })
      .slice(0, 5);
  }, [classes]);

  const newestTeachers = useMemo(() => {
    return users
      .filter((user) => user.role === "teacher")
      .sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      })
      .slice(0, 5);
  }, [users]);

  const topDepartments = useMemo(() => {
    return [...subjectsByDepartment]
      .sort((a, b) => b.totalSubjects - a.totalSubjects)
      .slice(0, 5)
      .map((dept) => ({
        ...dept,
        id: departments.find((d) => d.name === dept.departmentName)?.id,
      }));
  }, [subjectsByDepartment, departments]);

  return {
    users,
    subjects,
    departments,
    classes,
    usersByRole,
    subjectsByDepartment,
    getSubjectsByDepartment,
    getDemographicsByYear,
    newestClasses,
    newestTeachers,
    topDepartments,
    isLoading:
      usersQuery.isLoading ||
      subjectsQuery.isLoading ||
      departmentsQuery.isLoading ||
      classesQuery.isLoading,
  };
};
