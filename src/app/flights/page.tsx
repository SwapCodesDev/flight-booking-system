import { Suspense } from "react";
import FlightResultsList from "@/components/flights/flight-results-list";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

export default function FlightsPage({
  searchParams,
}: {
  searchParams?: {
    origin?: string;
    destination?: string;
    date?: string;
    passengers?: string;
  };
}) {
  const origin = searchParams?.origin || "anywhere";
  const destination = searchParams?.destination || "anywhere";
  const date = searchParams?.date ? new Date(searchParams.date).toDateString() : "anytime";
  const passengers = searchParams?.passengers || "1";

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Available Flights
        </h1>
        <p className="text-muted-foreground">
          Showing results for flights from <span className="font-semibold text-primary">{origin}</span> to <span className="font-semibold text-primary">{destination}</span> on <span className="font-semibold text-primary">{date}</span> for <span className="font-semibold text-primary">{passengers} passenger(s)</span>.
        </p>
      </div>
      <Suspense fallback={<FlightResultsSkeleton />}>
        <FlightResultsList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

function FlightResultsSkeleton() {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }
  
  function CardSkeleton() {
    return (
      <div className="p-4 border rounded-lg space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="grid grid-cols-3 items-center text-center">
            <Skeleton className="h-6 w-3/4 justify-self-start" />
            <Skeleton className="h-4 w-1/2 justify-self-center" />
            <Skeleton className="h-6 w-3/4 justify-self-end" />
        </div>
      </div>
    );
  }
