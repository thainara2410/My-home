package com.myhome.myhome.model;

import java.time.Duration;
import java.time.LocalDate;
import java.time.Period;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;


@Entity
public class Contrato {
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true)
    @NotNull
    private Integer codigo;
    @NotNull

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dataInicio;
    @NotNull
    private Integer duracao;
    
    @NotNull
    private String termos;

    @ManyToOne
    @JoinColumn(name = "propriedade_id")
    private Propriedade propriedade;

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
    public LocalDate getDataInicio() {
        return dataInicio;
    }
    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }
    public Integer getDuracao() {
        return duracao;
    }
    public void setDuracao(Integer duracao) {
        this.duracao = duracao;
    }
    public boolean vigente() {
        LocalDate diaAtual = LocalDate.now();
        Period diasPosInicio = Period.between(dataInicio, diaAtual);

        // Converter duracao para Duration
        Duration duracaoEmDias = Duration.ofDays(duracao);

        // Comparar com Duration
        if (diasPosInicio.getDays() > duracaoEmDias.toDays()) {
            return false;
        }
        return true;
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
