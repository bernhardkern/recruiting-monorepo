import request from '@/api/request'
import type { Ranking } from '@/models/ranking'
import { baseURL } from '@/plugins/api-namespace'

export default {
  getRankings: (top: number) =>
    request.get<Ranking[]>(`${baseURL.CHESS_ELO_CALCULATOR}/rankings?top=${top}`)
}
