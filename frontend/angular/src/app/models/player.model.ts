export interface Player {
  id: string
  username: string
  displayName: string
  email: string
  elo: number
}

export interface RankedPlayer extends Player {
  player: Player
  rank: number
}
