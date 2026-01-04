"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { ScrollArea } from "../../components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Field, FieldLabel, FieldError } from "../../components/ui/field";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Form } from "../../components/ui/form";
import { UploadButton } from "../../lib/uploadthing";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { Upload, FileText, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  Name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(49, "Name must be less than 50 characters"),
  Description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(60, "Description must be less than 60 characters"),
});

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    url: string;
  } | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      Description: "",
    },
  });

  const createFile = useMutation(api.files.createFile);
  const currentUser = useQuery(api.users.current);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!uploadedFile) {
      toast("Please upload a file before submitting");
      return;
    }

    if (!currentUser) {
      toast("User not authenticated");
      return;
    }

    try {
      await createFile({
        name: values.Name,
        description: values.Description,
        userId: currentUser._id,
        fileId: uploadedFile.url,
      });

      toast("File successfully uploaded and saved!");

      // Reset form and state
      form.reset();
      setUploadedFile(null);
      setIsOpen(false);
    } catch (error) {
      console.error("Form submission error", error);
      toast("Failed to submit the form. Please try again.");
    }
  }

  const handleDrawerChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset form and state when drawer closes
      form.reset();
      setUploadedFile(null);
    }
  };

  return (
    <main className="p-4">
      <Drawer open={isOpen} onOpenChange={handleDrawerChange}>
        <DrawerTrigger asChild>
          <Button size="lg" className="gap-2">
            <Upload className="w-5 h-5" />
            Upload File
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[90vh]">
          <div className="mx-auto w-full max-w-2xl">
            <DrawerHeader>
              <DrawerTitle className="text-xl font-semibold">
                Upload a New File
              </DrawerTitle>
              <DrawerDescription className="text-sm">
                Private files are only seen by the owner, but public files can
                be seen by anyone
              </DrawerDescription>
            </DrawerHeader>

            <ScrollArea className="h-[calc(90vh-160px)] px-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 py-4 pb-8"
                >
                  {/* File Name Field */}
                  <Field>
                    <FieldLabel htmlFor="Name" className="text-sm font-medium">
                      File Name <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id="Name"
                      placeholder="e.g., Student ID Card 2024"
                      className="mt-1"
                      {...form.register("Name")}
                    />
                    <FieldError className="text-xs mt-1">
                      {form.formState.errors.Name?.message}
                    </FieldError>
                  </Field>

                  {/* Description Field */}
                  <Field>
                    <FieldLabel
                      htmlFor="Description"
                      className="text-sm font-medium"
                    >
                      Description <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id="Description"
                      placeholder="Brief description of the file"
                      className="mt-1"
                      {...form.register("Description")}
                    />
                    <FieldError className="text-xs mt-1">
                      {form.formState.errors.Description?.message}
                    </FieldError>
                  </Field>

                  {/* File Upload Section */}
                  <Field>
                    <FieldLabel className="text-sm font-medium">
                      Upload File <span className="text-red-500">*</span>
                    </FieldLabel>
                    <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                      {uploadedFile ? (
                        <div className="flex items-center justify-center gap-2 text-green-600">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="font-medium text-sm truncate">
                            {uploadedFile.name}
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <FileText className="w-8 h-8 text-gray-400" />
                          <p className="text-xs text-gray-500">
                            Click below to upload your file
                          </p>
                        </div>
                      )}

                      <div className="mt-3">
                        <UploadButton
                          className="bg-gray-900 min-w-fit min-h-fit pb-3 rounded-md"
                          endpoint="filesUploader"
                          onClientUploadComplete={async (res) => {
                            if (res && res.length > 0) {
                              const file = res[0];
                              setUploadedFile({
                                name: file.name,
                                url: file.ufsUrl as string,
                              });
                              toast("File uploaded successfully!");
                            }
                          }}
                          onUploadError={(error: Error) => {
                            toast(`Upload failed: ${error.message}`);
                          }}
                        />
                      </div>
                    </div>
                  </Field>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-2 pt-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleDrawerChange(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={!uploadedFile}
                      className="gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </ScrollArea>
          </div>
        </DrawerContent>
      </Drawer>
    </main>
  );
}
