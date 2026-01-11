import { useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCreate, useGetIdentity, useList } from "@refinedev/core";
import { useRouter } from "next/navigation";

import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { CreateView } from "@/components/refine-ui/views/create-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ClassDetails, User } from "@/types";

const enrollSchema = z.object({
  classId: z.coerce.number().min(1, "Class is required"),
});

type EnrollFormValues = z.infer<typeof enrollSchema>;

const EnrollmentsCreate = () => {
  const router = useRouter();
  const [joinCode, setJoinCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const {
    mutateAsync: createEnrollment,
    mutation: { isPending },
  } = useCreate();
  const { data: currentUser } = useGetIdentity<User>();

  const { query: classesQuery } = useList<ClassDetails>({
    resource: "classes",
    pagination: {
      pageSize: 100,
    },
  });

  const classes = classesQuery.data?.data ?? [];
  const classesLoading = classesQuery.isLoading;

  const form = useForm<EnrollFormValues>({
    resolver: zodResolver(enrollSchema),
    defaultValues: {
      classId: 0,
    },
  });

  const selectedClassId = form.watch("classId");

  const onSubmit = async (values: EnrollFormValues) => {
    if (!currentUser?.id) return;

    try {
      const response = await createEnrollment({
        resource: "enrollments",
        values: {
          classId: values.classId,
          studentId: currentUser.id,
        },
      });

      if (response?.data) {
        toast.success("Successfully enrolled!");
        router.push("/");
      }
    } catch {
      toast.error("Failed to enroll.");
    }
  };

  const handleJoinByCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCode || !currentUser?.id) return;

    setIsJoining(true);
    try {
      const response = await fetch("/api/classes/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteCode: joinCode }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Successfully joined class!");
        router.push("/");
      } else {
        toast.error(result.error || "Failed to join class.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsJoining(false);
    }
  };

  const isSubmitDisabled =
    isPending ||
    classesLoading ||
    !currentUser?.id ||
    !classes.length ||
    !selectedClassId;

  return (
    <CreateView className="class-view">
      <Breadcrumb />

      <h1 className="page-title">Enrollment & Joining</h1>
      <div className="intro-row">
        <p>Enroll in a class from the list or enter a joining code.</p>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        {/* Join by Code Column */}
        <Card className="class-form-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gradient-orange">
              Join by Code
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="mt-7">
            <form onSubmit={handleJoinByCode} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Class Invite Code</label>
                <Input
                  placeholder="Enter 6-8 digit code"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  className="text-lg font-mono tracking-widest uppercase"
                />
                <p className="text-xs text-muted-foreground">
                  Ask your teacher for the class code.
                </p>
              </div>
              <Button type="submit" size="lg" disabled={isJoining || !joinCode}>
                {isJoining ? "Joining..." : "Join Class"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Manual Enrollment Column (Admin/Faculty choice) */}
        <Card className="class-form-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              Manual Enrollment
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="mt-7">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="classId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Class <span className="text-orange-600">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value ? String(field.value) : ""}
                        disabled={classesLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {classes.map((classItem) => (
                            <SelectItem
                              key={classItem.id}
                              value={String(classItem.id)}
                            >
                              {classItem.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Student Email</FormLabel>
                  <FormControl>
                    <Input
                      value={currentUser?.email ?? "Not signed in"}
                      readOnly
                      className="bg-muted"
                    />
                  </FormControl>
                </FormItem>

                <Button type="submit" size="lg" disabled={isSubmitDisabled}>
                  {isPending ? "Enrolling..." : "Enroll manually"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </CreateView>
  );
};

export default EnrollmentsCreate;
