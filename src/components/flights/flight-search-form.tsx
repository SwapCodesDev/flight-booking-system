"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from 'next/navigation';
import { format } from "date-fns";
import { CalendarIcon, PlaneTakeoff, PlaneLanding, Users, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  origin: z.string().min(3, { message: "Origin must be at least 3 characters." }),
  destination: z.string().min(3, { message: "Destination must be at least 3 characters." }),
  date: z.date({ required_error: "A date is required." }),
  passengers: z.string().min(1, { message: "Select number of passengers." }),
});

export default function FlightSearchForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      origin: "",
      destination: "",
      passengers: "1",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = new URLSearchParams({
      origin: values.origin,
      destination: values.destination,
      date: format(values.date, 'yyyy-MM-dd'),
      passengers: values.passengers,
    });
    router.push(`/flights?${params.toString()}`);
  }

  return (
    <Card className="w-full shadow-2xl">
      <CardContent className="p-4 md:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9 gap-4 items-end">
            <div className="lg:col-span-2">
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <PlaneTakeoff className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="e.g. New York (JFK)" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="lg:col-span-2">
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <PlaneLanding className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="e.g. Los Angeles (LAX)" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="lg:col-span-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Departure Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0,0,0,0)) 
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="lg:col-span-2">
              <FormField
                control={form.control}
                name="passengers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passengers</FormLabel>
                     <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="pl-10">
                            <SelectValue placeholder="Select passengers" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[...Array(8)].map((_, i) => (
                            <SelectItem key={i + 1} value={`${i + 1}`}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="lg:col-span-1">
              <Button type="submit" className="w-full" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} >
                <Search/>
                Search
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
