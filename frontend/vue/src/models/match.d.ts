import { Outcome } from "./enum/outcome";

export interface MatchResource {
  id?: string,
  whitePlayerUsername: string,
  blackPlayerUsername: string,
  outcome: Outcome,
  timestamp?: number,
}

export interface MatchFrontend {
  id?: string,
  whitePlayerUsername: string,
  blackPlayerUsername: string,
  outcome: Outcome,
  timestamp?: string,
}
