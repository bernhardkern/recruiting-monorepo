import { gsap } from 'gsap'
import type { Nullable } from '@/types/utility'

export function useGsapAnimations() {
  function animatePress(selectorOrElement: Nullable<string | HTMLElement | EventTarget>) {
    if (selectorOrElement) {
      gsap.fromTo(
        selectorOrElement,
        { scale: 1 },
        { scale: 0.75, duration: 0.125, yoyo: false, repeat: 0, overwrite: true }
      )
    }
  }

  function animateRelease(selectorOrElement: Nullable<string | HTMLElement | EventTarget>) {
    if (selectorOrElement) {
      gsap.fromTo(
        selectorOrElement,
        { scale: 0.75 },
        { scale: 1, duration: 0.125, yoyo: false, repeat: 0, overwrite: true }
      )
    }
  }

  return {
    animatePress, //
    animateRelease
  }
}
