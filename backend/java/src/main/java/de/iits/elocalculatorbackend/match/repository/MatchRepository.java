package de.iits.elocalculatorbackend.match.repository;

import de.iits.elocalculatorbackend.match.model.entity.Match;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MatchRepository extends JpaRepository<Match, UUID> {}
