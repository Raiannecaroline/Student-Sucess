package org.soulcodeacademy.studentsucess.models.enums;

import java.util.Optional;

public enum Turma {

    JAVA_FULL_STACK(0, "JAVA_FULL_STACK"),
    DESENVOLVEDOR_SALESFORCE(1, "DESENVOLVEDOR_SALESFORCE"),
    ENGENHARIA_DE_DADOS(2, "ENGENHARIA_DE_DADOS"),
    MIDIA_DIGITAL(3, "MIDIA_DIGITAL");




    private Integer codigo;
    private String descricao;

    Turma(Integer codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;

    }

    public Integer getCodigo() {
        return codigo;
    }

    public String getDescricao() {
        return descricao;
    }

    public static Turma toEnum(Integer cod) {
        Turma tipo = null;
        if (cod == null) {
            tipo = null;
        } else {
            for (Turma turma : Turma.values()) {
                if (cod.equals(turma.getCodigo())) {
                    tipo = turma;
                    break;
                }
            }
        }
        return Optional.ofNullable(tipo).orElseThrow(() -> new IllegalArgumentException("NAO ENCONTRADO"));
    }
}

