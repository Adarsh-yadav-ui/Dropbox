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
  MoreVertical,
} from "lucide-react";
import Link from "next/link";

import { useState } from "react";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Field, FieldGroup, FieldLabel } from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Spinner } from "../../components/ui/spinner";

export default function Page() {
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const currentUser = useQuery(api.users.current);
  const fileDataForUser = useQuery(api.files.getFilesForUser, {
    userId: currentUser?._id,
  });

  const fileDataForUserAstypeForAudio = useQuery(
    api.files.getRecentFileForUserAsType,
    {
      userId: currentUser?._id,
      fileType: "Audio",
    },
  );
  const fileDataForUserAstypeForVideo = useQuery(
    api.files.getRecentFileForUserAsType,
    {
      userId: currentUser?._id,
      fileType: "Video",
    },
  );
  const fileDataForUserAstypeForImages = useQuery(
    api.files.getRecentFileForUserAsType,
    {
      userId: currentUser?._id,
      fileType: "Image",
    },
  );

  const fileDataForUserAstypeForPDFs = useQuery(
    api.files.getRecentFileForUserAsType,
    {
      userId: currentUser?._id,
      fileType: "PDF",
    },
  );

  const fileDataForUserAstypeForDocuments = useQuery(
    api.files.getRecentFileForUserAsType,
    {
      userId: currentUser?._id,
      fileType: "Document",
    },
  );
  const fileDataForUserAstypeForOthers = useQuery(
    api.files.getRecentFileForUserAsType,
    {
      userId: currentUser?._id,
      fileType: "other",
    },
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
  const recentFiveFiles = useQuery(api.files.getRecentFilesForUser, {
    userId: currentUser?._id,
    quanitity: 10,
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2 tracking-tight">
            Files
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            {totalFiles} total files
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - File Cards */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              {totalFiles > 0 && (
                <Link href={`/dashboard/files/users/${currentUser?._id}`}>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  },
                )}
              </div>
            )}
          </div>

          {/* Right Column - Recent Files */}
          <div className="lg:col-span-1 mt-10">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Recent files uploaded
              </h2>

              {recentFiveFiles === undefined ? (
                <div className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center py-4">
                  <Spinner className="mr-2" />
                  Loading recent files...
                </div>
              ) : recentFiveFiles.length === 0 ? (
                <div className="text-sm text-zinc-500 dark:text-zinc-400 py-4">
                  No files found :(
                </div>
              ) : (
                <div className="space-y-3">
                  {recentFiveFiles.map((item) => {
                    // Get icon and color based on file type
                    const fileConfig = fileTypeConfig.find(
                      (config) =>
                        config.fileType === item.fileType ||
                        config.type === item.fileType,
                    );
                    const Icon = fileConfig?.icon || File;
                    const color = fileConfig?.color || "bg-zinc-500";

                    // Format the date
                    const date = new Date(item._creationTime);
                    const formattedDate = date.toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                      day: "2-digit",
                      month: "short",
                    });

                    return (
                      <div key={item._id} className="flex items-center">
                        <Link
                          href={`/dashboard/files/${item._id}`}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group"
                        >
                          <div
                            className={`w-10 h-10 rounded-full ${color} flex items-center justify-center shrink-0`}
                          >
                            <Icon
                              className="w-5 h-5 text-white"
                              strokeWidth={2}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                              {formattedDate}
                            </p>
                          </div>
                        </Link>
                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger asChild className="mx-auto mr-3">
                            <Button
                              variant="outline"
                              aria-label="Open menu"
                              size="icon-sm"
                            >
                              <MoreHorizontalIcon />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-40" align="end">
                            <DropdownMenuLabel>File Actions</DropdownMenuLabel>
                            <DropdownMenuGroup>
                              <DropdownMenuItem
                                onSelect={() => setShowNewDialog(true)}
                              >
                                New File...
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onSelect={() => setShowShareDialog(true)}
                              >
                                Share...
                              </DropdownMenuItem>
                              <DropdownMenuItem disabled>
                                Download
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Dialog
                          open={showNewDialog}
                          onOpenChange={setShowNewDialog}
                        >
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Create New File</DialogTitle>
                              <DialogDescription>
                                Provide a name for your new file. Click create
                                when you&apos;re done.
                              </DialogDescription>
                            </DialogHeader>
                            <FieldGroup className="pb-3">
                              <Field>
                                <FieldLabel htmlFor="filename">
                                  File Name
                                </FieldLabel>
                                <Input
                                  id="filename"
                                  name="filename"
                                  placeholder="document.txt"
                                />
                              </Field>
                            </FieldGroup>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button type="submit">Create</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Dialog
                          open={showShareDialog}
                          onOpenChange={setShowShareDialog}
                        >
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Share File</DialogTitle>
                              <DialogDescription>
                                Anyone with the link will be able to view this
                                file.
                              </DialogDescription>
                            </DialogHeader>
                            <FieldGroup className="py-3">
                              <Field>
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  placeholder="shadcn@vercel.com"
                                  autoComplete="off"
                                />
                              </Field>
                              <Field>
                                <FieldLabel htmlFor="message">
                                  Message (Optional)
                                </FieldLabel>
                                <Textarea
                                  id="message"
                                  name="message"
                                  placeholder="Check out this file"
                                />
                              </Field>
                            </FieldGroup>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button type="submit">Send Invite</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
          <PieData />
      </div>
    </div>
  );
}
