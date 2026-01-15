"use client";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { usePathname } from "next/navigation";
import { Id } from "../../../../../convex/_generated/dataModel";
import "react-image-gallery/styles/css/image-gallery.css";

export default function Page() {
  const pathname = usePathname();
  const fileIds = pathname.replace("/dashboard/files/", "");

  const file = useQuery(api.files.getFileById, {
    fileId: fileIds as Id<"files">,
  });

  if (!file) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }



  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {file.fileId}
    </div>
  );
}
