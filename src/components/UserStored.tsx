import { useConvexAuth } from "convex/react";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "../../convex/_generated/api";

export default function UserStored() {
  const { isAuthenticated } = useConvexAuth();
  const store = useMutation(api.users.store);

  useEffect(() => {
    if (isAuthenticated) {
      store({});
    }
  }, [isAuthenticated, store]);

  return null;
}
