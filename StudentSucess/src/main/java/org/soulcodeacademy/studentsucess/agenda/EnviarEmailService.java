package org.soulcodeacademy.studentsucess.agenda;

import lombok.AllArgsConstructor;
import org.soulcodeacademy.studentsucess.models.Alunos;
import org.soulcodeacademy.studentsucess.repository.AlunoRepository;
import org.soulcodeacademy.studentsucess.repository.ParceirosRepository;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class EnviarEmailService {

    private AgendaService agendaService;

    private AlunoRepository alunoRepository;

    private ParceirosRepository parceirosRepository;


    public void enviarEmail30Dias(Alunos aluno) {

        if (!aluno.isEmail_30_DiasEnviado()) {
            //processo para enviar email enviar o email de 30 dias
            try {
                agendaService.enviarEmail30DiasAlunos(aluno.getEmail(), aluno.getNome());
                aluno.setEmail_30_DiasEnviado(true);
                alunoRepository.save(aluno);

                try {
                    agendaService.enviarEmail30DiasEmpresas(aluno.getParceiroId().getEmail(), aluno.getNome());
                    aluno.setEmail_30_DiasEnviadoParceiro(true);
                    alunoRepository.save(aluno);

                } catch (MailException e) {
                    e.printStackTrace();
                }


            } catch (MailException e) {
                e.printStackTrace();
            }

        }
        if (aluno.isEmail_30_DiasEnviado() && !aluno.isEmail_30_FormularioRespondido()) {
            //reenviar o email
            try {
                agendaService.enviarEmail30DiasAlunos(aluno.getEmail(), aluno.getNome());
                aluno.setEmail_30_DiasEnviado(true);
                alunoRepository.save(aluno);

                if (!aluno.isEmail_30_DiasEnviadoParceiro()) {
                    try {
                        agendaService.enviarEmail30DiasEmpresas(aluno.getParceiroId().getEmail(), aluno.getNome());
                        aluno.setEmail_30_DiasEnviadoParceiro(true);
                        alunoRepository.save(aluno);

                    } catch (MailException e) {
                        e.printStackTrace();
                    }
                }


            } catch (MailException e) {
                e.printStackTrace();
            }

        }

    }
}
