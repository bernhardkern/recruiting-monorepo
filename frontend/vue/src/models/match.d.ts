import { Outcome } from './enum/outcome'

export interface MatchResource {
  id?: string
  whitePlayerUsername: string
  blackPlayerUsername: string
  outcome: Outcome
  playedOn?: string
}

export interface MatchFrontend {
  id?: string
  whitePlayerUsername: string
  blackPlayerUsername: string
  outcome: Outcome
  playedOn?: string
}
