import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./ui/card";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  formatCreationTime,
  formatRelativeTime,
} from "../hooks/use-format-date";
import { Clock } from "lucide-react";

interface FileCard {
  PNGPath: React.ReactNode;
  FileType: string;
  numOfFiles: number;
  last_Updated: number;
}

export function FileCard({
  PNGPath,
  FileType,
  numOfFiles,
  last_Updated,
}: FileCard) {
  const actualDate = formatCreationTime(last_Updated);
  const hoursDate = formatRelativeTime(last_Updated);
  
  return (
    <Card className="group relative w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200">
      <CardHeader className="p-6">
        <div className="flex items-center gap-4">
          {PNGPath}
          <div className="flex-1">
            <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100 mb-0.5">
              {FileType}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {numOfFiles} {numOfFiles === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardFooter className="px-6 pb-6 pt-0">
        <Tooltip delayDuration={250}>
          <TooltipTrigger className="w-full">
            <div className="flex items-center gap-2.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <div className="flex flex-col items-start min-w-0">
                <span className="text-xs text-zinc-500 dark:text-zinc-500 mb-0.5">Last uploaded</span>
                <span className="font-normal truncate w-full text-left">{hoursDate}</span>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-0">
            <div className="text-sm">{actualDate}</div>
          </TooltipContent>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}