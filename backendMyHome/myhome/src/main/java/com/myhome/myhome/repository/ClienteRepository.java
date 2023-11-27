package com.myhome.myhome.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myhome.myhome.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
    List<Cliente> findByNomeContaining(String parteDoNome);
}
