export interface Player {
  id: string
  username: string
  displayName: string
  email: string
  elo: number
}

export interface RankedPlayer {
  player: Player
  rank: number
}
