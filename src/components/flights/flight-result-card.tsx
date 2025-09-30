import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { type Flight } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "../ui/badge";

interface FlightResultCardProps {
  flight: Flight;
}

export default function FlightResultCard({ flight }: FlightResultCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 grid grid-cols-1 md:grid-cols-6 items-center gap-4">
        {/* Airline Info */}
        <div className="md:col-span-2 flex items-center gap-4">
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
            <p className="text-sm text-muted-foreground">{flight.flightNumber}</p>
          </div>
        </div>

        {/* Flight Times */}
        <div className="md:col-span-3 grid grid-cols-3 items-center text-center">
          <div className="text-left">
            <p className="text-xl font-semibold">{flight.origin.time}</p>
            <p className="text-muted-foreground">{flight.origin.code}</p>
          </div>
          <div className="flex flex-col items-center text-muted-foreground">
            <p className="text-sm">{flight.duration}</p>
            <div className="w-full flex items-center">
              <div className="h-2 w-2 rounded-full border-2 border-current"></div>
              <div className="flex-grow border-t border-dashed"></div>
              <ArrowRight className="h-4 w-4" />
            </div>
            <p className="text-sm">Direct</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-semibold">{flight.destination.time}</p>
            <p className="text-muted-foreground">{flight.destination.code}</p>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="md:col-span-1 flex flex-col items-end gap-2 text-right">
            <p className="text-2xl font-bold text-primary">${flight.price.toFixed(2)}</p>
            <Badge variant={flight.class === 'Business' ? 'default' : 'secondary'}>{flight.class}</Badge>
            <Button asChild size="sm" className="w-full mt-2" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
              <Link href={`/booking/${flight.id}/summary`}>
                Select Flight
              </Link>
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
