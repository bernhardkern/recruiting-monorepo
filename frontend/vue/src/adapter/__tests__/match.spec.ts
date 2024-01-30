import { describe, expect, it } from 'vitest'

import { Outcome } from '@/models/enum/outcome'
import type { MatchResource, MatchFrontend } from '@/models/match'

import { matchFrontendToMatchResource, matchResourceToMatchFrontend } from '@/adapter/match'

describe('match.ts', () => {
  const matchFrontend: MatchFrontend = {
    id: undefined,
    whitePlayerUsername: 'White Mustermann',
    blackPlayerUsername: 'Black Mustermann',
    outcome: Outcome.DRAW,
    timestamp: new Date(1706137200000).toUTCString()
  }
  const matchResource: MatchResource = {
    id: undefined,
    whitePlayerUsername: matchFrontend.whitePlayerUsername,
    blackPlayerUsername: matchFrontend.blackPlayerUsername,
    outcome: matchFrontend.outcome,
    timestamp: 1706137200000
  }

  describe('matchFrontendToMatchResource', () => {
    it(`converts a match frontend model to a match backend resource`, () => {
      const result = matchFrontendToMatchResource(matchFrontend)
      expect(result).toStrictEqual(matchResource)
    })
  })

  describe('matchResourceToMatchFrontend', () => {
    it(`converts a match resource to a match frontend model`, () => {
      const result = matchResourceToMatchFrontend(matchResource)
      expect(result).toStrictEqual(matchFrontend)
    })
  })
})
