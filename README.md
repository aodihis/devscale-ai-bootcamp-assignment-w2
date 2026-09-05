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

### Input and Output

The agent requires a topic from the user as its input before it can generate an article.

The pipeline accepts an input object with one required property:

```json
{
	"topic": "How to use AI for daily life"
}
```

An empty topic is rejected by the input schema.

The final output is the rewritten article produced by the third step. The pipeline is defined in `pipeline.ts`, while the AI prompts and completion calls are implemented in `service.ts`.

### Run Task 1

Start the Article Refiner pipeline:

```bash
pnpm tsx .\src\01-article-refiner\pipeline.ts
```

Open the Studio playground at [http://localhost:4021/playground](http://localhost:4021/playground) and submit the sample JSON above.

## Task 2: Idea Review Board

Task 2 evaluates a startup idea from three perspectives: CEO, market analyst, and CTO. Their reviews are generated in parallel and then merged into a final recommendation.

### Input

The pipeline accepts an input object with one required property:

```json
{
	"idea": "Build a subscription service for independent restaurants that predicts next-week ingredient demand from historical orders, reservations, weather, and local events. The service should reduce food waste and stockouts by sending daily purchasing recommendations to restaurant managers. Charge each location $99 per month, starting with restaurants that have 1 to 3 locations in major cities. The first MVP should integrate with Square and Toast, support manual CSV uploads, and provide a simple dashboard with demand forecasts, suggested order quantities, and estimated savings."
}
```

### Run Task 2

Start the Idea Review Board pipeline:

```bash
pnpm tsx .\src\02-idea-review-board\pipeline.ts
```

Open the Studio playground at [http://localhost:4021/playground](http://localhost:4021/playground) and submit the sample JSON above.

