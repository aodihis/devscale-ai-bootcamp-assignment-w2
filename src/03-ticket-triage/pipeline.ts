import z from "zod";
import { Pipeline } from "@anvia/core/pipeline";
import { extract_ticket_information, ticket_routing_priority } from "./service.js";
import { Studio } from "@anvia/studio";

const InputSchema = z.object({
  ticket: z.string(),
});

const pipeline = new Pipeline({
    id: 'ticket-triage',
    inputSchema: InputSchema
}).step({
    id: "extract-information",
    run: async (context) => {
        const ticket = context.input.ticket;
        const ticketData  = await extract_ticket_information(ticket);
        return {ticketData}
    }
}).step({
    id: "routing",
    run: async (context) => {
        const ticketData = context.input.ticketData;
        const score = ticketData.score;

        const priority = ticket_routing_priority(score);
        return priority;
    }
});

new Studio([pipeline]).start();
