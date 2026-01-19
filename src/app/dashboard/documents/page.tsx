"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export default function page() {
  const currentUser = useQuery(api.users.current);
  const fileDataForUserAstypeForDocuments = useQuery(
    api.files.getFileForUserAsType,
    {
      userId: currentUser?._id,
      fileType: "Audio",
    },
  );

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100%-65px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div>
      {fileDataForUserAstypeForDocuments?.map((item) => {
        return <div key={item?._id}>{item.name}</div>;
      })}
    </div>
  );
}
