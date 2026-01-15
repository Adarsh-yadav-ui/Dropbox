"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { PieData } from "../../components/pieChart";
import { FileCard } from "../../components/fileCard";
import {
  Video,
  Image as ImageIcon,
  FileText,
  Music,
  File,
  FolderOpen,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default function Page() {
  const currentUser = useQuery(api.users.current);
  const fileDataForUser = useQuery(api.files.getFilesForUser, {
    userId: currentUser?._id,
  });

  const fileDataForUserAstypeForAudio = useQuery(
    api.files.getRecentFileForUserAsType,
    {
      userId: currentUser?._id,
      fileType: "Audio",
    }
  );
  const fileDataForUserAstypeForVideo = useQuery(
    api.files.getRecentFileForUserAsType,
    {
      userId: currentUser?._id,
      fileType: "Video",
    }
  );
  const fileDataForUserAstypeForImages = useQuery(
    api.files.getRecentFileForUserAsType,
    {
      userId: currentUser?._id,
      fileType: "Image",
    }
  );

  const fileDataForUserAstypeForPDFs = useQuery(
    api.files.getRecentFileForUserAsType,
    {
      userId: currentUser?._id,
      fileType: "PDF",
    }
  );

  const fileDataForUserAstypeForDocuments = useQuery(
    api.files.getRecentFileForUserAsType,
    {
      userId: currentUser?._id,
      fileType: "Document",
    }
  );
  const fileDataForUserAstypeForOthers = useQuery(
    api.files.getRecentFileForUserAsType,
    {
      userId: currentUser?._id,
      fileType: "other",
    }
  );

  const imageFiles =
    fileDataForUser?.filter((file) => file.fileType === "Image").length ?? 0;
  const PDF_Files =
    fileDataForUser?.filter((file) => file.fileType === "PDF").length ?? 0;
  const documentFiles =
    fileDataForUser?.filter((file) => file.fileType === "Document").length ?? 0;
  const audioFiles =
    fileDataForUser?.filter((file) => file.fileType === "Audio").length ?? 0;
  const videoFiles =
    fileDataForUser?.filter((file) => file.fileType === "Video").length ?? 0;
  const otherFiles =
    fileDataForUser?.filter((file) => file.fileType === "other").length ?? 0;

  // File type configuration with icons and colors
  const fileTypeConfig = [
    {
      type: "Audio",
      icon: Music,
      color: "bg-violet-500",
      count: audioFiles,
      data: fileDataForUserAstypeForAudio,
    },
    {
      type: "Video",
      icon: Video,
      color: "bg-rose-500",
      count: videoFiles,
      data: fileDataForUserAstypeForVideo,
    },
    {
      type: "Images",
      icon: ImageIcon,
      color: "bg-blue-500",
      count: imageFiles,
      data: fileDataForUserAstypeForImages,
      fileType: "Image",
    },
    {
      type: "PDFs",
      icon: FileText,
      color: "bg-red-500",
      count: PDF_Files,
      data: fileDataForUserAstypeForPDFs,
      fileType: "PDF",
    },
    {
      type: "Documents",
      icon: File,
      color: "bg-emerald-500",
      count: documentFiles,
      data: fileDataForUserAstypeForDocuments,
      fileType: "Document",
    },
    {
      type: "Other",
      icon: FolderOpen,
      color: "bg-slate-500",
      count: otherFiles,
      data: fileDataForUserAstypeForOthers,
      fileType: "other",
    },
  ];

  const totalFiles = fileDataForUser?.length ?? 0;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2 tracking-tight">
            Files
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            {totalFiles} total files
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {fileTypeConfig.map(({ type, icon: Icon, color, count }) => (
            <div
              key={type}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <div
                className={`w-10 h-10 rounded-md ${color} flex items-center justify-center mb-4`}
              >
                <Icon className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                {count}
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                {type}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Files - All Types */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Recent Files
            </h2>
            <PieData />
            {totalFiles > 0 && (
              <Link href={`/dashboard/files/users/${currentUser._id}`}>
              <button className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                View all
                <ArrowUpRight className="w-4 h-4" />
              </button>
              </Link>
            )}
          </div>

          {totalFiles === 0 ? (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                <FolderOpen
                  className="w-8 h-8 text-zinc-400 dark:text-zinc-600"
                  strokeWidth={2}
                />
              </div>
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                No files yet
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Upload your first file to get started
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fileTypeConfig.map(
                ({ type, icon: Icon, color, count, data, fileType }) => {
                  if (!data || data.length === 0) return null;

                  return data.map((item) => (
                    <FileCard
                      key={item?._id}
                      PNGPath={
                        <div
                          className={`w-12 h-12 rounded-md ${color} flex items-center justify-center shrink-0`}
                        >
                          <Icon
                            className="w-6 h-6 text-white"
                            strokeWidth={2}
                          />
                        </div>
                      }
                      FileType={fileType || type}
                      numOfFiles={count}
                      last_Updated={item?._creationTime}
                    />
                  ));
                }
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
