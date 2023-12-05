package com.myhome.myhome.controller;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    Logger logger = LoggerFactory.getLogger(this.getClass());
    @CrossOrigin(origins = "*")
    @PostMapping("/cadastrarcontrato")
    public ResponseEntity<String> cadastrarContrato(@RequestBody Contrato contrato) {
       
        
        // Verifica se a propriedade existe
        Optional<Propriedade> propriedadeOptional = propriedadeRepository.findById(contrato.getPropriedade().getId());
        if (propriedadeOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Propriedade não encontrada");
        } else {
            Propriedade propriedade = propriedadeOptional.get();
            List<Contrato> listaContratos = propriedade.getContratos();
            for (Contrato contratoDaPropriedade : listaContratos) {
                if (contratoDaPropriedade.vigente()) {
                    return ResponseEntity.badRequest().body("Não é possível cadastrar este contrato. Existe pelo menos um contrato vigente associado a propriedade.");
                }
            }
        }
        if (contrato.getInquilino() == null) {
            String errorMessage = "Cliente (inquilino) não pode ser nulo.";
            logger.error(errorMessage);

            return ResponseEntity.badRequest().body("Cliente (inquilino) não pode ser nulo.");
            
        }

        // Verifica se o inquilino existe
        Optional<Cliente> inquilinoOptional = clienteRepository.findById(contrato.getInquilino().getId());
        if (inquilinoOptional.isEmpty()) {
            String errorMessage = "Cliente (inquilino) não pode ser nulo.";
            logger.error(errorMessage);

            return ResponseEntity.badRequest().body("Inquilino não encontrado");
        }
        

        // Se ambas as instâncias existirem e não houver contratos vigentes, salva o contrato
        contratoRepository.save(contrato);

        return ResponseEntity.ok("Contrato cadastrado com sucesso!");
    }


     @CrossOrigin(origins = "*")
    @GetMapping("/listarcontratos")
    public Iterable<Contrato> listarContratos() {
        return contratoRepository.findAll();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/porcodigo")
    public Contrato consultaContrato(@RequestParam Integer codigo) {
        return contratoRepository.findByCodigo(codigo);
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
    public ResponseEntity<String> atualizarContrato(@RequestBody Contrato novoContrato, @PathVariable Integer id) {
        Optional<Contrato> contratoOptional = contratoRepository.findById(id);
        if (contratoOptional.isPresent()) {
            Contrato contratoExistente = contratoOptional.get();
            // Verifica se a propriedade existe
            Optional<Propriedade> propriedadeOptional = propriedadeRepository.findById(novoContrato.getPropriedade().getId());
            if (propriedadeOptional.isEmpty()) {
                return ResponseEntity.badRequest().body("Propriedade não encontrada");
            }else{
                Propriedade propriedade = propriedadeOptional.get();
                List<Contrato> listaContratos = propriedade.getContratos();
                for(Contrato contratoDaPropriedade:listaContratos){
                    if(contratoDaPropriedade.vigente()){
                        if(contratoDaPropriedade.getId() != contratoExistente.getId()){
                            System.out.println(contratoDaPropriedade.getId());
                            System.out.println(contratoExistente.getId());
                            return ResponseEntity.badRequest().body("Não é possível cadastrar este contrato. Existe pelo menos um contrato vigente associado a propriedade.");
                        }
                    }
                }
            }

            // Verifica se o inquilino existe
            Optional<Cliente> inquilinoOptional = clienteRepository.findById(novoContrato.getInquilino().getId());
            if (inquilinoOptional.isEmpty()) {
                return ResponseEntity.badRequest().body("Inquilino não encontrado");
            }

            // Atualize os campos do contrato existente com os dados do novoContrato
            contratoExistente.setCodigo(novoContrato.getCodigo());
            contratoExistente.setDataInicio(novoContrato.getDataInicio());
            contratoExistente.setDuracao(novoContrato.getDuracao());
            contratoExistente.setTermos(novoContrato.getTermos());
            contratoExistente.setPropriedade(novoContrato.getPropriedade());
            contratoExistente.setInquilino(novoContrato.getInquilino());

            contratoRepository.save(contratoExistente);
            // Se ambas as instâncias existirem

            return ResponseEntity.ok("Contrato atualizado com sucesso!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }// Restante do código...
}