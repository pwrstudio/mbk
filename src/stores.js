import { writable } from 'svelte/store'

// WRITABLE
export const menuActive = writable(false)
export const menuItemActive = writable('news')
export const menuContent = writable(null)
export const tableOfContentActive = writable(false)
export const currentPost = writable(false)
