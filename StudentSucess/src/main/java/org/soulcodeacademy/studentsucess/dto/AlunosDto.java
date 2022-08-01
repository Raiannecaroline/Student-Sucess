package org.soulcodeacademy.studentsucess.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CPF;
import org.soulcodeacademy.studentsucess.models.Alunos;
import org.soulcodeacademy.studentsucess.models.Parceiros;
import org.soulcodeacademy.studentsucess.models.enums.Turma;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Optional;

@Getter
@Setter
@NoArgsConstructor
public class AlunosDto {
    @NotBlank
    private String nome;

    @CPF
    private String cpf;

    @Email
    private String email;

    @NotBlank
    private String cel;

    private Turma turma;

    private LocalDateTime dataFinalCurso;

    private LocalDateTime dataContratacao;

    private LocalDateTime dataDesligamento;

   // private Parceiros parceiro;

    private String motivoDesligamento;

    private String parceiroNome;

    private String parceiroCnpj;

    private String parceiroNomeRepresentante;

   // private List<Formularios> formularios;

    private boolean email_30_DiasEnviado;
    private boolean email_30_FormularioRespondido;

    private boolean email_90_DiasEnviado;
    private boolean email_90_FormularioRespondido;

    private boolean email_180_DiasEnviado;
    private boolean email_180_FormularioRespondido;

    private boolean email_365_DiasEnviado;
    private boolean email_365_FormularioRespondido;


    public AlunosDto(Optional<Alunos> aluno) {
        this.nome = aluno.get().getNome();
        this.cpf = aluno.get().getCpf();
        this.email = aluno.get().getEmail();
        this.cel = aluno.get().getCel();
        this.turma = aluno.get().getTurma();
        this.dataContratacao = aluno.get().getDataContratacao();
        this.dataDesligamento = aluno.get().getDataDesligamento();
        this.motivoDesligamento = aluno.get().getMotivoDesligamento();
        this.parceiroNome = aluno.get().getParceiroId().getNome();
        this.parceiroCnpj = aluno.get().getParceiroId().getCnpj();
        this.parceiroNomeRepresentante = aluno.get().getParceiroId().getNomeRepresentante();


        this.email_30_DiasEnviado = aluno.get().isEmail_30_DiasEnviado();
        this.email_30_FormularioRespondido = aluno.get().isEmail_30_FormularioRespondido();
        this.email_90_DiasEnviado = aluno.get().isEmail_90_DiasEnviado();
        this.email_90_FormularioRespondido = aluno.get().isEmail_90_FormularioRespondido();
        this.email_180_DiasEnviado = aluno.get().isEmail_180_DiasEnviado();
        this.email_180_FormularioRespondido = aluno.get().isEmail_180_FormularioRespondido();
        this.email_365_DiasEnviado = aluno.get().isEmail_365_DiasEnviado();
        this.email_365_FormularioRespondido = aluno.get().isEmail_365_FormularioRespondido();
    }
}
