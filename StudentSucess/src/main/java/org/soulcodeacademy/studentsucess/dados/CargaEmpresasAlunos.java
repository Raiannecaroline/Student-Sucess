package org.soulcodeacademy.studentsucess.dados;

import lombok.AllArgsConstructor;
import org.soulcodeacademy.studentsucess.models.Alunos;
import org.soulcodeacademy.studentsucess.models.Parceiros;
import org.soulcodeacademy.studentsucess.models.enums.Turma;
import org.soulcodeacademy.studentsucess.repository.AlunoRepository;
import org.soulcodeacademy.studentsucess.repository.ParceirosRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;

@Component
@AllArgsConstructor
public class CargaEmpresasAlunos {


    private AlunoRepository alunoRepository;
    private ParceirosRepository parceirosRepository;


    @Scheduled(fixedRate = 999999999)
    public void cargaEmpresasAlunos(){


        Parceiros e1 = new Parceiros("799759279", "João Pessoa", "S.A Tecnologia", "primeiraempresa@email.com", null, null);
        Parceiros e2 = new Parceiros("987987999", "Dom Pedro", "U2 Tecnologia", "segundaempresa@email.com", null, null);

        Alunos alunoJava = new Alunos("Sayure Paiva", "882.417.740-95", "sayure.paiva@soulcodeacademy.org",
                "99999999999", Turma.JAVA_FULL_STACK, LocalDateTime.now(), null,
                null, e1, null, false, false,
                false, false, false, false,
                false, false, false, false, false, false);




        Alunos alunoDados = new Alunos("Carlos Junior", "754.978.370-50", "sayure.junior@soulcodeacademy.org",
                "99999999999", Turma.ENGENHARIA_DE_DADOS, LocalDateTime.now(), null,
                null, e1, null, false, false,
                false, false, false, false,
                false, false, false, false, false, false);


        Alunos alunoMidia = new Alunos("Juana Pinkalsky ", "916.720.400-78", "juana.pinkalsky@soulcodeacademy.org",
                "99999999999", Turma.MIDIA_DIGITAL, LocalDateTime.now(), null,
                null, e2, null, false, false,
                false, false, false, false,
                false, false, false, false, false, false);


        Alunos alunoSales = new Alunos("Tatiana Tati", "849.033.530-36", "tatiane.tati@soulcodeacademy.org",
                "99999999999", Turma.DESENVOLVEDOR_SALESFORCE, LocalDateTime.now(), null,
                null, e2, null, false, false,
                false, false, false, false,
                false, false,false, false, false, false);

        parceirosRepository.saveAll(Arrays.asList(e1, e2));

        alunoRepository.saveAll(Arrays.asList(alunoJava, alunoMidia, alunoDados, alunoSales));
    }
}
