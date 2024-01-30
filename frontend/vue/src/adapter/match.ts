import type { MatchResource, MatchFrontend } from '@/models/match'

export function matchResourceToMatchFrontend(matchResource: MatchResource): MatchFrontend {
  return {
    id: matchResource.id, //
    whitePlayerUsername: matchResource.whitePlayerUsername,
    blackPlayerUsername: matchResource.blackPlayerUsername,
    outcome: matchResource.outcome,
    timestamp: matchResource.timestamp ? new Date(matchResource.timestamp).toUTCString() : ''
  }
}

export function matchFrontendToMatchResource(matchFrontend: MatchFrontend): MatchResource {
  return {
    id: matchFrontend.id, //
    whitePlayerUsername: matchFrontend.whitePlayerUsername,
    blackPlayerUsername: matchFrontend.blackPlayerUsername,
    outcome: matchFrontend.outcome,
    timestamp: matchFrontend.timestamp ? new Date(matchFrontend.timestamp).getTime() : undefined
  }
}
