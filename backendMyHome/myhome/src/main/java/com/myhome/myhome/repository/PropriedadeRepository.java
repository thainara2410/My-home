package com.myhome.myhome.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myhome.myhome.model.Propriedade;

public interface PropriedadeRepository extends JpaRepository<Propriedade, Integer> {
    List<Propriedade> findByBairroContaining(String parteDoBairro);
}
