'use server';

/**
 * @fileOverview AI chat assistance for flight booking advice.
 *
 * - aiChatAssistance - A function that provides AI-powered chat assistance for flight booking.
 * - AIChatAssistanceInput - The input type for the aiChatAssistance function.
 * - AIChatAssistanceOutput - The return type for the aiChatAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatAssistanceInputSchema = z.object({
  query: z.string().describe('The user query for flight booking assistance.'),
});
export type AIChatAssistanceInput = z.infer<typeof AIChatAssistanceInputSchema>;

const AIChatAssistanceOutputSchema = z.object({
  response: z.string().describe('The AI response to the user query.'),
});
export type AIChatAssistanceOutput = z.infer<typeof AIChatAssistanceOutputSchema>;

const AvailableBookingDatesInputSchema = z.object({
  origin: z.string().describe('The origin city for the flight.'),
  destination: z.string().describe('The destination city for the flight.'),
});

const AvailableBookingDatesOutputSchema = z.array(z.string().describe('Available booking date in ISO 8601 format'));

const getAvailableBookingDates = ai.defineTool(
  {
    name: 'getAvailableBookingDates',
    description: 'Returns a list of available booking dates for a given origin and destination.',
    inputSchema: AvailableBookingDatesInputSchema,
    outputSchema: AvailableBookingDatesOutputSchema,
  },
  async (input) => {
    // In a real implementation, this would call an external API or database to fetch available dates.
    // For this example, we'll return a fixed set of dates.
    const availableDates = [
      '2024-12-01',
      '2024-12-08',
      '2024-12-15',
      '2024-12-22',
      '2024-12-29',
    ];
    return availableDates;
  }
);

export async function aiChatAssistance(input: AIChatAssistanceInput): Promise<AIChatAssistanceOutput> {
  return aiChatAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatAssistancePrompt',
  input: {schema: AIChatAssistanceInputSchema},
  output: {schema: AIChatAssistanceOutputSchema},
  tools: [getAvailableBookingDates],
  prompt: `You are a helpful AI assistant specializing in flight booking advice.

  The user is asking for assistance with their flight booking. Use your knowledge and any available tools to provide the best possible advice.

  If the user asks about available booking dates for a specific flight (origin and destination), use the getAvailableBookingDates tool to retrieve the dates and inform the user.

  User query: {{{query}}}`,
});

const aiChatAssistanceFlow = ai.defineFlow(
  {
    name: 'aiChatAssistanceFlow',
    inputSchema: AIChatAssistanceInputSchema,
    outputSchema: AIChatAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
