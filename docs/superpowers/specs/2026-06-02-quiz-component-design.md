# Quiz Component Design

**Date:** 2026-06-02  
**Status:** Approved

## Overview

An interactive `<Quiz>` component for MDX blog posts that lets students self-test their understanding of class material. A single component instance = one question. Questions can include a multiline code snippet (syntax-highlighted at build time), a question prompt, and multiple-choice options where exactly one is correct.

## Component API

```mdx
<Quiz
  question="¿Qué devuelve area (Circulo 1)?"
  code={`area :: Figura -> Double
area (Circulo r) = pi * r ^ 2`}
  lang="haskell"
  options={[
    { text: "1.0" },
    { text: "2.0" },
    { text: "3.14159…", correct: true, explanation: "pi * 1² = pi ≈ 3.14159. La función aplica pattern matching sobre el constructor Circulo." },
    { text: "No compila" }
  ]}
/>
```

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `question` | `string` | yes | — | The question text shown above the options |
| `options` | `Option[]` | yes | — | Array of answer choices; exactly one must have `correct: true` |
| `code` | `string` | no | — | Multiline code snippet shown above the question, highlighted at build time |
| `lang` | `string` | no | `"haskell"` | Shiki language for the code block |

```typescript
type Option = {
  text: string;
  correct?: boolean;
  explanation?: string; // shown after answering; put it on the correct option
}
```

## Visual Design

Style: **inline / conversational** (Option B). Flows naturally in the post, no heavy framing. Left border accent indicates state.

### States

**Unanswered**
- Left border: neutral gray (`#e5e7eb`)
- Background: `#fafafa`
- Options: white pill buttons with gray border, all clickable

**Answered — wrong**
- Left border: red (`#fca5a5`)
- Background: `#fff8f8`
- Selected option: red pill (red border + red bg + `✗` suffix)
- Correct option: green pill (green border + green bg + `✓` suffix)
- Other options: grayed out, unclickable
- Explanation shown below options

**Answered — correct**
- Left border: green (`#6ee7b7`)
- Background: `#f0fdf4`
- Selected option: green pill with `✓`
- Other options: grayed out, unclickable
- Explanation shown below options

### Structure

```
[border accent]
  🤔 Chequeo rápido
  [code block — dark theme, Shiki-highlighted, optional]
  [question text]
  [option pill] [option pill] [option pill] …
  [explanation — visible only after answering]
```

## Implementation

### File: `src/components/Quiz.astro`

- Astro component (`.astro`), no JS framework
- Code highlighting done in frontmatter using Shiki at build time
- Client interactivity via an inline `<script>` tag (vanilla JS)
- Scoped styles via `<style>` tag

### Code highlighting

Use `codeToHtml` from `shiki` (already a transitive dependency via Astro) to render the code block server-side. The component passes `lang` and applies the same dark theme (`catppuccin-mocha` or the blog's configured theme). The resulting HTML is injected with `set:html`.

> Note: The custom Wollok grammar from `astro.config.mjs` is not automatically available to a manually created Shiki highlighter. For posts using `lang="wollok"`, the implementation will need to load the grammar from `src/shiki/wollok.tmLanguage.json`. This is addressed in the implementation plan.

### Client-side JS behavior

- On option click: record answer, reveal outcome, lock all options (remove click handlers)
- No retry — one click is final
- State is local to the component instance; multiple quizzes on the same page are independent
- No persistence (page refresh resets the quiz)

## Post Migration

Posts using `<Quiz>` must be renamed from `.md` to `.mdx`. `@astrojs/mdx` is already configured in `astro.config.mjs` — no config changes needed.

The component must be imported at the top of each MDX file:

```mdx
---
title: ...
---
import Quiz from '@components/Quiz.astro'

...post content...

<Quiz ... />
```

## Out of Scope

- Retry / reset
- Score tracking across multiple questions
- Persistence across page loads
- Server-side analytics on answers
- The Haskell online runner feature (separate spec)
