import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { type BaseRecord, type HttpError } from "@refinedev/core";
import * as z from "zod";

import { EditView } from "@/components/refine-ui/views/edit-view";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { BackButton } from "@/components/refine-ui/buttons/back";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const departmentSchema = z.object({
  code: z.string().min(2, "Department code must be at least 2 characters"),
  name: z.string().min(3, "Department name must be at least 3 characters"),
  description: z
    .string()
    .min(5, "Department description must be at least 5 characters"),
});

type DepartmentFormValues = z.infer<typeof departmentSchema>;

const DepartmentsEdit = () => {
  const form = useForm<BaseRecord, HttpError, DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
    },
    refineCoreProps: {
      resource: "departments",
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
      reset(queryResult.data.data as DepartmentFormValues);
    }
  }, [queryResult?.data?.data, reset]);

  const onSubmit = async (values: DepartmentFormValues) => {
    try {
      await onFinish(values);
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  return (
    <EditView className="class-view">
      <Breadcrumb />

      <h1 className="page-title">Edit Department</h1>
      <div className="intro-row">
        <p>Update the department information below.</p>
        <BackButton>Go Back</BackButton>
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
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Department Code{" "}
                        <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="CS" {...field} />
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
                        Department Name{" "}
                        <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Computer Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Description <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the department focus..."
                          className="min-h-28"
                          {...field}
                        />
                      </FormControl>
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

export default DepartmentsEdit;
