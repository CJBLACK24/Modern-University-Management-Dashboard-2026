import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { CreateView } from "@/components/refine-ui/views/create-view";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { BackButton } from "@/components/refine-ui/buttons/back";
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

const FacultyCreate = () => {
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
      action: "create",
      redirect: "list",
    },
  });

  const {
    refineCore: { onFinish },
    handleSubmit,
    formState: { isSubmitting },
    control,
    setValue,
    watch,
  } = form;

  const imagePublicId = watch("imageCldPubId");

  const onSubmit = async (values: z.infer<typeof facultySchema>) => {
    try {
      await onFinish(values);
    } catch (error) {
      console.error("Error creating faculty:", error);
    }
  };

  return (
    <CreateView className="class-view">
      <Breadcrumb />

      <h1 className="page-title">Create Faculty</h1>
      <div className="intro-row">
        <p>Add a new faculty member to the system.</p>
        <BackButton>Go Back</BackButton>
      </div>

      <Separator />

      <div className="my-4 flex items-center">
        <Card className="class-form-card">
          <CardHeader className="relative z-10">
            <CardTitle className="text-2xl pb-0 font-bold text-gradient-orange">
              New Faculty Profile
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
                              setValue("imageCldPubId", file.publicId, {
                                shouldValidate: true,
                                shouldDirty: true,
                              });
                            } else {
                              field.onChange("");
                              setValue("imageCldPubId", "", {
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
                  {isSubmitting ? "Creating..." : "Create User"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </CreateView>
  );
};

export default FacultyCreate;
