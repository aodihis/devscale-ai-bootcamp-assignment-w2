import "dotenv/config";
import { OpenAIClient } from "@anvia/openai";


type ModelTier = 'standard' | 'advanced';

const client = new OpenAIClient({
  apiKey: process.env.LLM_API_KEY || "",
  baseUrl: process.env.LLM_API_BASE_URL || "",
});


export const getModel = (tier: ModelTier = 'standard') => {
  const modelId =
    tier === 'advanced'
      ? process.env.LLM_MODEL_ADVANCED || ''
      : process.env.LLM_MODEL_STANDARD || '';

  return client.completionModel({
    modelId,
    api: 'chat',
  });
};