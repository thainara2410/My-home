package com.myhome.myhome.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Cliente {
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true)
    private Integer cpf;
    
    private String nome;
    private Integer telefone;
    private String email;
    
    @JsonManagedReference
    @OneToMany(mappedBy = "proprietario", cascade = CascadeType.ALL)
    private List<Propriedade> propriedades;

    @JsonManagedReference
    @OneToMany(mappedBy = "inquilino", cascade = CascadeType.ALL)
    private List<Contrato> contratos;

    
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public Integer getCpf() {
        return cpf;
    }
    public void setCpf(Integer cpf) {
        this.cpf = cpf;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public Integer getTelefone() {
        return telefone;
    }
    public void setTelefone(Integer telefone) {
        this.telefone = telefone;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public List<Contrato> getContratos() {
        return contratos;
    }
    public void setContratos(List<Contrato> contratos) {
        this.contratos = contratos;
    }
}
