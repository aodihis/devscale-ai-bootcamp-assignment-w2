import z from "zod";
import { Pipeline } from "@anvia/core/pipeline";
import { generateReview, mergeReviews } from "./service.js";
import { Studio } from "@anvia/studio";

const InputSchema = z.object({
  idea: z.string(),
});

const pipeline = new Pipeline({
    id: "idea-review-board",
    inputSchema: InputSchema,
}).step({
    id: "generate-reviews",
    run: async (context) => {
        const idea = context.input.idea;

        const [ceoReview, analystReview, ctoReview] = await Promise.all([
            generateReview(idea, 'CEO'),
            generateReview(idea, 'ANALYST'),
            generateReview(idea, 'CTO'),
        ]);

        return { ceoReview, analystReview, ctoReview };
    }
}).step({
    id: "merge-reviews",
    run: async (context) => {
        const { ceoReview, analystReview, ctoReview } = context.input;
        const reviews = `
            <ceo-review>${ceoReview}</ceo-review>
            <analyst-review>${analystReview}</analyst-review>
            <cto-review>${ctoReview}</cto-review>
        `;
        const mergedReviews = await mergeReviews(reviews);
        return mergedReviews ;
    }
});

new Studio([pipeline]).start();