package com.myhome.myhome.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

//@Entity
public class Contrato {
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Integer id;
    private Integer código;
    private Cliente proprietario;
    private Cliente inquilino;
    private String termos;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public Integer getCódigo() {
        return código;
    }
    public void setCódigo(Integer código) {
        this.código = código;
    }
    public Cliente getProprietario() {
        return proprietario;
    }
    public void setProprietario(Cliente proprietario) {
        this.proprietario = proprietario;
    }
    public Cliente getInquilino() {
        return inquilino;
    }
    public void setInquilino(Cliente inquilino) {
        this.inquilino = inquilino;
    }
    public String getTermos() {
        return termos;
    }
    public void setTermos(String termos) {
        this.termos = termos;
    }
}
