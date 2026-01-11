import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useBack } from "@refinedev/core";

import { EditView } from "@/components/refine-ui/views/edit-view";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { facultySchema } from "@/lib/schema";
import UploadWidget from "@/components/upload-widget";
import z from "zod";

const FacultyEdit = () => {
  const back = useBack();

  const form = useForm({
    resolver: zodResolver(facultySchema),
    defaultValues: {
      name: "",
      email: "",
      role: "teacher",
      image: "",
      imageCldPubId: "",
    },
    refineCoreProps: {
      resource: "users",
      action: "edit",
    },
  });

  const {
    refineCore: { onFinish, query: queryResult },
    handleSubmit,
    formState: { isSubmitting },
    control,
    reset,
  } = form;

  useEffect(() => {
    if (queryResult?.data?.data) {
      const data = queryResult.data.data;
      reset({
        name: data.name || "",
        email: data.email || "",
        role: data.role || "teacher",
        image: data.image || "",
        imageCldPubId: data.imageCldPubId || "",
      });
    }
  }, [queryResult?.data?.data, reset]);

  const imagePublicId = form.watch("imageCldPubId");

  const onSubmit = async (values: z.infer<typeof facultySchema>) => {
    try {
      await onFinish(values);
    } catch (error) {
      console.error("Error updating faculty:", error);
    }
  };

  return (
    <EditView className="class-view">
      <Breadcrumb />

      <h1 className="page-title">Edit Faculty</h1>
      <div className="intro-row">
        <p>Update the faculty profile details below.</p>
        <Button onClick={() => back()}>Go Back</Button>
      </div>

      <Separator />

      <div className="my-4 flex items-center">
        <Card className="class-form-card">
          <CardHeader className="relative z-10">
            <CardTitle className="text-2xl pb-0 font-bold text-gradient-orange">
              Edit {queryResult?.data?.data.name}
            </CardTitle>
          </CardHeader>

          <Separator />

          <CardContent className="mt-7">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Photo</FormLabel>
                      <FormControl>
                        <UploadWidget
                          value={
                            field.value
                              ? {
                                  url: field.value,
                                  publicId: imagePublicId ?? "",
                                }
                              : null
                          }
                          onChange={(file) => {
                            if (file) {
                              field.onChange(file.url);
                              form.setValue("imageCldPubId", file.publicId, {
                                shouldValidate: true,
                                shouldDirty: true,
                              });
                            } else {
                              field.onChange("");
                              form.setValue("imageCldPubId", "", {
                                shouldValidate: true,
                                shouldDirty: true,
                              });
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Full Name <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email Address <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Role <span className="text-orange-600">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="teacher">Teacher</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </EditView>
  );
};

export default FacultyEdit;
