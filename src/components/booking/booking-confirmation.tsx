import { type Flight } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Download, Home } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BookingConfirmation({ flight, bookingId }: { flight: Flight, bookingId: string }) {
  return (
    <Card className="text-center">
      <CardHeader className="items-center">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
        <CardTitle className="font-headline text-2xl">Booking Confirmed!</CardTitle>
        <CardDescription>
          Your flight is booked. Your booking ID is <span className="font-bold text-primary">{bookingId}</span>.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator />
        <div className="text-left">
            <h3 className="font-semibold mb-4">Flight Summary</h3>
             <div className="flex items-center gap-4 mb-4">
              <Image
                src={flight.airlineLogoUrl}
                alt={`${flight.airline} logo`}
                width={40}
                height={40}
                className="rounded-full"
                data-ai-hint="airline logo"
              />
              <div>
                <p className="font-semibold">{flight.airline}</p>
                <p className="text-sm text-muted-foreground">{flight.flightNumber} &bull; {flight.class}</p>
              </div>
            </div>
             <div className="grid grid-cols-3 items-center text-sm">
                 <div className="text-left">
                    <p className="font-bold">{flight.origin.code}</p>
                    <p className="text-muted-foreground">{flight.origin.time}</p>
                </div>
                <div className="text-center text-muted-foreground">
                    <p>{flight.duration}</p>
                </div>
                 <div className="text-right">
                    <p className="font-bold">{flight.destination.code}</p>
                    <p className="text-muted-foreground">{flight.destination.time}</p>
                </div>
            </div>
        </div>
        <Separator />
        <div className="flex flex-col sm:flex-row gap-2 pt-4">
          <Button variant="outline" className="w-full">
            <Download />
            Download Ticket
          </Button>
          <Button asChild className="w-full">
            <Link href="/">
              <Home />
              Back to Home
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
