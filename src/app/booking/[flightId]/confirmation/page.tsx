import { mockFlights } from "@/lib/flights-data";
import { notFound } from "next/navigation";
import BookingConfirmation from "@/components/booking/booking-confirmation";

export default function BookingConfirmationPage({
  params,
}: {
  params: { flightId: string };
}) {
  const flight = mockFlights.find((f) => f.id === params.flightId);
  const bookingId = `AA-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

  if (!flight) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-2xl py-12">
        <BookingConfirmation flight={flight} bookingId={bookingId} />
    </div>
  );
}
