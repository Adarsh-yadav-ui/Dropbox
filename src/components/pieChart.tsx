"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./ui/chart";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const description = "A donut chart with text";

export function PieData() {
  const currentUser = useQuery(api.users.current);
  const fileDataForUser = useQuery(api.files.getFilesForUser, {
    userId: currentUser?._id,
  });

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
  const chartConfig = {
    Files: {
      label: "Files",
    },
    chrome: {
      label: "Chrome",
      color: "var(--chart-1)",
    },
    safari: {
      label: "Safari",
      color: "var(--chart-2)",
    },
    firefox: {
      label: "Firefox",
      color: "var(--chart-3)",
    },
    edge: {
      label: "Edge",
      color: "var(--chart-4)",
    },
    other: {
      label: "Other",
      color: "var(--chart-5)",
    },
  } satisfies ChartConfig;
  const chartData = [
    {
      Type: "Images",
      Files: imageFiles,
      fill: "var(--color-chrome)",
    },
    {
      Type: "PDFs",
      Files: PDF_Files,
      fill: "var(--color-safari)",
    },
    {
      Type: "Documents",
      Files: documentFiles,
      fill: "var(--color-firefox)",
    },
    {
      Type: "Audio",
      Files: audioFiles,
      fill: "var(--color-edge)",
    },
    {
      Type: "Video",
      Files: videoFiles,
      fill: "var(--color-other)",
    },
    {
      Type: "Other",
      Files: otherFiles,
      fill: "var(--color-other)",
    },
  ];
  const totalFiles = chartData.reduce((acc, curr) => acc + curr.Files, 0);

  return (
    <Card className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-5">
      <CardHeader className="pb-0">
        <h2 className="font-bold text-2xl">Upload data</h2>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-60"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="Files"
              nameKey="Type"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalFiles.toString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Files
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
