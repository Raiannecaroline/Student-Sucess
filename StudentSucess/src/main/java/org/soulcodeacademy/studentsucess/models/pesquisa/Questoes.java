package org.soulcodeacademy.studentsucess.models.pesquisa;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.soulcodeacademy.studentsucess.models.enums.DestinatarioPergunta;
import org.soulcodeacademy.studentsucess.models.enums.TipoDePergunta;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Questoes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String enunciado;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "alternativas")
    private List<String> alternativas = new ArrayList<>();


    @ElementCollection
    @CollectionTable(name = "respostas")
    private List<String> respostas = new ArrayList<>();

    private String selecao;
}
