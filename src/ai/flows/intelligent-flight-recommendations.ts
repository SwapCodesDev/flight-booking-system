'use server';
/**
 * @fileOverview AI-powered flight recommendation agent.
 *
 * - recommendFlights - A function that provides flight recommendations based on user history and preferences.
 * - RecommendFlightsInput - The input type for the recommendFlights function.
 * - RecommendFlightsOutput - The return type for the recommendFlights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendFlightsInputSchema = z.object({
  userHistory: z
    .string()
    .describe(
      'A summary of the users past travel history, including destinations, frequency, and preferences, such as preferred airlines or class.'
    ),
  preferences: z
    .string()
    .describe(
      'Any specific travel preferences the user has expressed, such as budget constraints, desired travel dates, or activities of interest.'
    ),
});
export type RecommendFlightsInput = z.infer<typeof RecommendFlightsInputSchema>;

const RecommendFlightsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A list of flight recommendations tailored to the user history and preferences, including destination, dates, and estimated price.'
    ),
});
export type RecommendFlightsOutput = z.infer<typeof RecommendFlightsOutputSchema>;

export async function recommendFlights(input: RecommendFlightsInput): Promise<RecommendFlightsOutput> {
  return recommendFlightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendFlightsPrompt',
  input: {schema: RecommendFlightsInputSchema},
  output: {schema: RecommendFlightsOutputSchema},
  prompt: `You are an AI travel assistant that specializes in providing flight recommendations.

  Based on the user's travel history and preferences, provide a list of personalized flight recommendations.

  User History: {{{userHistory}}}
  Preferences: {{{preferences}}}

  Recommendations:`,
});

const recommendFlightsFlow = ai.defineFlow(
  {
    name: 'recommendFlightsFlow',
    inputSchema: RecommendFlightsInputSchema,
    outputSchema: RecommendFlightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
