package org.soulcodeacademy.studentsucess.models.pesquisa;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.soulcodeacademy.studentsucess.models.enums.DestinatarioPergunta;
import org.soulcodeacademy.studentsucess.models.enums.PeriodoFormulario;
import org.soulcodeacademy.studentsucess.models.enums.Turma;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Formularios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nomeFormulario;

    @ManyToMany
    private List<Questoes> questoes = new ArrayList<>();

    private DestinatarioPergunta destinatarioPergunta;

    private PeriodoFormulario periodoFormulario;

    private Turma turma;

    private String email;

    public Formularios(Long id, String nomeFormulario, List<Questoes> questoes, DestinatarioPergunta destinatarioPergunta, PeriodoFormulario periodoFormulario, Turma turma) {
        this.id = id;
        this.nomeFormulario = nomeFormulario;
        this.questoes = questoes;
        this.destinatarioPergunta = destinatarioPergunta;
        this.periodoFormulario = periodoFormulario;
        this.turma = turma;
    }
}
