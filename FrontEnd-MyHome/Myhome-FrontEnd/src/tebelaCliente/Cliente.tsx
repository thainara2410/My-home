import React, { useState, useEffect, useRef} from 'react';
import CasaLogo from '../assets/icons/casaLogo.svg';
import IconPerfil from '../assets/icons/iconPerfil1.png';
import Pesquisa from '../assets/icons/pesquisa.svg';
import { Link } from 'react-router-dom';
import './telaClientes.css';

export interface Cliente {   //// Interface Cliente define a estrutura de um objeto do tipo Cliente

  id: number;
  cpf: number;     
  nome: string;
  telefone: number;
  email: string;
}

function App(): JSX.Element {
    const [clientes, setClientes] = useState<Cliente[]>([]); // Estado para armazenar a lista de clientes
    const formRef = useRef<HTMLDivElement>(null); // Referência para o formulário usando useRef

    // Estados para controlar a exibição do formulário de cadastro, confirmação e termo de pesquisa
    const [showForm, setShowForm] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    
    const [newCliente, setNewCliente] = useState<Cliente>({ // Estado para armazenar os dados do novo cliente
      id: 0,
      cpf: 0,
      nome: '',
      telefone: 0,
      email: ''
    });

    const [editingCliente, setEditingCliente] = useState<Cliente | null>(null); // Estado para armazenar o cliente a ser editado
    const [clienteToDelete, setClienteToDelete] = useState<Cliente | null>(null); // Estado para armazenar o cliente a ser excluído
  
    useEffect(() => {
      fetchClientes(); // Busca a lista de clientes ao carregar a página
    }, []);

    const fetchClientes = async () => { // Função para buscar a lista de clientes
        try {
          const response = await fetch('http://localhost:8080/api/myhome/listarclientes'); // Busca a lista de clientes na API, através da URL
          if (response.ok) {
            const dados: Cliente[] = await response.json(); // Converte os dados para o formato JSON se a resposta estiver OK
            setClientes(dados);
          }
        } catch (error) {
          console.error('Erro ao buscar clientes:', error);
          setClientes([]); // Limpa a lista de clientes se houver erro
        }
      };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Função para atualizar o estado com os dados do novo cliente
    const { name, value } = e.target;  // Obtém o nome e o valor do campo de entrada
    setNewCliente({ 
      ...newCliente, // Mantém os dados que já estavam no estado
      [name]: value // Atualiza o campo que foi alterado
    });
  };

  const handleSubmit = async (e: React.FormEvent) => { // Função para cadastrar um novo cliente
    e.preventDefault(); 
    try {
      const response = await fetch('http://localhost:8080/api/myhome/cadastrarcliente', { 
        method: 'POST', // Envia os dados via método POST
        headers: { 
          'Content-Type': 'application/json'   // Envia os dados no formato JSON
        },
        body: JSON.stringify(newCliente) // Converte os dados para o formato JSON
      });

      if (response.ok) {
        await fetchClientes(); // Busca novamente a lista de clientes se a resposta estiver OK 
        setShowForm(false);
        setNewCliente({ // Limpa o formulário após o cadastro
            id: 0,
            cpf: 0,
            nome: '',
            telefone: 0,
            email: ''
        });
      }
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error); 
    }
  };

  const handleEdit = (cliente: Cliente) => { // Função para atualizar o estado com os dados do cliente a ser editado
    setEditingCliente(cliente); 
    setNewCliente(cliente);
    setShowForm(true); // Exibe o formulário de edição
  };

  const handleUpdate = async () => { // Função para atualizar um cliente 
    if (!editingCliente) return; 

    try {
      const response = await fetch(`http://localhost:8080/api/myhome/atualizarcliente/${editingCliente.id}`, {
        method: 'PUT', // Envia os dados via método PUT
        headers: {  
          'Content-Type': 'application/json' // Envia os dados no formato JSON
        },
        body: JSON.stringify(newCliente) // Converte os dados para o formato JSON
      });

      if (response.ok) {
        await fetchClientes(); // Busca novamente a lista de clientes se a resposta estiver OK
        setShowForm(false); 
        setEditingCliente(null); // Limpa o cliente a ser editado
        setNewCliente({ 
            id: 0,
            cpf: 0,
            nome: '',
            telefone: 0,
            email: ''
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar propriedade:', error);
    }
  };
  const handleDelete = (cliente: Cliente) => {  // Função para atualizar o estado com os dados do cliente a ser excluído
    setClienteToDelete(cliente); // Armazena a propriedade a ser excluída
    setShowConfirmation(true); // Exibe o formulário de confirmação
  };
  const confirmDelete = async () => { // Função para excluir um cliente
    if (!clienteToDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/api/myhome/excluircliente/${clienteToDelete.id}`, {
        method: 'DELETE', // Envia os dados via método DELETE
      });

      if (response.ok) {
        await fetchClientes();
        setShowConfirmation(false); // Oculta o formulário de confirmação após a exclusão
        setClienteToDelete(null); // Limpa a propriedade a ser excluída
      }
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false); // Oculta o formulário de confirmação ao cancelar
    setClienteToDelete(null); // Limpa a propriedade a ser excluída
  };

  const handleSearch = async () => { // Função para buscar clientes pelo nome
    try {
      const response = await fetch(`http://localhost:8080/api/myhome/pornome?parteDoNome=${searchTerm}`); // Busca a lista de clientes na API, através da URL
      if (response.ok) { 
        const data = await response.json(); // Converte os dados para o formato JSON se a resposta estiver OK
        setClientes(data); // Atualiza o estado com as propriedades filtradas pelo nome do bairro
      } else {
        console.error('Erro ao buscar cliente por nome');
      }
    } catch (error) {
      console.error('Erro ao buscar cliente por nome:', error);
    }
  };

  useEffect(() => { // Função para fechar o formulário ao clicar fora dele
    const handleOutsideClick = (event: MouseEvent) => { 
      if (formRef.current && !formRef.current.contains(event.target as Node)) { // Verifica se o elemento clicado está dentro do formulário ou não.
        setShowForm(false); // Fechar o formulário se clicar fora dele O evento de clique ocorreu fora do elemento referenciado por formRef
      }
    };
    document.addEventListener('mousedown', handleOutsideClick); // Adiciona o evento de clique ao documento
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick); // Remove o evento de clique do documento
    };
    }, []);

  return (
    <div className='App'>
      <div className='cabeçalho'>
        <Link to='/principal' className='link'>
          <div className='logoCabeçalho'>
            <img src={CasaLogo} alt='Logo da Casa do Código' />
            <h1>My Home</h1>
          </div>
        </Link>
        <img className='perfil' src={IconPerfil} alt='Icone de perfil' />
      </div>
      <div className='pesquisar'>
        <div className='areaPesquisa'>
          <input 
          type='text'
          placeholder='Digite o nome do cliente para pesquisar'
          value={searchTerm} // Valor do campo de pesquisa
          onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado com o valor do campo de pesquisa ao digitar 
          />
          <button className='retangulo' onClick={handleSearch}> 
            <img src={Pesquisa} alt='Icone de pesquisa' />
          </button>
        </div>
      </div>
      <div className='tabela_dados'>
        <table align='center' className='tabela'>
          <thead>
            <tr>
              <th>ID</th>
              <th>CPF</th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Comandos</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, index) => (
              <tr key={index}>
                <td>{cliente.id}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
                <td>
                  <button onClick={() => handleEdit(cliente)}>Editar</button>
                  <button onClick={() => handleDelete(cliente)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer>
        <button onClick={() => setShowForm(true)}>CADASTRAR NOVO CLIENTE</button> 
      </footer>
      {/* Componente para o formulário de cadastro e confirmação de exclusão */}
      <div className={`cadastro-overlay ${showForm ? 'show' : ''}`}> 
        {/* Título dinâmico baseado na condição de edição ou criação */}
        <h2>{editingCliente ? 'Editar Cliente' : 'Novo Cadastro de Cliente'}</h2>
          {/* Referência para o formulário */}
        <div ref={formRef} className='form_Cadastro'>
          {/* Renderização condicional do formulário baseado no estado 'showForm' */}
          {showForm && (
            <div>
              {/* Formulário para adicionar ou editar um cliente */}
              <form onSubmit={editingCliente ? handleUpdate : handleSubmit}>
                <input type='number' name='id' placeholder='ID' value={newCliente.id} onChange={handleInputChange} />
                <input type='number' name='cpf' placeholder='CPF' value={newCliente.cpf} onChange={handleInputChange} />
                <input type='text' name='nome' placeholder='Nome' value={newCliente.nome} onChange={handleInputChange} />
                <input type='number' name='telefone' placeholder='Telefone' value={newCliente.telefone} onChange={handleInputChange} />
                <input type='text' name='email' placeholder='email' value={newCliente.email} onChange={handleInputChange} />
                <button className="botaoCadastrar" type='submit'>
                  {editingCliente ? 'Atualizar' : 'Cadastrar'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      {showConfirmation && (
        <div className="confirm-delete-overlay">
          <h2>Confirmar Exclusão</h2>
          <div className='confirm-delete-area'>
            <p>Deseja realmente excluir este Cliente?</p>
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
