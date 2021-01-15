import { writable, derived } from 'svelte/store'

// WRITABLE
export const menuActive = writable(false)
export const menuContent = writable(null)
export const menuItemActive = writable('news')
// 
export const tableOfContents = writable(null)
export const tableOfContentsActive = writable(false)
export const hash = writable(false)
export const tableOfContentsActiveHash = derived(hash, $hash => { return `#${$hash}` })

export const currentArticles = writable([])
export const currentPost = writable(false)
