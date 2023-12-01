package com.myhome.myhome.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.myhome.myhome.enumerador.TipoPropriedade;

@Entity
public class Propriedade {
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true)
    private Integer nip;
    
    private String bairro;
    private String rua;
    private Integer numero_da_casa;
    private Float valor_mensal;
    //private TipoPropriedade tipo_de_imovel;
    private Integer quantidade_de_comodos;
    private Integer quantidade_de_banheiros;
    private String descricao_geral;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public Integer getNip() {
        return nip;
    }
    public void setNip(Integer nip) {
        this.nip = nip;
    }
    public String getBairro() {
        return bairro;
    }
    public void setBairro(String bairro) {
        this.bairro = bairro;
    }
    public String getRua() {
        return rua;
    }
    public void setRua(String rua) {
        this.rua = rua;
    }
    public Integer getNumero_da_casa() {
        return numero_da_casa;
    }
    public void setNumero_da_casa(Integer numero_da_casa) {
        this.numero_da_casa = numero_da_casa;
    }
    public Float getValor_mensal() {
        return valor_mensal;
    }
    public void setValor_mensal(Float valor_mensal) {
        this.valor_mensal = valor_mensal;
    }
    /*public TipoPropriedade getTipo_de_imovel() {
        return tipo_de_imovel;
    }
    public void setTipo_de_imovel(TipoPropriedade tipo_de_imovel) {
        this.tipo_de_imovel = tipo_de_imovel;
    }*/
    public Integer getQuantidade_de_comodos() {
        return quantidade_de_comodos;
    }
    public void setQuantidade_de_comodos(Integer quantidade_de_comodos) {
        this.quantidade_de_comodos = quantidade_de_comodos;
    }
    public Integer getQuantidade_de_banheiros() {
        return quantidade_de_banheiros;
    }
    public void setQuantidade_de_banheiros(Integer quantidade_de_banheiros) {
        this.quantidade_de_banheiros = quantidade_de_banheiros;
    }
    public String getDescricao_geral() {
        return descricao_geral;
    }
    public void setDescricao_geral(String descricao_geral) {
        this.descricao_geral = descricao_geral;
    }
}
