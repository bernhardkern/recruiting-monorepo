package de.iits.elocalculatorbackend.match.service;

import de.iits.elocalculatorbackend.match.model.entity.Match;
import de.iits.elocalculatorbackend.match.repository.MatchRepository;
import de.iits.elocalculatorbackend.match.model.resource.MatchCreateResource;
import de.iits.elocalculatorbackend.match.model.resource.MatchResponseResource;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MatchService {

    private MatchRepository repository;

    public List<MatchResponseResource> getAllMatches(){
        return repository.findAll().stream().map(MatchResponseResource::new).toList();
    }

    public MatchResponseResource createMatch(MatchCreateResource createResource) {
        Match saved = repository.save(createResource.toMatch());
        return new MatchResponseResource(saved);
    }
}
