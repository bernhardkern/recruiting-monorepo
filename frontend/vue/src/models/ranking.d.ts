import type {Player} from "@/models/player";

export interface RankingFrontend {
  id: string
  username: string
  displayName: string
  email: string
  elo: number
  rank: number
}

export interface RankingResource {
  player: Player,
  rank: number
}
