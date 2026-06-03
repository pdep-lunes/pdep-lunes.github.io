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
      console.warn(`[Quiz] Unknown language "${lang}", falling back to plain text`)
      lang = 'text'
    }
  }

  return hl.codeToHtml(code, { lang, theme: 'github-dark' })
}
