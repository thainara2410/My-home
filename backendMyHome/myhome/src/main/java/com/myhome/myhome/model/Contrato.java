package com.myhome.myhome.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Contrato {
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true)
    private Integer codigo;
    private String termos;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "propriedade_id")
    private Propriedade propriedade;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente inquilino;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public Integer getCodigo() {
        return codigo;
    }
    public void setCodigo(Integer código) {
        this.codigo = código;
    }
    
    public String getTermos() {
        return termos;
    }
    public void setTermos(String termos) {
        this.termos = termos;
    }
    public Cliente getInquilino() {
        return inquilino;
    }
    public void setInquilino(Cliente inquilino) {
        this.inquilino = inquilino;
    }
    public Propriedade getPropriedade() {
        return propriedade;
    }
    public void setPropriedade(Propriedade propriedade) {
        this.propriedade = propriedade;
    }
}
