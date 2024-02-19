import { describe, expect, it } from 'vitest'
import type { RankingFrontend, RankingResource } from '@/models/ranking'
import { rankingResourceToRankingFrontend } from '@/adapter/rank'

describe('match.ts', () => {
  const rankingFrontend: RankingFrontend = {
    rank: 10,
    id: 'asd-fds',
    username: 'caring4bears',
    displayName: 'Carey Bear',
    email: 'bear.carer.supreme@fluffybears.de',
    elo: 1234
  }
  const rankingResource: RankingResource = {
    rank: 10,
    player: {
      id: 'asd-fds',
      username: 'caring4bears',
      displayName: 'Carey Bear',
      email: 'bear.carer.supreme@fluffybears.de',
      elo: 1234
    }
  }

  describe('rankingResourceToRankingFrontend', () => {
    it(`converts a ranking resource model to a match frontend model`, () => {
      const result = rankingResourceToRankingFrontend(rankingResource)
      expect(result).toStrictEqual(rankingFrontend)
    })
  })
})
