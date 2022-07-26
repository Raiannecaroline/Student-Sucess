package org.soulcodeacademy.studentsucess.agenda;

import lombok.AllArgsConstructor;
import org.soulcodeacademy.studentsucess.models.Alunos;
import org.soulcodeacademy.studentsucess.models.Parceiros;
import org.soulcodeacademy.studentsucess.models.Usuarios;
import org.soulcodeacademy.studentsucess.models.enums.Turma;
import org.soulcodeacademy.studentsucess.repository.AlunoRepository;
import org.soulcodeacademy.studentsucess.repository.ParceirosRepository;
import org.soulcodeacademy.studentsucess.repository.UsuarioRepository;
import org.springframework.mail.MailException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
@AllArgsConstructor
public class Agenda {

    private AlunoRepository alunoRepository;
    private AgendaService agendaService;
    private UsuarioRepository usuarioRepository;
    private PasswordEncoder passwordEncoder;
    private EnviarEmailService enviarEmailService;
    private ParceirosRepository parceirosRepository;




    @Scheduled(fixedRate = 400000000)
    public void enviar() {

        Usuarios usuario = new Usuarios("123456", "ADMIN", "adm@soulcodeacademy.org", passwordEncoder.encode("123456"));
        usuarioRepository.save(usuario);

        Parceiros outro = new Parceiros("987987669", "Tiradentes", "Soul Code Academy", "soulcodeacademy@email.com", null, null);
        parceirosRepository.save(outro);


        Alunos alunoDados = new Alunos("Giovane Avelino", "865.960.450-48", "giovanerr10@gmail.com",
                "99999999999", Turma.ENGENHARIA_DE_DADOS, LocalDateTime.of(2022, 4, 22, 13, 0), null,
                null, outro, null, false, false,
                false, false, false, false,
                false, false, false, false,
                false, false);
        alunoRepository.save(alunoDados);

        enviarEmailService.enviarEmail30Dias(alunoDados);//EMAIL DE 30 DIAS






    }


    @Scheduled(cron = "0 0 12 * * MON-FRI")
    //todos os dias da semana ao meio dia ref: https://www.freeformatter.com/cron-expression-generator-quartz.html
    public void execute() {

        List<Alunos> listaDeAlunos = alunoRepository.findAll();


        for (Alunos aluno : listaDeAlunos) {

            long diasDeContrato = calcularDias(aluno.getDataContratacao());

            if ((diasDeContrato >= 30 && diasDeContrato < 90)) {

                enviarEmailService.enviarEmail30Dias(aluno);//EMAIL DE 30 DIAS



            } else if ((diasDeContrato >= 90 && diasDeContrato < 180)) {                //EMAIL DE 90 DIAS




            } else if ((diasDeContrato >= 180 && diasDeContrato < 365)) {            //EMAIL DE 180 DIAS



            } else if (diasDeContrato >= 365) {

                //EMAIL DE UM ANO




            }


        }
    }


    public long calcularDias(LocalDateTime dataDeinicio) {
        return ChronoUnit.DAYS.between(dataDeinicio, LocalDate.now());

    }


}
