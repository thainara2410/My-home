package com.myhome.myhome.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.myhome.myhome.model.Cliente;
import com.myhome.myhome.model.Contrato;
import com.myhome.myhome.model.Propriedade;
import com.myhome.myhome.repository.ClienteRepository;
import com.myhome.myhome.repository.PropriedadeRepository;

@RestController
@RequestMapping("/api/myhome")
public class PropriedadeController {
    @Autowired
    private PropriedadeRepository action;

    @Autowired
    private ClienteRepository clienteRepository;

    @CrossOrigin(origins = "*")
@PostMapping("/cadastrarpropriedade/{clienteId}")
public ResponseEntity<String> cadastrarPropriedade(@PathVariable Integer clienteId, @RequestBody Propriedade propriedade) {
    try {
        // Verificar se o cliente existe usando o ClienteRepository
        Optional<Cliente> clienteOptional = clienteRepository.findById(clienteId);

        // Se o cliente existir, associar a propriedade a ele
        if (clienteOptional.isPresent()) {
            Cliente cliente = clienteOptional.get();
            propriedade.setProprietario(cliente);

            // Adicionar a propriedade à lista de propriedades do cliente
            List<Propriedade> propriedadesDoCliente = cliente.getPropriedades();
            propriedadesDoCliente.add(propriedade);
            cliente.setPropriedades(propriedadesDoCliente);

            // Salvar o cliente para atualizar a associação das propriedades
            clienteRepository.save(cliente);

            return ResponseEntity.ok("Propriedade cadastrada com sucesso!");
        } else {
            return ResponseEntity.badRequest().body("Cliente não encontrado");
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar propriedade: " + e.getMessage());
    }
}


    //endpoint para listar todas as propriedades
    @CrossOrigin(origins = "*")
    @GetMapping("/listarpropriedades")
    public Iterable<Propriedade> listarPropriedade(){
        return action.findAll();
    }

    // Endpoint para buscar propriedades por parte do nome do bairro
    @CrossOrigin(origins = "*")
    @GetMapping("/porbairro")
    public List<Propriedade> consultaPropriedades(@RequestParam String parteDoBairro) {
        return action.findByBairroContaining(parteDoBairro);
    }

    // Endpoint para excluir propriedade
    @CrossOrigin(origins = "*")
    @DeleteMapping("/excluirpropriedade/{id}")
    public ResponseEntity<String> deletePropriedade(@PathVariable Integer id) {
        Optional<Propriedade> propriedadeOptional = action.findById(id);
        
        if (propriedadeOptional.isPresent()) {
            Propriedade propriedade = propriedadeOptional.get();

            List<Contrato> listaContratos = propriedade.getContratos();
            // Verificar se a propriedade tem contratos vigentes
            for(Contrato contrato:listaContratos){
                if(contrato.vigente()){
                    return ResponseEntity.badRequest().body("Não é possível excluir a propriedade. Existe pelo menos um contrato vigente associado a esta propriedade.");
                }
            }
            action.delete(propriedade);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/atualizarpropriedade/{id}")
    public ResponseEntity<Propriedade> update(@RequestBody Propriedade novaPropriedade, @PathVariable Integer id) {
        Optional<Propriedade> propriedadeOptional = action.findById(id);
        if (propriedadeOptional.isPresent()) {
            Propriedade propriedadeExistente = propriedadeOptional.get();
            
            // Atualize os campos da propriedade existente com os dados da novaPropriedade
            propriedadeExistente.setNip(novaPropriedade.getNip());
            propriedadeExistente.setBairro(novaPropriedade.getBairro());
            propriedadeExistente.setRua(novaPropriedade.getRua());
            propriedadeExistente.setNumero_da_casa(novaPropriedade.getNumero_da_casa());
            propriedadeExistente.setValor_mensal(novaPropriedade.getValor_mensal());
            propriedadeExistente.setQuantidade_de_comodos(novaPropriedade.getQuantidade_de_comodos());
            propriedadeExistente.setQuantidade_de_banheiros(novaPropriedade.getQuantidade_de_banheiros());
            propriedadeExistente.setQuantidade_de_banheiros(novaPropriedade.getQuantidade_de_banheiros());
            propriedadeExistente.setDescricao_geral(novaPropriedade.getDescricao_geral());

            // Adicione aqui os outros campos que deseja atualizar
            
            Propriedade propriedadeAtualizado = action.save(propriedadeExistente);
            return ResponseEntity.ok(propriedadeAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
