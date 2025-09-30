import { cookies } from 'next/headers';
import { recommendFlights } from '@/ai/flows/intelligent-flight-recommendations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';

export default async function Recommendations() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get('user');

  if (!userCookie) {
    return null;
  }

  let recommendations: string | null = null;
  try {
    const response = await recommendFlights({
      userHistory: 'Traveled to Paris (CDG) from New York (JFK) twice in the last year, prefers window seats and budget airlines.',
      preferences: 'Looking for a summer vacation in Europe, interested in historical sites and good food. Budget is around $1000 for the flight.',
    });
    recommendations = response.recommendations;
  } catch (error) {
    console.error('Failed to fetch flight recommendations:', error);
    // Silently fail, don't show an error to the user for this feature
  }

  if (!recommendations) {
    return null;
  }
  
  return (
    <section className="container mx-auto py-12">
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Wand2 className="text-primary" />
            Personalized For You
          </CardTitle>
          <CardDescription>
            Based on your travel style, here are some trips we think you'll love.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none text-foreground/90">
             <p>{recommendations}</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
