package de.iits.elocalculatorbackend.player.service;

import de.iits.elocalculatorbackend.player.model.resource.PlayerResponseResource;
import de.iits.elocalculatorbackend.player.model.resource.RankingResource;
import de.iits.elocalculatorbackend.player.repository.PlayerRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Limit;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.IntStream;

@Service
@AllArgsConstructor
public class RankingService {

    private PlayerRepository playerRepository;

    public List<RankingResource> getTopPlayers(int top) {
        var players = playerRepository.
                findByOrderByEloDesc(Limit.of(top)).stream()
                .map(PlayerResponseResource::new)
                .toList();

        return IntStream.range(0, players.size())
                .mapToObj(i -> new RankingResource(i, players.get(i)))
                .toList();
    }
}
