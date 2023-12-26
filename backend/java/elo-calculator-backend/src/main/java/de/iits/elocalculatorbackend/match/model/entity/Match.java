package de.iits.elocalculatorbackend.match.model.entity;

import de.iits.elocalculatorbackend.match.model.enumeration.Outcome;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "match")
@Getter
@Setter
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "white_player_user_name")
    private String whitePlayerUserName;

    @Column(name = "black_player_user_name")
    private String blackPlayerUserName;

    @Column(name = "outcome")
    @Enumerated(EnumType.STRING)
    private Outcome outcome;

    @Column(name = "date")
    private LocalDateTime date;

}
