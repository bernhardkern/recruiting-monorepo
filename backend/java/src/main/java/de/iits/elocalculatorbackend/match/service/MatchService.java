package de.iits.elocalculatorbackend.match.service;

import de.iits.elocalculatorbackend.match.model.dto.MatchRequestDto;
import de.iits.elocalculatorbackend.match.model.dto.MatchResponseDto;
import de.iits.elocalculatorbackend.match.model.entity.Match;
import de.iits.elocalculatorbackend.match.repository.MatchRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MatchService {

    private MatchRepository repository;

    public List<MatchResponseDto> getAllMatches(){
        return repository.findAll().stream().map(MatchResponseDto::new).toList();
    }

    public MatchResponseDto createMatch(MatchRequestDto createMatch) {
        Match saved = repository.save(createMatch.toEntity());
        return new MatchResponseDto(saved);
    }
}
