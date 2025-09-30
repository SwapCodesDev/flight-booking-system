"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Users, Briefcase } from "lucide-react";
import { type Flight } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BookingSummary({ flight }: { flight: Flight }) {
    const taxes = flight.price * 0.1;
    const total = flight.price + taxes;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Flight Itinerary</CardTitle>
          </CardHeader>
          <CardContent>
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
            <div className="flex justify-between items-center">
                <div className="text-left">
                    <p className="font-bold">{flight.origin.code}</p>
                    <p className="text-sm text-muted-foreground">{flight.origin.city}</p>
                    <p className="text-sm text-muted-foreground">{flight.origin.time}</p>
                </div>
                 <div className="flex items-center text-muted-foreground text-sm">
                    <span className="w-16 text-center">{flight.duration}</span>
                    <ArrowRight className="h-4 w-4 mx-2" />
                </div>
                 <div className="text-right">
                    <p className="font-bold">{flight.destination.code}</p>
                    <p className="text-sm text-muted-foreground">{flight.destination.city}</p>
                    <p className="text-sm text-muted-foreground">{flight.destination.time}</p>
                </div>
            </div>
          </CardContent>
        </Card>

         <Card>
          <CardHeader>
            <CardTitle className="font-headline">Passenger Details</CardTitle>
            <CardDescription>Enter the primary passenger's information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
            <CardHeader>
                <CardTitle className="font-headline">Price Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Fare</span>
                    <span>${flight.price.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & Fees</span>
                    <span>${taxes.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </CardContent>
            <CardFooter>
                 <Button asChild size="lg" className="w-full" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                    <Link href={`/booking/${flight.id}/confirmation`}>
                        Confirm Booking
                    </Link>
                </Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
