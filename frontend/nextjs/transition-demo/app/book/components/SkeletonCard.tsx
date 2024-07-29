import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCard() {
  return (
    <Card className="w-96">
      <CardHeader>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardFooter>
        <Skeleton className="h-4 w-1/2" />
      </CardFooter>
    </Card>
  );
}

export default function SkeletonLoader() {
  return (
    <div className="flex flex-col gap-y-2">
      {[...Array(6)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
