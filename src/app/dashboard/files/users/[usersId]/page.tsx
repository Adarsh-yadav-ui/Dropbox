"use client";

import { useQuery } from "convex/react";
import { usePathname } from "next/navigation";
import { api } from "../../../../../../convex/_generated/api";
import { AlertCircle } from "lucide-react";

export default function page() {
  const pathname = usePathname();
  const userId = pathname.replace("/dashboard/files/users/", "");

  const currentUser = useQuery(api.users.current);

  if (currentUser?._id != userId) {
    return (
      <div className="min-h-[calc(100%-65px)] flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-red-50 p-3">
              <AlertCircle className="size-11 text-red-500" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2">
            Access Denied
          </h2>
          <p className="text-slate-500">
            You're attempting to access someone else's data. This action is not
            permitted.
          </p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100%-65px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return <div>{userId}</div>;
}
