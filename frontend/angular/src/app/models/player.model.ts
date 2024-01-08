export interface Player {
  id: string
  username: string
  displayName: string
  email: string
}

export interface RankedPlayer extends Player {
  elo: number
  rank: number
}
