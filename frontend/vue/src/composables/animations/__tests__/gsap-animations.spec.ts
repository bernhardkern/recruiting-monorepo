import { gsap } from 'gsap'
import { describe, expect, it, vi } from 'vitest'
import { useGsapAnimations as sut } from '@/composables/animations/gsap-animations'

vi.mock('gsap')

describe('gsap-animations.ts', () => {
  describe('exported "useGsapAnimations" function', () => {
    it('has "animatePress" function in returned object', () => {
      const sutResult = sut()
      expect(sutResult).toBeTruthy()
      const { animatePress } = sutResult
      expect(typeof animatePress).toBe('function')
    })

    describe('animatePress()', () => {
      it('does not call gsap when called with null argument', () => {
        const { animatePress } = sut()
        animatePress(null)
        expect(gsap.from).not.toHaveBeenCalled()
        expect(gsap.fromTo).not.toHaveBeenCalled()
        expect(gsap.timeline).not.toHaveBeenCalled()
        expect(gsap.to).not.toHaveBeenCalled()
      })
    })

    it('has "animateRelease" function in returned object', () => {
      const sutResult = sut()
      expect(sutResult).toBeTruthy()
      const { animateRelease } = sutResult
      expect(typeof animateRelease).toBe('function')
    })

    describe('animateRelease()', () => {
      it('does not call gsap when called with null argument', () => {
        const { animateRelease } = sut()
        animateRelease(null)
        expect(gsap.from).not.toHaveBeenCalled()
        expect(gsap.fromTo).not.toHaveBeenCalled()
        expect(gsap.timeline).not.toHaveBeenCalled()
        expect(gsap.to).not.toHaveBeenCalled()
      })
    })
  })
})
