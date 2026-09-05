import { CEO_INSTRUCTIONS, ANALYST_INSTRUCTIONS, CTO_INSTRUCTIONS, MERGE_INSTRUCTIONS } from './instructions.js'
import { generateCompletion } from "@anvia/core";
import { getModel } from "../models.js";


type Actor = 'CEO' | 'ANALYST' | 'CTO' ;


export const generateReview = async (idea: string, actor: Actor) => {
    let instructions: string;

    switch (actor) {
        case 'CEO':
            instructions = CEO_INSTRUCTIONS;
            break;
        case 'ANALYST':
            instructions = ANALYST_INSTRUCTIONS;
            break;
        case 'CTO':
            instructions = CTO_INSTRUCTIONS;
            break;
        default:
            throw new Error(`Unsupported review actor: ${actor}`);
    }

    const prompt = `Startup Idea:\n\n${idea}`;

    const response = await generateCompletion({
        model: getModel('standard'),
        instructions,
        prompt
    });

    return response.output;
};


export const mergeReviews = async (reviews: string) => {
    const prompt = `Reviews:\n\n${reviews}`;

   const response = await generateCompletion({
       model: getModel('advanced'),
       instructions: MERGE_INSTRUCTIONS,
       prompt
   });

   return response.output;
};

