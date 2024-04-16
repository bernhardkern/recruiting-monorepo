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
    playedOn: '2024-04-01T20:00:00Z'
  }
  const matchResource: MatchResource = {
    id: undefined,
    whitePlayerUsername: matchFrontend.whitePlayerUsername,
    blackPlayerUsername: matchFrontend.blackPlayerUsername,
    outcome: matchFrontend.outcome,
    playedOn: '2024-04-01T20:00:00Z'
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
