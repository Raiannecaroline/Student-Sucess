package org.soulcodeacademy.studentsucess.models.enums;

import java.util.Optional;

public enum PeriodoFormulario {

    FORMULARIO_30_DIAS(0, "FORMULARIO_30_DIAS"),
    FORMULARIO_90_DIAS(1, "FORMULARIO_90_DIAS"),
    FORMULARIO_180_DIAS(2, "FORMULARIO_180_DIAS"),
    FORMULARIO_365_DIAS(3, "FORMULARIO_365_DIAS");



    private Integer codigo;
    private String descricao;

    PeriodoFormulario(Integer codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;

    }

    public Integer getCodigo() {
        return codigo;
    }

    public String getDescricao() {
        return descricao;
    }

    public static PeriodoFormulario toEnum(Integer cod) {
        PeriodoFormulario tipo = null;
        if (cod == null) {
            tipo = null;
        } else {
            for (PeriodoFormulario periodo : PeriodoFormulario.values()) {
                if (cod.equals(periodo.getCodigo())) {
                    tipo = periodo;
                    break;
                }
            }
        }
        return Optional.ofNullable(tipo).orElseThrow(() -> new IllegalArgumentException("NAO ENCONTRADO"));
    }
}

