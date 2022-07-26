package org.soulcodeacademy.studentsucess.models;

import com.fasterxml.jackson.annotation.*;
import lombok.*;
import org.hibernate.validator.constraints.br.CPF;
import org.soulcodeacademy.studentsucess.dto.AlunosDto;
import org.soulcodeacademy.studentsucess.models.enums.Turma;
import org.soulcodeacademy.studentsucess.models.pesquisa.Formularios;


import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Alunos {

    @NotBlank
    @Size(min = 3)
    private String nome;

    @Id
    @CPF
    private String cpf;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String cel;

    private Turma turma;

    private LocalDateTime dataContratacao;

    private LocalDateTime dataDesligamento;

    private String motivoDesligamento;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "parceiro_id")
    private Parceiros parceiroId;

    @OneToMany
    private List<Formularios> formularios;

    private boolean email_30_DiasEnviado;
    private boolean email_30_FormularioRespondido;

    private boolean email_90_DiasEnviado;
    private boolean email_90_FormularioRespondido;

    private boolean email_180_DiasEnviado;
    private boolean email_180_FormularioRespondido;

    private boolean email_365_DiasEnviado;
    private boolean email_365_FormularioRespondido;

    private boolean email_30_DiasEnviadoParceiro;

    private boolean email_90_DiasEnviadoParceiro;

    private boolean email_180_DiasEnviadoParceiro;

    private boolean email_3650_DiasEnviadoParceiro;



    public Alunos(AlunosDto aluno) {
        this.nome = aluno.getNome();
        this.cpf = aluno.getCpf();
        this.email = aluno.getEmail();
        this.cel = aluno.getCel();
        this.turma = aluno.getTurma();
        this.dataContratacao = aluno.getDataContratacao();
        this.dataDesligamento = aluno.getDataDesligamento();
        this.motivoDesligamento = aluno.getMotivoDesligamento();

        //this.formularios = formularios;
        /*this.email_30_DiasEnviado = email_30_DiasEnviado;
        this.email_30_FormularioRespondido = email_30_FormularioRespondido;
        this.email_90_DiasEnviado = email_90_DiasEnviado;
        this.email_90_FormularioRespondido = email_90_FormularioRespondido;
        this.email_180_DiasEnviado = email_180_DiasEnviado;
        this.email_180_FormularioRespondido = email_180_FormularioRespondido;
        this.email_365_DiasEnviado = email_365_DiasEnviado;
        this.email_365_FormularioRespondido = email_365_FormularioRespondido;*/
    }


}
