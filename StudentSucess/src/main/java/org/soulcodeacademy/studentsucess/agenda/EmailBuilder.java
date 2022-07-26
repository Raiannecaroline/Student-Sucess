package org.soulcodeacademy.studentsucess.agenda;

import org.soulcodeacademy.studentsucess.models.email.Email;

import java.time.LocalDate;

public class EmailBuilder {


    public static Email criarEmail3ODias(String nomeUsuario){
        return Email.builder()
                .titulo("Pesquisa De Desempenho e satisfação")

                .corpo("Olá, "+ nomeUsuario+"!\n" +
                        "\n" +
                        "Tudo bem com você?\n" +
                        "\n" +
                        "Estamos felizes em ter você em nossa carteira de clientes e trabalhamos a cada dia para melhorar nossos serviços.\n" +
                        "\n" +
                        "E, para que possamos melhorar ainda mais, gostaríamos de solicitar sua opinião sobre nossos serviços.\n" +
                        "\n" +
                        "Link para o formulario da pesquisa: http://localhost:4200/questionario/1\n" +
                        "\n" +
                        "Podemos contar com você?\n" +
                        "\n" +
                        "Atenciosamente, SoulCodeAcademy.")
                .dataDeEnvio(LocalDate.now())
                .emailOrigem("1studentsucess@gmail.com")
                .build();
    }


    public static Email criarEmail3ODiasEmpresa(String nomeUsuario, String nomeAluno){
        return Email.builder()
                .titulo("Pesquisa De Desempenho e satisfação")

                .corpo("Olá, "+ nomeUsuario+"!\n" +
                        "\n" +
                        "Tudo bem com você?\n" +
                        "\n" +
                        "Estamos felizes em ter você em nossa carteira de clientes e trabalhamos a cada dia para melhorar nossos serviços.\n" +
                        "\n" +
                        "E, para que possamos melhorar ainda mais, gostaríamos de solicitar sua opinião sobre nosso aluno " + nomeAluno + ".\n" +
                        "\n" +
                        "Link para o formulario da pesquisa: http://localhost:4200/questionario/1\n" +
                        "\n" +
                        "Podemos contar com você?\n" +
                        "\n" +
                        "Atenciosamente, SoulCodeAcademy.")
                .dataDeEnvio(LocalDate.now())
                .emailOrigem("1studentsucess@gmail.com")
                .build();
    }
}
