import { Pipeline } from "@anvia/core/pipeline";
import { generateReview } from "./service.js";
import { InputSchema, type Actor } from "./schema.js";

export const review = (actor: Actor) => new Pipeline({
    id: `${actor.toLowerCase()}-review`,
    inputSchema: InputSchema,
}).step({
    id: 'review',
    run: async (context) => {
        const idea = context.input.idea;
        return await generateReview(idea, actor);
    }
});
