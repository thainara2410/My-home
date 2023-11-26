package com.myhome.myhome.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.myhome.myhome.model.Cliente;
import com.myhome.myhome.model.Contrato;
import com.myhome.myhome.model.Propriedade;
import com.myhome.myhome.repository.ClienteRepository;
import com.myhome.myhome.repository.ContratoRepository;
import com.myhome.myhome.repository.PropriedadeRepository;

@RestController
@RequestMapping("/api/myhome")
public class ContratoController {
    @Autowired
    private ContratoRepository contratoRepository;

    @Autowired
    private PropriedadeRepository propriedadeRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @CrossOrigin(origins = "*")
    @PostMapping("/cadastrarcontrato")
    public ResponseEntity<String> cadastrarContrato(@RequestBody Contrato contrato) {
        // Verifica se a propriedade existe
        Optional<Propriedade> propriedadeOptional = propriedadeRepository.findById(contrato.getPropriedade().getId());
        if (propriedadeOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Propriedade não encontrada");
        }

        // Verifica se o inquilino existe
        Optional<Cliente> inquilinoOptional = clienteRepository.findById(contrato.getInquilino().getId());
        if (inquilinoOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Inquilino não encontrado");
        }

        // Se ambas as instâncias existirem, salva o contrato
        contratoRepository.save(contrato);

        return ResponseEntity.ok("Contrato cadastrado com sucesso!");
    }

     @CrossOrigin(origins = "*")
    @GetMapping("/listarcontratos")
    public Iterable<Contrato> listarContratos() {
        return contratoRepository.findAll();
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/excluircontrato/{id}")
    public ResponseEntity<Void> excluirContrato(@PathVariable Integer id) {
        Optional<Contrato> contratoOptional = contratoRepository.findById(id);
        if (contratoOptional.isPresent()) {
            Contrato contrato = contratoOptional.get();
            contratoRepository.delete(contrato);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/atualizarcontrato/{id}")
    public ResponseEntity<Contrato> atualizarContrato(@RequestBody Contrato novoContrato, @PathVariable Integer id) {
        Optional<Contrato> contratoOptional = contratoRepository.findById(id);
        if (contratoOptional.isPresent()) {
            Contrato contratoExistente = contratoOptional.get();

            // Atualize os campos do contrato existente com os dados do novoContrato
            contratoExistente.setCodigo(novoContrato.getCodigo());
            contratoExistente.setTermos(novoContrato.getTermos());
            contratoExistente.setPropriedade(novoContrato.getPropriedade());
            contratoExistente.setInquilino(novoContrato.getInquilino());

            Contrato contratoAtualizado = contratoRepository.save(contratoExistente);
            return ResponseEntity.ok(contratoAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }// Restante do código...
}