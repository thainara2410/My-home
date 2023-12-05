import React, { useState, useEffect, useRef} from 'react';
import CasaLogo from '../assets/icons/casaLogo.svg';
import IconPerfil from '../assets/icons/iconPerfil1.png';
import Pesquisa from '../assets/icons/pesquisa.svg';
import './telaClientes.css';

export interface Cliente {
  id: number;
  cpf: number;
  nome: string;
  telefone: number;
  email: string;
}

function App(): JSX.Element {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const formRef = useRef<HTMLDivElement>(null);
    const [showForm, setShowForm] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [newCliente, setNewCliente] = useState<Cliente>({
      id: 0,
      cpf: 0,
      nome: '',
      telefone: 0,
      email: ''
    });
    const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
    const [clienteToDelete, setClienteToDelete] = useState<Cliente | null>(null);
  
    useEffect(() => {
      fetchClientes();
    }, []);

    const fetchClientes = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/myhome/listarclientes');
          if (response.ok) {
            const dados: Cliente[] = await response.json();
            setClientes(dados);
          }
        } catch (error) {
          console.error('Erro ao buscar clientes:', error);
          setClientes([]);
        }
      };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCliente({
      ...newCliente,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/myhome/cadastrarcliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCliente)
      });

      if (response.ok) {
        await fetchClientes();
        setShowForm(false);
        setNewCliente({
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

  const handleEdit = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setNewCliente(cliente);
    setShowForm(true);
  };

  const handleUpdate = async () => {
    if (!editingCliente) return;

    try {
      const response = await fetch(`http://localhost:8080/api/myhome/atualizarcliente/${editingCliente.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCliente)
      });

      if (response.ok) {
        await fetchClientes();
        setShowForm(false);
        setEditingCliente(null);
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
  const handleDelete = (cliente: Cliente) => {
    setClienteToDelete(cliente); // Armazena a propriedade a ser excluída
    setShowConfirmation(true); // Exibe o formulário de confirmação
  };
  const confirmDelete = async () => {
    if (!clienteToDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/api/myhome/excluircliente/${clienteToDelete.id}`, {
        method: 'DELETE',
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

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/myhome/pornome?parteDoNome=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        setClientes(data); // Atualiza o estado com as propriedades filtradas pelo nome do bairro
      } else {
        console.error('Erro ao buscar cliente por nome');
      }
    } catch (error) {
      console.error('Erro ao buscar cliente por nome:', error);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setShowForm(false); // Fechar o formulário se clicar fora dele
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
    }, []);

  return (
    <div className='App'>
      <div className='cabeçalho'>
        <div className='logoCabeçalho'>
          <img src={CasaLogo} alt='Logo da Casa do Código' />
          <h1>My Home</h1>
        </div>
        <img className='perfil' src={IconPerfil} alt='Icone de perfil' />
      </div>
      <div className='pesquisar'>
        <div className='areaPesquisa'>
          <input 
          type='text'
          placeholder='Digite o nome do cliente para pesquisar'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
      <div className={`cadastro-overlay ${showForm ? 'show' : ''}`}>
        <h2>{editingCliente ? 'Editar Cliente' : 'Novo Cadastro de Cliente'}</h2>
        <div ref={formRef} className='form_Cadastro'>
          {showForm && (
            <div>
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
