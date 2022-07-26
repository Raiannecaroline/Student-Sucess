package org.soulcodeacademy.studentsucess.dados;

import lombok.AllArgsConstructor;
import org.soulcodeacademy.studentsucess.models.enums.DestinatarioPergunta;
import org.soulcodeacademy.studentsucess.models.enums.PeriodoFormulario;
import org.soulcodeacademy.studentsucess.models.enums.TipoDePergunta;
import org.soulcodeacademy.studentsucess.models.enums.Turma;
import org.soulcodeacademy.studentsucess.models.pesquisa.Formularios;
import org.soulcodeacademy.studentsucess.models.pesquisa.Questoes;
import org.soulcodeacademy.studentsucess.repository.pesquisa.FormularioRepository;
import org.soulcodeacademy.studentsucess.repository.pesquisa.QuestoesRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;

@AllArgsConstructor
@Component
public class FormulariosDados {

    private FormularioRepository formularioRepository;

    private QuestoesRepository questoesRepository;



    @Scheduled(fixedRate = 400000000)
    public void criarFormularios(){

        Questoes q1 = new Questoes(null, "Como você avalia o conteúdo do curso da SoulCode?",
                Arrays.asList("Otimo", "Bom", "Medio"), Arrays.asList("Otimo","Otimo","Otimo","Otimo","Otimo","Otimo","Otimo", "Otimo", "Otimo","Otimo","Otimo", "Otimo", "Otimo","Otimo","Otimo", "Otimo", "Otimo","Otimo", "Otimo", "Otimo", "Bom", "Bom","Bom", "Bom","Bom", "Bom","Bom", "Bom", "Medio", "Medio", "Medio", "Medio", "Medio", "Medio", "Medio", "Medio", "Medio"), "");

        Questoes q2 = new Questoes(null, "Como você avalia sua estadia na sua empresa?",
                Arrays.asList("Otima", "Boa", "Media"), null, "");

        Questoes q3 = new Questoes(null, "Como voce avalia seu ensino de java?",
                Arrays.asList("Otimo", "Bom", "Medio"), null, "");

        Questoes q4 = new Questoes(null, "Como você avalia seu ensino em Angular?",
                Arrays.asList("Otimo", "Bom", "Medio"), null, "");
        
        
        questoesRepository.saveAll(Arrays.asList(q1,q2,q3, q4));
        
        
        
        
        

        
        
        //FORMULARIOS
        
        
        System.out.println("salvando forms");

        Formularios JAVA_30_DIAS = new Formularios(null, "JAVA_30_DIAS", Arrays.asList(q1, q2, q3, q4),
                DestinatarioPergunta.ALUNOS, PeriodoFormulario.FORMULARIO_30_DIAS, Turma.JAVA_FULL_STACK);

        Formularios JAVA_90_DIAS = new Formularios(null, "JAVA_90_DIAS", new ArrayList<>(),
                DestinatarioPergunta.ALUNOS, PeriodoFormulario.FORMULARIO_90_DIAS, Turma.JAVA_FULL_STACK);

        Formularios JAVA_180_DIAS = new Formularios(null, "JAVA_180_DIAS", new ArrayList<>(),
                DestinatarioPergunta.ALUNOS, PeriodoFormulario.FORMULARIO_180_DIAS, Turma.JAVA_FULL_STACK);

        Formularios JAVA_365_DIAS = new Formularios(null, "JAVA_365_DIAS", new ArrayList<>(),
                DestinatarioPergunta.ALUNOS, PeriodoFormulario.FORMULARIO_365_DIAS, Turma.JAVA_FULL_STACK);


        Formularios JAVA_30_DIAS_PARCEIROS = new Formularios(null, "JAVA_30_DIAS_PARCEIROS", new ArrayList<>(),
                DestinatarioPergunta.PARCEIROS, PeriodoFormulario.FORMULARIO_30_DIAS, Turma.JAVA_FULL_STACK);

        Formularios JAVA_90_DIAS_PARCEIROS = new Formularios(null, "JAVA_90_DIAS_PARCEIROS", new ArrayList<>(),
                DestinatarioPergunta.PARCEIROS, PeriodoFormulario.FORMULARIO_90_DIAS, Turma.JAVA_FULL_STACK);

        Formularios JAVA_180_DIAS_PARCEIROS = new Formularios(null, "JAVA_180_DIAS_PARCEIROS", new ArrayList<>(),
                DestinatarioPergunta.PARCEIROS, PeriodoFormulario.FORMULARIO_180_DIAS, Turma.JAVA_FULL_STACK);

        Formularios JAVA_365_DIAS_PARCEIROS = new Formularios(null, "JAVA_365_DIAS_PARCEIROS", new ArrayList<>(),
                DestinatarioPergunta.PARCEIROS, PeriodoFormulario.FORMULARIO_365_DIAS, Turma.JAVA_FULL_STACK);



        Formularios SALESFORCE_30_DIAS = new Formularios(null, "SALESFORCE_30_DIAS", Arrays.asList(q1, q2, q3, q4),
                DestinatarioPergunta.ALUNOS, PeriodoFormulario.FORMULARIO_30_DIAS, Turma.DESENVOLVEDOR_SALESFORCE);

        Formularios SALESFORCE_90_DIAS = new Formularios(null, "SALESFORCE_90_DIAS", new ArrayList<>(),
                DestinatarioPergunta.ALUNOS, PeriodoFormulario.FORMULARIO_90_DIAS, Turma.DESENVOLVEDOR_SALESFORCE);

        Formularios SALESFORCE_180_DIAS = new Formularios(null, "SALESFORCE_180_DIAS", new ArrayList<>(),
                DestinatarioPergunta.ALUNOS, PeriodoFormulario.FORMULARIO_180_DIAS, Turma.DESENVOLVEDOR_SALESFORCE);

        Formularios SALESFORCE_365_DIAS = new Formularios(null, "SALESFORCE_365_DIAS", new ArrayList<>(),
                DestinatarioPergunta.ALUNOS, PeriodoFormulario.FORMULARIO_365_DIAS, Turma.DESENVOLVEDOR_SALESFORCE);


        Formularios SALESFORCE_30_DIAS_PARCEIROS = new Formularios(null, "SALESFORCE_30_DIAS_PARCEIROS", new ArrayList<>(),
                DestinatarioPergunta.PARCEIROS, PeriodoFormulario.FORMULARIO_30_DIAS, Turma.DESENVOLVEDOR_SALESFORCE);

        Formularios SALESFORCE_90_DIAS_PARCEIROS = new Formularios(null, "SALESFORCE_90_DIAS_PARCEIROS", new ArrayList<>(),
                DestinatarioPergunta.PARCEIROS, PeriodoFormulario.FORMULARIO_90_DIAS, Turma.DESENVOLVEDOR_SALESFORCE);

        Formularios SALESFORCE_180_DIAS_PARCEIROS = new Formularios(null, "SALESFORCE_180_DIAS_PARCEIROS", new ArrayList<>(),
                DestinatarioPergunta.PARCEIROS, PeriodoFormulario.FORMULARIO_180_DIAS, Turma.DESENVOLVEDOR_SALESFORCE);

        Formularios SALESFORCE_365_DIAS_PARCEIROS = new Formularios(null, "SALESFORCE_365_DIAS_PARCEIROS", new ArrayList<>(),
                DestinatarioPergunta.PARCEIROS, PeriodoFormulario.FORMULARIO_365_DIAS, Turma.DESENVOLVEDOR_SALESFORCE);


        Formularios DADOS_30_DIAS = new Formularios(null, "DADOS_30_DIAS", Arrays.asList(q1, q2, q3, q4),
                DestinatarioPergunta.ALUNOS, PeriodoFormulario.FORMULARIO_30_DIAS, Turma.ENGENHARIA_DE_DADOS);

        Formularios DADOS_90_DIAS = new Formularios(null, "DADOS_90_DIAS", new ArrayList<>(),
                DestinatarioPergunta.ALUNOS, PeriodoFormulario.FORMULARIO_90_DIAS, Turma.ENGENHARIA_DE_DADOS);

        Formularios DADOS_180_DIAS = new Formularios(null, "DADOS_180_DIAS", new ArrayList<>(),
                DestinatarioPergunta.ALUNOS, PeriodoFormulario.FORMULARIO_180_DIAS, Turma.ENGENHARIA_DE_DADOS);

        Formularios DADOS_365_DIAS = new Formularios(null, "DADOS_365_DIAS", new ArrayList<>(),
                DestinatarioPergunta.ALUNOS, PeriodoFormulario.FORMULARIO_365_DIAS, Turma.ENGENHARIA_DE_DADOS);


        Formularios DADOS_30_DIAS_PARCEIROS = new Formularios(null, "DADOS_30_DIAS", new ArrayList<>(),
                DestinatarioPergunta.PARCEIROS, PeriodoFormulario.FORMULARIO_30_DIAS, Turma.ENGENHARIA_DE_DADOS);

        Formularios DADOS_90_DIAS_PARCEIROS = new Formularios(null, "DADOS_90_DIAS_PARCEIROS", new ArrayList<>(),
                DestinatarioPergunta.PARCEIROS, PeriodoFormulario.FORMULARIO_90_DIAS, Turma.ENGENHARIA_DE_DADOS);

        Formularios DADOS_180_DIAS_PARCEIROS = new Formularios(null, "DADOS_180_DIAS_PARCEIROS", new ArrayList<>(),
                DestinatarioPergunta.PARCEIROS, PeriodoFormulario.FORMULARIO_180_DIAS, Turma.ENGENHARIA_DE_DADOS);

        Formularios DADOS_365_DIAS_PARCEIROS = new Formularios(null, "DADOS_365_DIAS_PARCEIROS", new ArrayList<>(),
                DestinatarioPergunta.PARCEIROS, PeriodoFormulario.FORMULARIO_365_DIAS, Turma.ENGENHARIA_DE_DADOS);



        Formularios MIDIA_30_DIAS = new Formularios(null, "MIDIA_30_DIAS", Arrays.asList(q1, q2, q3, q4),
                DestinatarioPergunta.ALUNOS, PeriodoFormulario.FORMULARIO_30_DIAS, Turma.MIDIA_DIGITAL);

        Formularios MIDIA_90_DIAS = new Formularios(null, "MIDIA_90_DIAS", new ArrayList<>(),
                DestinatarioPergunta.ALUNOS, PeriodoFormulario.FORMULARIO_90_DIAS, Turma.MIDIA_DIGITAL);

        Formularios MIDIA_180_DIAS = new Formularios(null, "MIDIA_180_DIAS", new ArrayList<>(),
                DestinatarioPergunta.ALUNOS, PeriodoFormulario.FORMULARIO_180_DIAS, Turma.MIDIA_DIGITAL);

        Formularios MIDIA_365_DIAS = new Formularios(null, "MIDIA_365_DIAS", new ArrayList<>(),
                DestinatarioPergunta.ALUNOS, PeriodoFormulario.FORMULARIO_365_DIAS, Turma.MIDIA_DIGITAL);


        Formularios MIDIA_30_DIAS_PARCEIROS = new Formularios(null, "MIDIA_30_DIAS_PARCEIROS", new ArrayList<>(),
                DestinatarioPergunta.PARCEIROS, PeriodoFormulario.FORMULARIO_30_DIAS, Turma.MIDIA_DIGITAL);

        Formularios MIDIA_90_DIAS_PARCEIROS = new Formularios(null, "MIDIA_90_DIAS_PARCEIROS", new ArrayList<>(),
                DestinatarioPergunta.PARCEIROS, PeriodoFormulario.FORMULARIO_90_DIAS, Turma.MIDIA_DIGITAL);

        Formularios MIDIA_180_DIAS_PARCEIROS = new Formularios(null, "MIDIA_180_DIAS_PARCEIROS", new ArrayList<>(),
                DestinatarioPergunta.PARCEIROS, PeriodoFormulario.FORMULARIO_180_DIAS, Turma.MIDIA_DIGITAL);

        Formularios MIDIA_365_DIAS_PARCEIROS = new Formularios(null, "MIDIA_365_DIAS_PARCEIROS", new ArrayList<>(),
                DestinatarioPergunta.PARCEIROS, PeriodoFormulario.FORMULARIO_365_DIAS, Turma.MIDIA_DIGITAL);




        formularioRepository.saveAll(Arrays.asList(
                MIDIA_30_DIAS, MIDIA_90_DIAS, MIDIA_180_DIAS, MIDIA_365_DIAS,
                JAVA_30_DIAS, JAVA_90_DIAS, JAVA_180_DIAS, JAVA_365_DIAS,
                SALESFORCE_30_DIAS, SALESFORCE_90_DIAS, SALESFORCE_180_DIAS, SALESFORCE_365_DIAS,
                DADOS_30_DIAS, DADOS_90_DIAS, DADOS_180_DIAS, DADOS_365_DIAS,


                MIDIA_30_DIAS_PARCEIROS, MIDIA_90_DIAS_PARCEIROS, MIDIA_180_DIAS_PARCEIROS, MIDIA_365_DIAS_PARCEIROS,
                JAVA_30_DIAS_PARCEIROS, JAVA_90_DIAS_PARCEIROS, JAVA_180_DIAS_PARCEIROS, JAVA_365_DIAS_PARCEIROS,
                SALESFORCE_30_DIAS_PARCEIROS, SALESFORCE_90_DIAS_PARCEIROS, SALESFORCE_180_DIAS_PARCEIROS, SALESFORCE_365_DIAS_PARCEIROS,
                DADOS_30_DIAS_PARCEIROS, DADOS_90_DIAS_PARCEIROS, DADOS_180_DIAS_PARCEIROS, DADOS_365_DIAS_PARCEIROS

        ));

        System.out.println("forms salvos");


    }

}
