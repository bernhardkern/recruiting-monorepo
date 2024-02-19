import request from '@/api/request'
import type { RankingFrontend } from '@/models/ranking'
import { baseURL } from '@/plugins/api-namespace'

export default {
  getRankings: (top: number) =>
    request.get<RankingFrontend[]>(`${baseURL.CHESS_ELO_CALCULATOR}/rankings?top=${top}`)
}
