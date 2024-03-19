package de.iits.elocalculatorbackend.player.repository;

import de.iits.elocalculatorbackend.player.model.entity.Player;
import org.springframework.data.domain.Limit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PlayerRepository extends JpaRepository<Player, String> {
    List<Player> findByOrderByEloDesc(Limit limit);
}
