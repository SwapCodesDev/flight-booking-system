import { mockFlights } from "@/lib/flights-data";
import BookingSummary from "@/components/booking/booking-summary";
import { notFound } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function BookingSummaryPage({
  params,
}: {
  params: { flightId: string };
}) {
  const flight = mockFlights.find((f) => f.id === params.flightId);

  if (!flight) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="space-y-4 mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Booking Summary</h1>
        <p className="text-muted-foreground">
          Please review your flight details below before confirming your booking.
        </p>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>This is a mock booking</AlertTitle>
          <AlertDescription>
            No real payment will be processed. This is for demonstration purposes only.
          </AlertDescription>
        </Alert>
      </div>
      <BookingSummary flight={flight} />
    </div>
  );
}
