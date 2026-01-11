import { PageSkeleton } from "@/components/refine-ui/layout/page-skeleton";

export default function Loading() {
  return <PageSkeleton type="list" resource="subjects" />;
}
