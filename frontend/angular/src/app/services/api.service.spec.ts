import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Player, RankedPlayer } from '../models/player.model';
import { Match } from '../models/match.model'; // Correct the path as necessary

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch players', () => {
    const mockPlayers: Player[] = [
      {
        id: '1',
        username: 'SunshineBear',
        displayName: 'Sunny Bear',
        email: 'sunny@carebears.com',
        elo: 1000,
      },
      {
        id: '2',
        username: 'MoonlightBear',
        displayName: 'Moon Bear',
        email: 'moon@carebears.com',
        elo: 1200,
      },
    ];

    service.getPlayers().subscribe((players) => {
      expect(players.length).toBe(2);
      expect(players).toEqual(mockPlayers);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/players`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPlayers);
  });

  it('should create a player', () => {
    const newPlayer: Player = {
      id: '3',
      username: 'RainbowBear',
      displayName: 'Rainbow Bear',
      email: 'rainbow@carebears.com',
      elo: 1100,
    };

    service.createPlayer(newPlayer).subscribe((player) => {
      expect(player).toEqual(newPlayer);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/players`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newPlayer);
    req.flush(newPlayer);
  });

  it('should update a player', () => {
    const updatedPlayer: Player = {
      id: '1',
      username: 'StarshineBear',
      displayName: 'Starshine Bear',
      email: 'starshine@carebears.com',
      elo: 1300,
    };

    service.updatePlayer(updatedPlayer).subscribe((player) => {
      expect(player).toEqual(updatedPlayer);
    });

    const req = httpMock.expectOne(
      `${service.apiUrl}/players/${updatedPlayer.username}`
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedPlayer);
    req.flush(updatedPlayer);
  });

  it('should fetch a player by username', () => {
    const username = 'SunshineBear';
    const expectedPlayer: Player = {
      id: '1',
      username: 'SunshineBear',
      displayName: 'Sunny Bear',
      email: 'sunny@carebears.com',
      elo: 1000,
    };

    service.getPlayer(username).subscribe((player) => {
      expect(player).toEqual(expectedPlayer);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/players/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedPlayer);
  });

  it('should fetch player elo by username', () => {
    const username = 'MoonlightBear';
    const expectedElo = 1200;

    service.getPlayerElo(username).subscribe((elo) => {
      expect(elo).toBe(expectedElo);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/players/${username}/elo`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedElo);
  });

  it('should fetch matches', () => {
    const mockMatches: Match[] = [
      {
        id: '1',
        whitePlayerUsername: 'SunshineBear',
        blackPlayerUsername: 'MoonlightBear',
        outcome: 'DRAW',
        playedOn: '2024-05-04T00:00:00Z',
      },
      {
        id: '2',
        whitePlayerUsername: 'RainbowBear',
        blackPlayerUsername: 'StarshineBear',
        outcome: 'DRAW',
        playedOn: '2024-05-04T00:00:00Z',
      },
    ];

    service.getMatches().subscribe((matches) => {
      expect(matches.length).toBe(2);
      expect(matches).toEqual(mockMatches);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/matches`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMatches);
  });
  it('should create a match', () => {
    const newMatch: Match = {
      id: '3',
      whitePlayerUsername: 'RainbowBear',
      blackPlayerUsername: 'StarshineBear',
      outcome: 'RainbowBear',
      playedOn: '2024-05-04T00:00:00Z',
    };

    service.createMatch(newMatch).subscribe((match) => {
      expect(match).toEqual(newMatch);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/matches`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newMatch);
    req.flush(newMatch);
  });

  it('should fetch player rankings', () => {
    const top = 10;
    const mockRankings: RankedPlayer[] = [
      {
        rank: 1,
        player: {
          id: '1',
          username: 'SunshineBear',
          elo: 1500,
          displayName: 'Sunny Bear',
          email: 'sunny@carebears.com',
        },
      },
      {
        rank: 2,
        player: {
          id: '2',
          username: 'RainbowBear',
          elo: 1450,
          displayName: 'Rainbow Bear',
          email: 'rainbow@carebears.com',
        },
      },
    ];

    service.getRankings(top).subscribe((rankings) => {
      expect(rankings.length).toBe(2);
      expect(rankings).toEqual(mockRankings);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/rankings?top=${top}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRankings);
  });
});
