import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RankedPlayer, Player} from "../models/player.model";
import {Match} from "../models/match.model";

@Injectable({
  providedIn: 'root',
  deps: [HttpClient],
})
export class ApiService {
  apiUrl = 'api';

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/players`);
  }

  createPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(`${this.apiUrl}/players`, player);
  }

  updatePlayer(player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.apiUrl}/players`, player);
  }

  getPlayer(username: string): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/players/${username}`);
  }

  getPlayerElo(username: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/players/${username}/elo`);
  }

  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}/matches`);
  }

  createMatch(match: Match): Observable<Match> {
    return this.http.post<Match>(`${this.apiUrl}/matches`, match);
  }

  getRankings(top: number): Observable<RankedPlayer[]> {
    return this.http.get<RankedPlayer[]>(`${this.apiUrl}/rankings?top=${top}`);
  }
}
