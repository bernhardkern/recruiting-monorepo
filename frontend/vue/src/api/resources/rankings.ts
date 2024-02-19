import request from '@/api/request'
import type { RankingResource } from '@/models/ranking'
import { baseURL } from '@/plugins/api-namespace'

export default {
  getRankings: (top: number) =>
    request.get<RankingResource[]>(`${baseURL.CHESS_ELO_CALCULATOR}/rankings?top=${top}`)
}
