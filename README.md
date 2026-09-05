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
LLM_API_KEY=your-api-key
LLM_API_BASE_URL=api-url
LLM_MODEL_STANDARD=deepseek-v4-flash-0731
LLM_MODEL_ADVANCED=gpt-5.6-luna
```

`LLM_API_BASE_URL` configures the OpenAI-compatible gateway. `LLM_MODEL_STANDARD` is used for standard tasks, while `LLM_MODEL_ADVANCED` is used for advanced tasks. Model and client setup live in `src/models.ts`.


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

## Task 3: Ticket Triage

Task 3 extracts the title, priority score, and summary from a support ticket. The score is then used to route the ticket as `critical`, `high`, `medium`, or `low` priority.

### Input and Output

The pipeline accepts an input object with one required property, `ticket`. The ticket should describe the customer impact, urgency, and relevant technical details so the triage agent can assign an appropriate score.

```json
{
	"ticket": "Since 14:20 UTC, every checkout attempt in our production web app has failed with an HTTP 500 response from the payment service. Customers cannot complete purchases, and the failure affects all regions and payment methods. The issue started immediately after today's deployment. We have confirmed the problem in the logs and rolled back once, but errors are still continuing. Please investigate urgently and provide an update within 30 minutes."
}
```

The pipeline returns the extracted ticket information and routes it according to the priority score:

- `critical`: score from 8 to 10
- `high`: score from 5 to 7
- `medium`: score from 3 to 4
- `low`: score from 0 to 2

### Run Task 3

Start the Ticket Triage pipeline:

```bash
pnpm tsx .\src\03-ticket-triage\pipeline.ts
```

Open the Studio playground at [http://localhost:4021/playground](http://localhost:4021/playground) and submit the sample JSON above.

