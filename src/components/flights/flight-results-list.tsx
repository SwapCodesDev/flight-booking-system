import { mockFlights } from "@/lib/flights-data";
import FlightResultCard from "./flight-result-card";
import { Plane } from "lucide-react";

export default async function FlightResultsList({
  searchParams,
}: {
  searchParams?: {
    origin?: string;
    destination?: string;
  };
}) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const filteredFlights = mockFlights.filter(flight => {
    const originMatch = searchParams?.origin ? flight.origin.code.toLowerCase() === searchParams.origin.toLowerCase() || flight.origin.city.toLowerCase().includes(searchParams.origin.toLowerCase()) : true;
    const destinationMatch = searchParams?.destination ? flight.destination.code.toLowerCase() === searchParams.destination.toLowerCase() || flight.destination.city.toLowerCase().includes(searchParams.destination.toLowerCase()) : true;
    return originMatch && destinationMatch;
  });

  if (filteredFlights.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
        <Plane className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No Flights Found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We couldn't find any flights for your search. Try changing your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredFlights.map((flight) => (
        <FlightResultCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
}
