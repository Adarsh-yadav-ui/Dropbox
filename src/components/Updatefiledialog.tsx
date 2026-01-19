"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { ScrollArea } from "./ui/scroll-area";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Field, FieldLabel, FieldError } from "./ui/field";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Form } from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

const updateFormSchema = z.object({
  Name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),
  Description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(180, "Description must be less than 180 characters"),
  Visibility: z.enum(["public", "private"]),
});

interface UpdateFileDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  fileId: Id<"files">;
  currentName: string;
  currentDescription: string;
  currentVisibility: "public" | "private";
}

export function UpdateFileDialog({
  isOpen,
  onOpenChange,
  fileId,
  currentName,
  currentDescription,
  currentVisibility,
}: UpdateFileDialogProps) {
  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      Name: currentName,
      Description: currentDescription,
      Visibility: currentVisibility,
    },
  });

  const updateFile = useMutation(api.files.updateFile);

  async function onSubmit(values: z.infer<typeof updateFormSchema>) {
    try {
      await updateFile({
        id: fileId,
        name: values.Name,
        description: values.Description,
        visibility: values.Visibility,
      });

      toast("File updated successfully!");
      onOpenChange(false);
    } catch (error) {
      console.error("Update error", error);
      toast("Failed to update the file. Please try again.");
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-semibold">
              Update File
            </DrawerTitle>
            <DrawerDescription className="text-sm">
              Update the file details below
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

                {/* Visibility Field */}
                <Field>
                  <FieldLabel
                    htmlFor="Visibility"
                    className="text-sm font-medium"
                  >
                    Visibility <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("Visibility", value as "public" | "private")
                    }
                    defaultValue={form.getValues("Visibility")}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError className="text-xs mt-1">
                    {form.formState.errors.Visibility?.message}
                  </FieldError>
                </Field>

                {/* Submit Button */}
                <div className="flex justify-end gap-2 pt-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="gap-2">
                    Update File
                  </Button>
                </div>
              </form>
            </Form>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
