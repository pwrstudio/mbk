import { format, getYear } from "date-fns";
import { tick } from "svelte"
// import { navigate } from "svelte-routing"
// import { 
//   menuActive, 
//   tableOfContentsActive, 
//   hash,
//   currentIssueSlug,
//   currentArticleSlug, 
//   tableOfContentsActiveHash 
// } from "./stores.js"

export const formattedDate = (start, end) => {
    if (!start) {
        return false;
    }

    const startDate = Date.parse(start);

    if (!end) {
        return format(startDate, "dd.MM.yyyy");
    }

    const endDate = Date.parse(end);

    if (format(startDate, "dd.MM.yyyy") == format(endDate, "dd.MM.yyyy")) {
        return format(startDate, "dd.MM.yyyy");
    }

    const startFormat =
        getYear(startDate) == getYear(endDate) ? "dd.MM" : "dd.MM.yyyy";
    const endFormat = "dd.MM.yyyy";

    return format(startDate, startFormat) + " – " + format(endDate, endFormat);
};

// export const goTo = (newHash) => {
//   console.log('go to')
//   menuActive.set(false)
//   tableOfContentsActive.set(false)
//   hash.set(newHash.replace('#', ''))

//   currentArticleSlug.set(newHash)

  // console.log($currentIssueSlug + '/' + $currentArticleSlug)
  // navigate($currentIssueSlug + '/' + $currentArticleSlug)
  // window.location.hash = newHash
// }

// MIT Licensed
// Author: jwilson8767

/**
 * Waits for an element satisfying selector to exist, then resolves promise with the element.
 * Useful for resolving race conditions.
 *
 * @param selector
 * @returns {Promise}
 */
export function elementReady (selector) {
  return new Promise((resolve, reject) => {
    let el = document.querySelector(selector);
    if (el) {resolve(el);}
    new MutationObserver((mutationRecords, observer) => {
      // Query for elements matching the specified selector
      Array.from(document.querySelectorAll(selector)).forEach((element) => {
        resolve(element);
        //Once we have resolved we don't need the observer anymore.
        observer.disconnect();
      });
    })
      .observe(document.documentElement, {
        childList: true,
        subtree: true
      });
  });
}

/**
 * 
 * @param {DOMElement} target 
 * @param {Number} delay 
 */
export async function scrollBack (target, delay) {
  if (delay) {
    await tick()
    setTimeout(() => {    
      if (target) {
        target.scrollTop = 0
      }
    }, delay)
  } else {
    if (target) {
      target.scrollTop = 0
      await true
    }
  }
}

