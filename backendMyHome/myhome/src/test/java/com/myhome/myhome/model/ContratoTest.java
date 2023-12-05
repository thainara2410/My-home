package com.myhome.myhome.model;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;

public class ContratoTest {

    @Test
    public void testContratoVigente() {
        Contrato contrato = new Contrato();
        contrato.setDataInicio(LocalDate.now().minusDays(1)); // Iniciado ontem
        contrato.setDuracao(7); // Duração de 7 dias

        assertTrue(contrato.vigente(), "O contrato deve estar vigente");
    }

    @Test
    public void testContratoExpirado() {
        Contrato contrato = new Contrato();
        contrato.setDataInicio(LocalDate.now().minusDays(10)); // Iniciado há 10 dias
        contrato.setDuracao(5); // Duração de 5 dias

        assertFalse(contrato.vigente(), "O contrato não deve estar vigente");
    }

    @Test
    public void testGetInquilino() {
        Cliente inquilinoEsperado = new Cliente();
        Contrato contrato = new Contrato();
        contrato.setInquilino(inquilinoEsperado);

        Cliente inquilinoObtido = contrato.getInquilino();

        assertEquals(inquilinoEsperado, inquilinoObtido, "O inquilino obtido deve ser o mesmo que foi definido");
    }

    @Test
    public void testGetPropriedade() {
        Propriedade propriedadeEsperada = new Propriedade();
        Contrato contrato = new Contrato();
        contrato.setPropriedade(propriedadeEsperada);

        Propriedade propriedadeObtida = contrato.getPropriedade();

        assertEquals(propriedadeEsperada, propriedadeObtida, "A propriedade obtida deve ser a mesma que foi definida");
    }

    // Adicione mais testes conforme necessário para cobrir diferentes casos.

}
