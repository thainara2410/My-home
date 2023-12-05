package com.myhome.myhome.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myhome.myhome.model.Cliente;
import com.myhome.myhome.model.Contrato;

public interface ContratoRepository extends JpaRepository<Contrato, Integer>{
    Contrato findByCodigo(Integer codigo);
   
}
