import { useMemo } from "react";
import { format } from "@lukeed/ms";

export default (createdAt) => {
  return useMemo(() => {
    const diff = Date.now() - new Date(createdAt).getTime();
    if (diff < 1 * 60 * 1000) return "Just now";
    return `${format(diff, true)} ago`;
  }, [createdAt]);
};
