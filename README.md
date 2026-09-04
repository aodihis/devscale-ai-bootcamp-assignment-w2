# Devscale AI Product Engineering: TypeScript II

Assignment for Week 2 by Iqbal.

## Setup

Requirements:

- Node.js
- pnpm
- An OpenAI-compatible API key

Install dependencies:

```bash
pnpm install
```

Create a local environment file from the example and add your credentials:

```env
OPENAI_API_KEY=your-api-key
OPENAI_API_BASE_URL=https://gateway.devscale.id/v1
```

`OPENAI_API_BASE_URL` is optional when using the default OpenAI endpoint. The configured model is `gpt-5.6-luna`; model and client setup live in `src/models.ts`.


## Task 1: Article Refiner

Task 1 builds an Article Refiner with a three-step AI pipeline. A user provides a topic, and the pipeline turns it into a polished article through drafting, editing, and rewriting.

### How It Works

The pipeline runs these steps in order:

1. **Draft**: The Drafter expands the topic into a complete first draft with a clear narrative, logical structure, and suitable tone.
2. **Critique**: The Critiquer acts as a senior editor. It reviews the draft for its hook, flow, clarity, concision, tone, and voice. It does not rewrite the article; instead, it creates a list of specific instructions for improvement.
3. **Rewrite**: The Rewriter receives the topic, original draft, and editorial instructions. It applies the feedback and returns the final polished article.

Each step passes its output to the next step. This separates content creation from evaluation and revision, allowing the final article to be improved based on targeted editorial feedback.

### Input and Output

The agent requires a topic from the user as its input before it can generate an article.

The pipeline accepts an input object with one required property:

```ts
{ topic: string }
```

An empty topic is rejected by the input schema.

The final output is the rewritten article produced by the third step. The pipeline is defined in `pipeline.ts`, while the AI prompts and completion calls are implemented in `service.ts`.

