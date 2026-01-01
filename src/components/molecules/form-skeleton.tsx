import { Skeleton } from "../ui/skeleton";

interface FormSkeletonProps {
  rowCount: number;
  columnCount: number;
}

export default function FormSkeleton({
  rowCount,
  columnCount,
}: FormSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rowCount }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex space-x-4">
          {Array.from({ length: columnCount }).map((_, colIdx) => (
            <div className="space-y-2 w-full" key={colIdx}>
              <Skeleton className="flex-1 rounded-md w-1/3 h-4" />
              <Skeleton className="flex-1 rounded-md h-8" />
            </div>
          ))}
        </div>
      ))}
      <Skeleton className="flex-1 mt-8 rounded-md w-full h-8" />
    </div>
  );
}
