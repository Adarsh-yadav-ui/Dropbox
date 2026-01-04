"use client";
import { useMutation, useQuery } from "convex/react";
import { UploadButton } from "../lib/uploadthing";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";

export const FileUpload = () => {
  const createFile = useMutation(api.files.createFile);
  const currentUser = useQuery(api.users.current);

  return (
    <Button className="min-h-fit min-w-fit flex justify-center items-center pb-5">
      <UploadButton
        className="text-black"
        endpoint="filesUploader"
        onClientUploadComplete={async (res) => {
          // res is an array, so access the first element
          for (const file of res) {
            await createFile({
              name: file.name,
              description: "nice",
              userId: currentUser._id,
              fileId: file.ufsUrl as string,
            });
            toast("File successfully uploaded.");
          }
        }}
        onUploadError={(error: Error) => {
          toast(`File not has not uploaded because of ${error}.`);
        }}
      />
    </Button>
  );
};
