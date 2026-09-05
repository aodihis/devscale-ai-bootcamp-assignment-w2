import { PITCH_INSTRUCTIONS, CEO_INSTRUCTIONS, ANALYST_INSTRUCTIONS, CTO_INSTRUCTIONS, MERGE_INSTRUCTIONS } from './instructions.js'
import { generateCompletion } from "@anvia/core";
import { getModel } from "../models.js";


type Actor = 'CEO' | 'ANALYST' | 'CTO' ;

export const generatePitch = async (idea: string) => {
       const prompt = `Project Idea: ${idea}\n\n`;
   
       const response = await generateCompletion({
           model: getModel('standard'),
           instructions: PITCH_INSTRUCTIONS,
           prompt: prompt
       });
   
       return response.output;
}


export const generateReview = async (pitch: string, actor: Actor) => {
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

    const prompt = `Startup Pitch:\n\n${pitch}`;

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

