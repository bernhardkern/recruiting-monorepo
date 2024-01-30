import request from '@/api/request'
import type { Player } from '@/models/player'
import { baseURL } from '@/plugins/api-namespace'

export default {
  getPlayers: () => request.get<Player[]>(`${baseURL.CHESS_ELO_CALCULATOR}/players`),
  createPlayer: (player: Player) =>
    request.post<Player>(`${baseURL.CHESS_ELO_CALCULATOR}/players`, player),
  getPlayerByUsername: (username: string) =>
    request.get<Player>(`${baseURL.CHESS_ELO_CALCULATOR}/players/${username}`),
  updatePlayer: (player: Player) =>
    request.put<Player>(`${baseURL.CHESS_ELO_CALCULATOR}/players/${player.username}`, player),
  getElo: (username: string) =>
    request.get<number>(`${baseURL.CHESS_ELO_CALCULATOR}/players/${username}/elo`)
}
