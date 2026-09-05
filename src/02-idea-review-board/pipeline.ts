import { generateCompletion } from "@anvia/core";
import z from "zod";
import { Pipeline } from "@anvia/core/pipeline";
import { generatePitch, generateReview, mergeReviews } from "./service.js";
import { Studio } from "@anvia/studio";

const InputSchema = z.object({
  idea: z.string(),
});

const pipeline = new Pipeline({
    id: "idea-review-board",
    inputSchema: InputSchema,
}).step({
    id: "generate-pitch",
    run: async (context) => {
        const pitch = await generatePitch(context.input.idea);
        return {pitch} ;
    }
}).step({
    id: "generate-reviews",
    run: async (context) => {
        const pitch = context.input.pitch;

        const [ceoReview, analystReview, ctoReview] = await Promise.all([
            generateReview(pitch, 'CEO'),
            generateReview(pitch, 'ANALYST'),
            generateReview(pitch, 'CTO'),
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