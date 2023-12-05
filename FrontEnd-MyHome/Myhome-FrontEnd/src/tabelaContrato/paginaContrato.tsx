// Importação das dependências e arquivos necessários
import React, { useState, useEffect, useRef } from 'react';
import CasaLogo from '../assets/icons/casaLogo.svg';
import IconPerfil from '../assets/icons/iconPerfil1.png';
import Pesquisa from '../assets/icons/pesquisa.svg';
import { Cliente } from '../tebelaCliente/paginaCliente.tsx';
import { Propriedade } from '../tabelaPropriedade/paginaPropriedades.tsx';
import './telaContratos.css';

// Definição da interface para o contrato
export interface Contrato {
  id: number;
  codigo: number;
  dataInicio: string;
  duracao: number;
  termos: string;
  propriedade: Propriedade; // Alterado para o tipo de objeto Propriedade
  inquilino: Cliente; // Alterado para o tipo de objeto Cliente
}

function App(): JSX.Element {
  // Estados utilizados no componente
  const [contratos, setContrato] = useState<Contrato[]>([]);
  const formRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newContrato, setNewContrato] = useState<Contrato>({
    id: 0,
    codigo: 0,
    dataInicio: '',
    duracao: 0,
    termos: '',
    propriedade: {                                                                             
      id: 0,
      nip: 0,
      bairro: '',
      rua: '',
      numero_da_casa: 0,
      valor_mensal:0,
      quantidade_de_comodos:0,
      quantidade_de_banheiros:0,
      descricao_geral:'',
      proprietario: {
        id: 0,
        cpf: 0,
        nome: '',
        telefone: 0,
        email: ''
      }
    },
    inquilino: {
      id: 0,
      cpf: 0,
      nome: '',
      telefone: 0,
      email: ''
    }  
  });
  const [editingContrato, setEditingContrato] = useState<Contrato | null>(null);
  const [contratoToDelete, setContratoToDelete] = useState<Contrato | null>(null);

  const [clientes, setClientes] = useState<Cliente[]>([]); // Estado para armazenar a lista de clientes

  useEffect(() => {
    fetchClientes(); // Busca os clientes ao carregar a página
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/myhome/listarclientes');
      if (response.ok) {
        const dados: Cliente[] = await response.json(); // usado para listar os clientes
        setClientes(dados);
      }
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      setClientes([]); // Defina uma lista vazia em caso de erro
    }
  };


  const [propriedades, setPropriedades] = useState<Propriedade[]>([]);
  const fetchPropriedades = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/myhome/listarpropriedades');
      if (response.ok) {
        const dados: Propriedade[] = await response.json();
        setPropriedades(dados);
      }
    } catch (error) {
      console.error('Erro ao buscar propriedades:', error);
      setPropriedades([]);
    }
  };

  useEffect(() => {
    fetchPropriedades();
  }, []);

 
  
  // Efeito para buscar os contratos ao iniciar o componente
  useEffect(() => {
    fetchContratos();
  }, []);

  // Função para buscar os contratos na API
  const fetchContratos = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/myhome/listarcontratos');
      if (response.ok) {
        const dados: Contrato[] = await response.json();
        setContrato(dados);
      }
    } catch (error) {
      console.error('Erro ao buscar contrato:', error);
      setContrato([]);
    }
  };

  // Função para lidar com a mudança nos inputs do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContrato({
      ...newContrato,
      [name]: value
    });
  };

  // Função para lidar com o envio do formulário ao cadastrar um novo contrato
  const handleSubmit = async (e: React.FormEvent) => {
    console.log(newContrato);
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/myhome/cadastrarcontrato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...newContrato })
      });

      if (response.ok) {
        await fetchContratos();
        setShowForm(false);
        setNewContrato({
          id: 0,
          codigo: 0,
          dataInicio: '',
          duracao: 0,
          termos: '',
          propriedade: {                                                                             
            id: 0,
            nip: 0,
            bairro: '',
            rua: '',
            numero_da_casa: 0,
            valor_mensal:0,
            quantidade_de_comodos:0,
            quantidade_de_banheiros:0,
            descricao_geral:'',
            proprietario: {
              id: 0,
              cpf: 0,
              nome: '',
              telefone: 0,
              email: ''
            }
          },
          inquilino: {
            id: 0,
            cpf: 0,
            nome: '',
            telefone: 0,
            email: ''
          }  
        });
      }
    } catch (error) {
      console.error('Erro ao cadastrar contrato:', error);
    }
  };

  // Função para lidar com a edição de um contrato
  const handleEdit = (contrato: Contrato) => {
    setEditingContrato(contrato);
    setNewContrato(contrato);
    setShowForm(true);
  };

  // Função para atualizar um contrato
  const handleUpdate = async () => {
    if (!editingContrato) return;

    try {
      const response = await fetch(`http://localhost:8080/api/myhome/atualizarcontrato/${editingContrato.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newContrato)
      });

      if (response.ok) {
        await fetchContratos();
        setShowForm(false);
        setEditingContrato(null);
        setNewContrato({
          id: 0,
          codigo: 0,
          dataInicio: '',
          duracao: 0,
          termos: '',
          propriedade: {                                                                             
            id: 0,
            nip: 0,
            bairro: '',
            rua: '',
            numero_da_casa: 0,
            valor_mensal:0,
            quantidade_de_comodos:0,
            quantidade_de_banheiros:0,
            descricao_geral:'',
            proprietario: {
              id: 0,
              cpf: 0,
              nome: '',
              telefone: 0,
              email: ''
            }
          },
          inquilino: {
            id: 0,
            cpf: 0,
            nome: '',
            telefone: 0,
            email: ''
          }  
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar contrato:', error);
    }
  };

  // Função para lidar com a exclusão de um contrato
  const handleDelete = (contrato: Contrato) => {
    setContratoToDelete(contrato);
    setShowConfirmation(true);
  };

  // Função para confirmar a exclusão de um contrato
  const confirmDelete = async () => {
    if (!contratoToDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/api/myhome/excluircontrato/${contratoToDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchContratos();
        setShowConfirmation(false);
        setContratoToDelete(null);
      }
    } catch (error) {
      console.error('Erro ao excluir contrato:', error);
    }
  };

  // Função para cancelar a exclusão de um contrato
  const cancelDelete = () => {
    setShowConfirmation(false);
    setContratoToDelete(null);
  };

  // Função para buscar contratos por código
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/myhome/porcodigo?parteDoCodigo=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        setContrato(data);
      } else {
        console.error('Erro ao buscar contrato por código');
      }
    } catch (error) {
      console.error('Erro ao buscar contrato por código:', error);
    }
  };

  // Efeito para fechar o formulário ao clicar fora dele
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setShowForm(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // Renderização da interface
  return (
    <div className='App'>
      {/* Cabeçalho */}
      <div className='cabeçalho'>
        <div className='logoCabeçalho'>
          <img src={CasaLogo} alt='Logo da Casa do Código' />
          <h1>My Home</h1>
        </div>
        <img className='perfil' src={IconPerfil} alt='Icone de perfil' />
      </div>

      {/* Barra de pesquisa */}
      <div className='pesquisar'>
        <div className='areaPesquisa'>
          <input 
            type='text'
            placeholder='Digite o código do contrato para pesquisar'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className='retangulo' onClick={handleSearch}>
            <img src={Pesquisa} alt='Icone de pesquisa' />
          </button>
        </div>
      </div>

      {/* Tabela de dados */}
      <div className='tabela_dados'>
        <table align='center' className='tabela'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Data Início</th>
              <th>Termos</th>
              <th>Propriedade ID</th>
              <th>Cliente ID</th>
              <th>Comandos</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapeamento dos contratos para exibição na tabela */}
            {contratos.map((contrato, index) => (
              <tr key={index}>
                <td>{contrato.id}</td>                      
                <td>{contrato.codigo}</td>
                <td>{contrato.dataInicio}</td>
                <td>{contrato.termos}</td>
                <td>{contrato.propriedade?.id}</td>
                <td>{contrato.inquilino?.id}</td>
                <td>
                  <button onClick={() => handleEdit(contrato)}>Editar</button>
                  <button onClick={() => handleDelete(contrato)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botão para cadastrar novo contrato */}
      <footer>
        <button onClick={() => setShowForm(true)}>CADASTRAR NOVO CONTRATO</button>
      </footer>

      {/* Overlay do formulário de cadastro/editar contrato */}
      <div className={`cadastro-overlay ${showForm ? 'show' : ''}`}>
        <h2>{editingContrato ? 'Editar Contrato' : 'Novo Cadastro de Contrato'}</h2>
        <div ref={formRef} className='form_Cadastro'>
          {showForm && (
            <div>
              <form onSubmit={editingContrato ? handleUpdate : handleSubmit}>
                {/* Inputs do formulário */}
                <input type='number' name='id' placeholder='ID' value={newContrato.id} onChange={handleInputChange} />
                <input type='number' name='codigo' placeholder='Código' value={newContrato.codigo} onChange={handleInputChange} />
                <input type='text' name='dataInicio' placeholder='Data Início' value={newContrato.dataInicio} onChange={handleInputChange} />
                <input type='text' name='termos' placeholder='Termos' value={newContrato.termos} onChange={handleInputChange} />

                <input type='number' name='propriedade' placeholder='Propriedade ID' value={(newContrato.propriedade && propriedades.find((propriedade)=>propriedade.id===newContrato.propriedade.id))?.id || ''} readOnly />

                <select
                    name='propriedade'
                    value={newContrato.propriedade.id}
                    onChange={(e) =>                      // onde vai aparecer uma lista de clientes para o usuario selecionar
                      setNewContrato({
                        ...newContrato,
                        propriedade: propriedades.find((propriedade) => propriedade.id === parseInt(e.target.value, 10)) || newContrato.propriedade
                      })
                    }                                                      
                  >
                    <option value=''>Selecione a propriedade</option>
                    {propriedades.map((propriedade) => (
                      <option key={propriedade.id} value={propriedade.id}>
                        {propriedade.id} {propriedade.bairro}
                      </option>
                    ))}
                  </select>



                <input type='number' name='cliente' placeholder='Cliente ID'value={(newContrato.inquilino && clientes.find((cliente) => cliente.id === newContrato.inquilino.id))?.id || ''} //input onde sera colocado o objeto cliente
                  readOnly />
                <select
                    name='cliente'
                    value={newContrato.inquilino.id}
                    onChange={(e) =>                      // onde vai aparecer uma lista de clientes para o usuario selecionar
                      setNewContrato({
                        ...newContrato,
                        inquilino: clientes.find((cliente) => cliente.id === parseInt(e.target.value, 10)) || newContrato.inquilino
                      })
                    }                                                      
                  >
                    <option value=''>Selecione o cliente</option>
                    {clientes.map((cliente) => (
                      <option key={cliente.id} value={cliente.id}>
                        {cliente.id} {cliente.nome}
                      </option>
                    ))}
                  </select>

                <button className="botaoCadastrar" type='submit'>
                  {editingContrato ? 'Atualizar' : 'Cadastrar'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Overlay de confirmação para exclusão */}
      {showConfirmation && (
        <div className="confirm-delete-overlay">
          <h2>Confirmar Exclusão</h2>
          <div className='confirm-delete-area'>
            <p>Deseja realmente excluir este Contrato?</p>
            <div className='confirm-delete-buttons'>
              <button onClick={confirmDelete}>Confirmar</button>
              <button onClick={cancelDelete}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
