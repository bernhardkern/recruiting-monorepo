import type { MatchResource, MatchFrontend } from '@/models/match'

export function matchResourceToMatchFrontend(matchResource: MatchResource): MatchFrontend {
  return {
    id: matchResource.id, //
    whitePlayerUsername: matchResource.whitePlayerUsername,
    blackPlayerUsername: matchResource.blackPlayerUsername,
    outcome: matchResource.outcome,
    playedOn: matchResource.playedOn ? new Date(matchResource.playedOn).toUTCString() : ''
  }
}

export function matchFrontendToMatchResource(matchFrontend: MatchFrontend): MatchResource {
  return {
    id: matchFrontend.id, //
    whitePlayerUsername: matchFrontend.whitePlayerUsername,
    blackPlayerUsername: matchFrontend.blackPlayerUsername,
    outcome: matchFrontend.outcome,
    playedOn: matchFrontend.playedOn ? new Date(matchFrontend.playedOn).toISOString() : undefined
  }
}
