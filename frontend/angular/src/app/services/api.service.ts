import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RankedUser, User} from "../models/user.model";
import {Match} from "../models/match.model";

@Injectable({
  providedIn: 'root',
  deps: [HttpClient],
})
export class ApiService {
  private apiUrl = 'api';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.userName}`, user);
  }

  getUser(userName: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userName}`);
  }

  getUserElo(userName: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/users/${userName}/elo`);
  }

  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}/matches`);
  }

  createMatch(match: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/matches`, match);
  }

  getRankings(): Observable<RankedUser[]> {
    return this.http.get<RankedUser[]>(`${this.apiUrl}/rankings`);
  }
}
