package com.myhome.myhome.enumerador;

public enum TipoPropriedade {
    CASA("Casa"),
    APARTAMENTO("Apartamento"),
    TERRENO("Terreno"),
    COMERCIAL("Comercial"),
    OUTRO("Outro");

    private final String descricao;

    TipoPropriedade(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}

