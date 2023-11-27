package com.myhome.myhome.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.myhome.myhome.repository.ClienteRepository;
@RestController
@RequestMapping("/api/myhome")
public class ClienteController {
    @Autowired
    private ClienteRepository action;
    
    //endpoint de cadastro de cliente
    @CrossOrigin(origins = "*")
    
    @PostMapping("/cadastrarcliente")
    public Cliente cadastrarcliente(@RequestBody Cliente cliente){
        return action.save(cliente);
    }

    //endpoint para listar todas as clientes
    @CrossOrigin(origins = "*")
    @GetMapping("/listarclientes")
    public Iterable<Cliente> listarCliente(){
        return action.findAll();
    }

    
    // Endpoint para buscar clientes por parte do nome do bairro
    @CrossOrigin(origins = "*")
    @GetMapping("/pornome")
    public List<Cliente> consultaClientes(@RequestParam String parteDoNome) {
        return action.findByNomeContaining(parteDoNome);
    }

        // Endpoint para excluir cliente
    @CrossOrigin(origins = "*")
    @DeleteMapping("/excluircliente/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        Optional<Cliente> clienteOptional = action.findById(id);
        
        if (clienteOptional.isPresent()) {
            Cliente cliente = clienteOptional.get();

            // Verificar se o cliente tem contratos vigentes
            List<Contrato> listaDeContratos = cliente.getContratos();
            for(Contrato contrato:listaDeContratos){
                if(contrato.vigente()){
                    return ResponseEntity.badRequest().body("Não é possível excluir o cliente. Existe pelo menos um contrato vigente associado a este cliente.");
                }
            }

            // Verificar se o cliente tem propriedades
            if (!cliente.getPropriedades().isEmpty()) {
                return ResponseEntity.badRequest().body("Não é possível excluir o cliente. Existem propriedades associadas a este cliente.");
            }

            action.delete(cliente);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/atualizarcliente/{id}")
    public ResponseEntity<Cliente> update(@RequestBody Cliente novoCliente, @PathVariable Integer id) {
        Optional<Cliente> clienteOptional = action.findById(id);
        if (clienteOptional.isPresent()) {
            Cliente clienteExistente = clienteOptional.get();
            
            // Atualize os campos da cliente existente com os dados da novoCliente
            clienteExistente.setCpf(novoCliente.getCpf());
            clienteExistente.setNome(novoCliente.getNome());
            clienteExistente.setTelefone(novoCliente.getTelefone());
            clienteExistente.setEmail(novoCliente.getEmail());
            
            Cliente clienteAtualizado = action.save(clienteExistente);
            return ResponseEntity.ok(clienteAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}


