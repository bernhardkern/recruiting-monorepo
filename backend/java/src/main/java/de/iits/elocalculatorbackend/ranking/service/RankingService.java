package de.iits.elocalculatorbackend.ranking.service;

import de.iits.elocalculatorbackend.player.model.dto.PlayerResponseDto;
import de.iits.elocalculatorbackend.player.repository.PlayerRepository;
import de.iits.elocalculatorbackend.ranking.model.dto.RankingResponseDto;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Limit;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.IntStream;

@Service
@AllArgsConstructor
public class RankingService {

    private PlayerRepository playerRepository;

    public List<RankingResponseDto> getTopPlayers(int top) {
        var players = playerRepository.
                findByOrderByEloDesc(Limit.of(top)).stream()
                .map(PlayerResponseDto::new)
                .toList();

        return IntStream.range(0, players.size())
                .mapToObj(index -> new RankingResponseDto(index + 1, players.get(index)))
                .toList();
    }
}
