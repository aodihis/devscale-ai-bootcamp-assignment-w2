import { Pipeline } from "@anvia/core/pipeline";
import z from "zod";
import { Studio } from "@anvia/studio";
import { generateCritique, generateDraft, generateRewrite } from "./service.js";


const InputSchema = z.object({
    topic: z.string().min(1, "Topic is required"),
});

const pipeline =  new Pipeline({
    id: 'generate-article',
    inputSchema: InputSchema,
}).step({
    id: 'generate-draft',
    run: async (context) => {
        const topic = context.input.topic;
        const draft = await generateDraft(topic);
        return {
            topic,
            draft
        };
    }
}).step({
    id: 'generate-critique',
    run: async (context) => {
        const { topic, draft } = context.input;
        const critique = await generateCritique(topic, draft);
        return {
            topic,
            draft,
            critique
        };
    }
}).step({
    id: 'generate-rewrite',
    run: async (context) => {  
        const { topic, draft, critique } = context.input;
        const rewrite = await generateRewrite(topic, draft, critique);
        return rewrite;
     }
});

new Studio([pipeline]).start();