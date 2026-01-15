"use client";

import { useFormContext } from "react-hook-form";
import { Loader2, Calendar, IdCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCodeDisplay } from "@/components/qr-code-display";
import { ProfileFormValues } from "../hooks/use-profile";

interface ProfileFormProps {
  onSubmit: (data: ProfileFormValues) => void;
  isSaving: boolean;
  departments: { id: number; code: string; name: string }[];
  age: number | null;
  profileData?: {
    id: string;
    name: string;
    role?: string;
    enrolledAt?: string;
  };
}

export const ProfileForm = ({
  onSubmit,
  isSaving,
  departments,
  age,
  profileData,
}: ProfileFormProps) => {
  const form = useFormContext<ProfileFormValues>();

  const enrollmentDate = profileData?.enrolledAt
    ? new Date(profileData.enrolledAt).toLocaleDateString()
    : "N/A";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6 mb-12">
        <Card className="shadow-xl border-border/40 overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4 border-b border-border/40">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <IdCard className="h-5 w-5 text-primary" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Update your profile details and academic preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
                            {...field}
                            className="bg-background/50 h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            {...field}
                            className="bg-background/50 h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="birthday"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                          Birthday{" "}
                          {age !== null && (
                            <Badge
                              variant="secondary"
                              className="ml-2 font-bold text-[10px] bg-primary/10 text-primary border-none"
                            >
                              {age} y/o
                            </Badge>
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            className="bg-background/50 h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="universityId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                          Student/Faculty ID
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ID-2026-XXXX"
                            {...field}
                            className="bg-background/50 h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="semester"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                          Semester
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-background/50 h-11 text-foreground">
                              <SelectValue placeholder="Semester" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-popover border-border/50">
                            <SelectItem value="1st Semester">
                              1st Sem
                            </SelectItem>
                            <SelectItem value="2nd Semester">
                              2nd Sem
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="departmentId"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                          Department / Program
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-background/50 h-11 text-foreground">
                              <SelectValue placeholder="Select Department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-popover border-border/50">
                            {departments.map((dept) => (
                              <SelectItem
                                key={dept.id}
                                value={dept.id.toString()}
                              >
                                {dept.code} - {dept.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-2xl bg-muted/30 border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-background rounded-lg shadow-sm">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Date Issued
                      </p>
                      <p className="text-sm font-bold text-foreground">
                        {enrollmentDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-background rounded-lg shadow-sm">
                      <IdCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Account Status
                      </p>
                      <Badge
                        variant="outline"
                        className="text-[10px] uppercase font-black border-success text-success bg-success/5 px-2 py-0"
                      >
                        Verified 2026
                      </Badge>
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                        Professional Bio
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description of your academic background..."
                          className="resize-none bg-background/50 min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="px-10 h-12 font-black uppercase tracking-widest text-xs rounded-xl shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
                  >
                    {isSaving && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isSaving ? "Synchronizing..." : "Save My Profile"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="sticky top-6">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="p-4">
              {profileData && (
                <QrCodeDisplay
                  value={profileData.id}
                  name={profileData.name}
                  role={profileData.role || "Student"}
                  variant="profile"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
