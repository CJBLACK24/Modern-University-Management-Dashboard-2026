"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export const profileFormSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters." })
    .max(20, { message: "Username must not be longer than 20 characters." })
    .regex(/^[a-z0-9-]+$/, {
      message: "Username must be lowercase, numbers, and hyphens only.",
    }),
  bio: z.string().max(160).optional(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  firstName: z.string().min(1, "First Name is required").optional(),
  lastName: z.string().min(1, "Last Name is required").optional(),
  birthday: z.string().optional(),
  universityId: z.string().min(1, "University ID is required").optional(),
  semester: z.string().optional(),
  yearLevel: z.string().optional(),
  departmentId: z.string().optional(),
  skills: z.string().optional(),
  signatureUrl: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const useProfile = () => {
  const { data: session } = authClient.useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [departments, setDepartments] = useState<any[]>([]);
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      name: "",
      firstName: "",
      lastName: "",
      birthday: "",
      universityId: "",
      semester: "1st Semester",
      yearLevel: "1st Year",
      departmentId: "",
      bio: "",
      skills: "",
      signatureUrl: "",
    },
  });

  const fetchDepartments = async () => {
    try {
      const response = await fetch("/api/departments?limit=100");
      if (response.ok) {
        const data = await response.json();
        setDepartments(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchProfile = useCallback(async () => {
    if (!session?.user?.id) return;
    try {
      const response = await fetch("/api/profile");
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        form.reset({
          username: data.username || "",
          name: data.name || "",
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          birthday: data.birthday
            ? new Date(data.birthday).toISOString().split("T")[0]
            : "",
          universityId: data.universityId || "",
          semester: data.semester || "1st Semester",
          yearLevel: data.yearLevel ? `${data.yearLevel}nd Year` : "1st Year",
          departmentId: data.departmentId?.toString() || "",
          bio: data.bio || "",
          skills: data.skills || "",
          signatureUrl: data.signatureUrl || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  }, [session?.user?.id, form]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update profile");
      }

      toast.success("Profile updated", {
        description: "Your settings have been saved successfully.",
      });
      fetchProfile();
    } catch (error: any) {
      toast.error("Error", {
        description: error.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const birthdayValue = form.watch("birthday");
  const calculateAge = (dateString?: string) => {
    if (!dateString) return null;
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  const age = calculateAge(birthdayValue);

  return {
    form,
    isSaving,
    isLoading,
    departments,
    profileData,
    age,
    onSubmit,
  };
};
