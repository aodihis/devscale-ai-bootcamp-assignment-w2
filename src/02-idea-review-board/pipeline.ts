import { Pipeline } from "@anvia/core/pipeline";
import { mergeReviews } from "./service.js";
import { Studio } from "@anvia/studio";
import { Actor, InputSchema } from "./schema.js";
import { review } from "./branches.js";

const pipeline = new Pipeline({
    id: "idea-review-board",
    inputSchema: InputSchema,
}).parallel({
    id: "generate-reviews",
    branches: {
        ceoReview: review(Actor.CEO),
        analystReview: review(Actor.ANALYST),
        ctoReview: review(Actor.CTO),
    }
})
.step({
    id: "merge-reviews",
    run: async (context) => {
        const { ceoReview, analystReview, ctoReview } = context.input;
        const reviews = `
            <ceo-review>${ceoReview}</ceo-review>
            <analyst-review>${analystReview}</analyst-review>
            <cto-review>${ctoReview}</cto-review>
        `;
        return await mergeReviews(reviews);
    }
});

new Studio([pipeline]).start();