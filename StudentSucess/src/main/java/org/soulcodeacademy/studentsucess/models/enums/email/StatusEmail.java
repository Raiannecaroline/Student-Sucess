package org.soulcodeacademy.studentsucess.models.enums.email;

import java.util.Optional;

public enum StatusEmail {

    PROCESSANDO(0, "PROCESSANDO"), ENVIADO(1, "ENVIADO"), ERROR(2, "ERROR");


    private Integer codigo;
    private String descricao;

    StatusEmail(Integer codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;

    }

    public Integer getCodigo() {
        return codigo;
    }

    public String getDescricao() {
        return descricao;
    }

    public static StatusEmail toEnum(Integer cod) {
        StatusEmail tipo = null;
        if (cod == null) {
            tipo = null;
        } else {
            for (StatusEmail statusEmail : StatusEmail.values()) {
                if (cod.equals(statusEmail.getCodigo())) {
                    tipo = statusEmail;
                    break;
                }
            }
        }
        return Optional.ofNullable(tipo).orElseThrow(() -> new IllegalArgumentException("NAO ENCONTRADO"));
    }
}

