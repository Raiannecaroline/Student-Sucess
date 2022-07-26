package org.soulcodeacademy.studentsucess.models.enums;

import java.util.Optional;

public enum TipoDePergunta {

    MULTIPLA_ESCOLHA(0, "MULTIPLA_ESCOLHA"), ESCOLHA_SIMPLES(1, "ESCOLHA_SIMPLES");


    private Integer codigo;
    private String descricao;

    TipoDePergunta(Integer codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;

    }

    public Integer getCodigo() {
        return codigo;
    }

    public String getDescricao() {
        return descricao;
    }

    public static TipoDePergunta toEnum(Integer cod) {
        TipoDePergunta tipo = null;
        if (cod == null) {
            tipo = null;
        } else {
            for (TipoDePergunta tipoDePergunta : TipoDePergunta.values()) {
                if (cod.equals(tipoDePergunta.getCodigo())) {
                    tipo = tipoDePergunta;
                    break;
                }
            }
        }
        return Optional.ofNullable(tipo).orElseThrow(() -> new IllegalArgumentException("NAO ENCONTRADO"));
    }
}

