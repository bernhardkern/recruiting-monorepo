export interface User {
  id: string
  userName: string
  displayName: string
  email: string
}

export interface RankedUser extends User{
  elo: number
  rank: number
}
