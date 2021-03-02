import { writable, derived } from 'svelte/store'

// WRITABLE
export const menuActive = writable(false)
export const menuContent = writable(null)
export const menuItemActive = writable(null)
// 
export const tableOfContents = writable(null)
export const tableOfContentsActive = writable(false)
export const hash = writable(false)

export const currentArticles = writable([])
export const currentPost = writable(false)

// DERIVED
export const activeArticle = derived([hash, currentArticles],
  ([$hash, $currentArticles]) => {
      return $currentArticles.find((article) => {
        return article.slug.current === $hash
      })
    }
  )
export const tableOfContentsActiveHash = derived(hash, $hash => { return `#${$hash}` })