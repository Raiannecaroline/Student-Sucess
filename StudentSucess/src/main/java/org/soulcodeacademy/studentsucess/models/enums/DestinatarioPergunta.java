package org.soulcodeacademy.studentsucess.models.enums;

import java.util.Optional;

public enum DestinatarioPergunta {

    ALUNOS(0, "ALUNOS"), PARCEIROS(1, "PARCEIROS");


    private Integer codigo;
    private String descricao;

    DestinatarioPergunta(Integer codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;

    }

    public Integer getCodigo() {
        return codigo;
    }

    public String getDescricao() {
        return descricao;
    }

    public static DestinatarioPergunta toEnum(Integer cod) {
        DestinatarioPergunta tipo = null;
        if (cod == null) {
            tipo = null;
        } else {
            for (DestinatarioPergunta destinatarioPergunta : DestinatarioPergunta.values()) {
                if (cod.equals(destinatarioPergunta.getCodigo())) {
                    tipo = destinatarioPergunta;
                    break;
                }
            }
        }
        return Optional.ofNullable(tipo).orElseThrow(() -> new IllegalArgumentException("NAO ENCONTRADO"));
    }
}

