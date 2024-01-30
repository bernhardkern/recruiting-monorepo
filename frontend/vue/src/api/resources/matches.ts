import request from '@/api/request'
import type { MatchResource } from '@/models/match'
import { baseURL } from '@/plugins/api-namespace'

export default {
  getMatches: () => request.get<MatchResource[]>(`${baseURL.CHESS_ELO_CALCULATOR}/matches`),
  createMatch: (match: MatchResource) =>
    request.post<MatchResource>(`${baseURL.CHESS_ELO_CALCULATOR}/matches`, match)
}
