import { generateCompletion } from "@anvia/core";
import { getModel } from "../models.js";
import { TICKET_TRIAGE_INSTRUCTIONS } from "./instructions.js";
import z from "zod";

const TicketSchema = z.object({
  title: z.string(),
  score: z.int(),
  summary: z.string()
})
const extract_ticket_information = async (ticket: string) => {
    const prompt = `Ticket:\n\n${ticket}`;

    const response = await generateCompletion({
        model: getModel('standard'),
        instructions : TICKET_TRIAGE_INSTRUCTIONS,
        prompt,
        outputSchema: TicketSchema
    });

    return response.output;
}

const ticket_routing_priority = (score: number) => {
  if (score < 0 || score > 10) {
    throw new Error("Priority score must be between 0 and 10");
  }

  if (score >= 8) return "critical";
  if (score >= 5) return "high";
  if (score >= 3) return "medium";
  return "low";
};

export {
  extract_ticket_information,
  ticket_routing_priority
}