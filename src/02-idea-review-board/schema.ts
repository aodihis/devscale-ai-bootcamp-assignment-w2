import z from "zod";

export const InputSchema = z.object({
  idea: z.string().min(1, "Idea is required"),
});

export enum Actor {
  CEO = "CEO",
  ANALYST = "ANALYST",
  CTO = "CTO",
}

export const ActorSchema = z.enum(Actor);
