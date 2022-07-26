package org.soulcodeacademy.studentsucess.exceptions;

import lombok.Getter;

@Getter
public enum ExceptionType {

    ENITDADE_NAO_ENCONTRADA("Entidade não encontrada", "/entidade-nao-encontrada"),

    ENTIDADE_EM_USO("Entidades associadas a outras entidades não podem ser deletadas", "/item-associado-a-outro"),

    MENSAGEM_BODY_IMCOMPREEMSIVEL("Mensagem incompreensivel", "/mensgem-imcompreensivel"),

    PARAMETRO_INVALIDO("A url possui um parametro invalido", "/paramentro-invalido"),

    ERRO_NO_SISTEMA("Ocoreu um erro interno, tente novamente, se persistir entre em contato com o administrador", "/error"),

    DADOS_INVALIDOS("Essa operação não foi concluida pois apresenta dados invalidos", "/dados-invalidos"),

    ACESSO_NEGADO("Voçe não tem permissão para essa ação", "/Forbidden");


    private String title;
    private String uri;

    ExceptionType(String title, String path) {
        this.title = title;
        this.uri = "https://soulcode.org" + path;
    }
}