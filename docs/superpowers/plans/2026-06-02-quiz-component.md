# Quiz Component Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `<Quiz>` Astro component that renders an interactive single-question quiz with optional syntax-highlighted code, multiple-choice options, and correct/wrong feedback — usable inline in MDX blog posts.

**Architecture:** A pure Astro component (`Quiz.astro`) with build-time Shiki code highlighting via a shared singleton utility (`src/lib/highlight.ts`) and a vanilla-JS `<script>` block for click/reveal interactivity. State is managed entirely through `data-*` attributes and scoped CSS selectors — no framework, no runtime bundle.

**Tech Stack:** Astro 5, Shiki v3 (`getSingletonHighlighter`), Tailwind CSS (layout/typography), scoped CSS (interactive states), vanilla JS

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/lib/highlight.ts` | Singleton Shiki highlighter, `highlightCode(code, lang)` |
| Create | `src/components/Quiz.astro` | Component: props, build-time highlight, HTML, scoped CSS, JS |
| Create | `src/content/blog/2025/quiz-demo/index.mdx` | Draft post to verify the component visually |
| Modify | `.gitignore` | Add `.superpowers/` |

---

## Task 1: Housekeeping

**Files:**
- Modify: `.gitignore`
- Shell: `pnpm add shiki`

- [ ] **Step 1: Add `.superpowers/` to `.gitignore`**

Open `.gitignore` and add after the `.DS_Store` line:

```
# brainstorming session files
.superpowers/
```

- [ ] **Step 2: Add `shiki` as a direct dependency**

```bash
cd /path/to/project && pnpm add shiki
```

Expected output: something like `+ shiki 3.x.x`. This pins the direct dependency so pnpm's strict isolation doesn't block the import.

- [ ] **Step 3: Commit**

```bash
git add .gitignore package.json pnpm-lock.yaml
git commit -m "chore: add shiki dep and ignore brainstorm dir"
```

---

## Task 2: Shiki highlight utility

**Files:**
- Create: `src/lib/highlight.ts`

- [ ] **Step 1: Create `src/lib/highlight.ts`**

```typescript
import { getSingletonHighlighter } from 'shiki'
import wollokGrammar from '../shiki/wollok.tmLanguage.json'

export async function highlightCode(code: string, lang: string): Promise<string> {
  const hl = await getSingletonHighlighter({
    themes: ['github-dark'],
    langs: [wollokGrammar as any],
  })

  const loaded = hl.getLoadedLanguages()
  if (!loaded.includes(lang as any)) {
    try {
      await hl.loadLanguage(lang as any)
    } catch {
      lang = 'text'
    }
  }

  return hl.codeToHtml(code, { lang, theme: 'github-dark' })
}
```

Notes:
- `getSingletonHighlighter` caches the instance across all calls in the same build — no repeated startup cost.
- Wollok grammar is loaded upfront (it's a custom grammar, not a bundled one); all other languages are loaded on demand.
- Falls back to `'text'` (no highlighting) for unknown languages rather than crashing the build.

- [ ] **Step 2: Verify TypeScript is happy**

```bash
pnpm astro check
```

Expected: no errors related to `src/lib/highlight.ts`. If you see `Cannot find module '../shiki/wollok.tmLanguage.json'`, add `"resolveJsonModule": true` to `tsconfig.json` under `compilerOptions`.

- [ ] **Step 3: Commit**

```bash
git add src/lib/highlight.ts
git commit -m "feat: add Shiki highlight utility with Wollok grammar support"
```

---

## Task 3: Quiz component — structure, styles, and interactivity

**Files:**
- Create: `src/components/Quiz.astro`

- [ ] **Step 1: Create `src/components/Quiz.astro`**

```astro
---
import { highlightCode } from '@lib/highlight'

interface Option {
  text: string
  correct?: boolean
  explanation?: string
}

interface Props {
  question: string
  options: Option[]
  code?: string
  lang?: string
}

const { question, options, code, lang = 'haskell' } = Astro.props

const highlightedCode = code ? await highlightCode(code, lang) : null

const correctOption = options.find(o => o.correct)
---

<div
  class="my-6 border-l-[3px] rounded-r-lg px-4 py-3 bg-gray-50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700 quiz-container"
  data-quiz
>
  <div class="flex gap-2 items-start mb-3">
    <span class="text-base leading-5 mt-0.5 select-none">🤔</span>
    <div class="flex-1 min-w-0">
      <div class="text-xs font-semibold text-black dark:text-white mb-1.5">Chequeo rápido</div>
      {highlightedCode && (
        <div
          class="rounded-md overflow-hidden mb-2 [&_pre]:!m-0 [&_pre]:!rounded-md [&_pre]:p-3 [&_pre]:text-xs [&_pre]:leading-relaxed"
          set:html={highlightedCode}
        />
      )}
      <p class="text-sm text-gray-600 dark:text-gray-400 m-0">{question}</p>
    </div>
  </div>

  <div class="flex flex-wrap gap-1.5 pl-6" data-options>
    {options.map((opt) => (
      <button
        class="quiz-option px-3 py-1 rounded-full border-[1.5px] border-gray-300 text-gray-600 bg-white dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 text-xs cursor-pointer hover:border-gray-400 transition-colors font-mono"
        data-correct={opt.correct ? '' : undefined}
        data-explanation={opt.correct ? (opt.explanation ?? '') : undefined}
      >
        {opt.text}
      </button>
    ))}
  </div>

  <p
    class="quiz-explanation text-xs pl-6 mt-2 leading-relaxed hidden"
    data-explanation
  />
</div>

<style>
  .quiz-container[data-answered="correct"] {
    border-color: #6ee7b7;
    background-color: #f0fdf4;
  }
  .quiz-container[data-answered="wrong"] {
    border-color: #fca5a5;
    background-color: #fff8f8;
  }

  .quiz-option[data-state="selected-correct"] {
    border-color: #6ee7b7;
    background-color: #d1fae5;
    color: #065f46;
    cursor: default;
    font-weight: 500;
  }
  .quiz-option[data-state="selected-wrong"] {
    border-color: #fca5a5;
    background-color: #fee2e2;
    color: #b91c1c;
    cursor: default;
    font-weight: 500;
  }
  .quiz-option[data-state="correct-reveal"] {
    border-color: #6ee7b7;
    background-color: #d1fae5;
    color: #065f46;
    cursor: default;
    font-weight: 500;
  }
  .quiz-option[data-state="dimmed"] {
    border-color: #e5e7eb;
    background-color: #f9fafb;
    color: #9ca3af;
    cursor: default;
  }

  .quiz-explanation[data-outcome="correct"] { color: #065f46; }
  .quiz-explanation[data-outcome="wrong"]   { color: #991b1b; }
</style>

<script>
  document.querySelectorAll<HTMLElement>('[data-quiz]').forEach((quiz) => {
    let answered = false
    const optionBtns = Array.from(
      quiz.querySelectorAll<HTMLButtonElement>('[data-options] button')
    )
    const explanationEl = quiz.querySelector<HTMLElement>('[data-explanation]')

    optionBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (answered) return
        answered = true

        const isCorrect = btn.hasAttribute('data-correct')
        const correctBtn = optionBtns.find(b => b.hasAttribute('data-correct'))
        const explanation = correctBtn?.dataset.explanation ?? ''

        quiz.dataset.answered = isCorrect ? 'correct' : 'wrong'

        optionBtns.forEach((b) => {
          if (b === btn) {
            b.dataset.state = isCorrect ? 'selected-correct' : 'selected-wrong'
            b.textContent += isCorrect ? ' ✓' : ' ✗'
          } else if (b === correctBtn && !isCorrect) {
            b.dataset.state = 'correct-reveal'
            b.textContent += ' ✓'
          } else {
            b.dataset.state = 'dimmed'
          }
        })

        if (explanationEl && explanation) {
          const correctText = correctBtn?.textContent?.replace(' ✓', '') ?? ''
          explanationEl.textContent = isCorrect
            ? `¡Correcto! — ${explanation}`
            : `La respuesta correcta es "${correctText}". ${explanation}`
          explanationEl.dataset.outcome = isCorrect ? 'correct' : 'wrong'
          explanationEl.classList.remove('hidden')
        }
      })
    })
  })
</script>
```

- [ ] **Step 2: Run type check**

```bash
pnpm astro check
```

Expected: no errors. Common issue: if `resolveJsonModule` is missing in `tsconfig.json`, add it:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Quiz.astro
git commit -m "feat: add Quiz component with build-time Shiki highlighting"
```

---

## Task 4: Demo post and manual verification

**Files:**
- Create: `src/content/blog/2025/quiz-demo/index.mdx`

- [ ] **Step 1: Create the demo post**

```mdx
---
title: Demo Quiz
date: "2025-06-02"
description: "Prueba del componente Quiz"
draft: true
---
import Quiz from '@components/Quiz.astro'

## Quiz sin código

<Quiz
  question="¿Cuál es el tipo de la función id en Haskell?"
  options={[
    { text: "Int -> Int" },
    { text: "a -> a", correct: true, explanation: "id es polimórfica: acepta cualquier tipo y devuelve el mismo. Su tipo es `a -> a`." },
    { text: "String -> String" },
    { text: "() -> ()" }
  ]}
/>

## Quiz con código corto

<Quiz
  question="¿Qué devuelve esta expresión?"
  code="length [1, 2, 3]"
  lang="haskell"
  options={[
    { text: "0" },
    { text: "3", correct: true, explanation: "length devuelve la cantidad de elementos de la lista." },
    { text: "[1,2,3]" },
    { text: "No compila" }
  ]}
/>

## Quiz con definición extendida

<Quiz
  question="¿Qué devuelve area (Circulo 1)?"
  code={`data Figura = Circulo Double | Rectangulo Double Double

area :: Figura -> Double
area (Circulo r)       = pi * r ^ 2
area (Rectangulo b h)  = b * h`}
  lang="haskell"
  options={[
    { text: "1.0" },
    { text: "2.0" },
    { text: "3.14159…", correct: true, explanation: "pi * 1² = pi ≈ 3.14159. La función usa pattern matching sobre el constructor Circulo." },
    { text: "No compila" }
  ]}
/>

## Quiz Wollok

<Quiz
  question="¿Cuántos mensajes recibe el objeto pepita?"
  code={`object pepita {
  var energia = 100
  method volar(kms) { energia = energia - kms * 2 }
  method comer(grs)  { energia = energia + grs }
  method energia()   { return energia }
}`}
  lang="wollok"
  options={[
    { text: "0" },
    { text: "3", correct: true, explanation: "pepita entiende volar, comer y energia — tres mensajes definidos como methods." },
    { text: "5" },
    { text: "No compila" }
  ]}
/>
```

- [ ] **Step 2: Start the dev server and open the draft post**

```bash
pnpm dev
```

Navigate to: `http://localhost:4321/bitacora/2025/quiz-demo`

If the page 404s, check that the file is at `src/content/blog/2025/quiz-demo/index.mdx` and that draft posts are rendered in the dev server (they are by default in Astro dev mode).

- [ ] **Step 3: Test all 3 states manually**

For each quiz on the page:

1. **Before clicking:** Confirm the quiz renders — question visible, options as pills, no explanation shown.
2. **Click the correct answer:** Border turns green, selected option turns green with `✓`, others gray, `¡Correcto! — <explanation>` appears below.
3. **Reload and click a wrong answer:** Border turns red, selected option turns red with `✗`, correct option is highlighted green with `✓`, explanation appears in red.
4. **Click again after answering:** Nothing happens (quiz is locked).

Check the Wollok quiz specifically — confirm syntax highlighting is applied (not plain text).

- [ ] **Step 4: Commit**

```bash
git add src/content/blog/2025/quiz-demo/index.mdx
git commit -m "feat: add Quiz demo draft post for manual verification"
```

---

## Using the component in real posts

To add a quiz to an existing post:

1. Rename `index.md` → `index.mdx`
2. Add the import after the frontmatter:
   ```mdx
   import Quiz from '@components/Quiz.astro'
   ```
3. Place `<Quiz ... />` anywhere in the post body

No changes to `astro.config.mjs` are required — MDX is already configured.
