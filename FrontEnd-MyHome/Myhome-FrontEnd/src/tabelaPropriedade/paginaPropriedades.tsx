import React, { useState, useEffect, useRef} from 'react';
import CasaLogo from '../assets/icons/casaLogo.svg';
import IconPerfil from '../assets/icons/iconPerfil1.png';
import Pesquisa from '../assets/icons/pesquisa.svg';
import {Cliente} from '../tebelaCliente/paginaCliente'
import './telaPropriedade.css';

export interface Propriedade {
  id: number;
  nip: number;
  bairro: string;
  rua: string;
  numero_da_casa: number;
  valor_mensal: number;
  quantidade_de_comodos: number;
  quantidade_de_banheiros: number;
  descricao_geral: string;
  proprietario: Cliente;
}

function App(): JSX.Element {
  const [propriedades, setPropriedades] = useState<Propriedade[]>([]);
  const formRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newProperty, setNewProperty] = useState<Propriedade>({
    id: 0,
    nip: 0,
    bairro: '',
    rua: '',
    numero_da_casa: 0,
    valor_mensal: 0,
    quantidade_de_comodos: 0,
    quantidade_de_banheiros: 0,     // o novo imovel terá essas propriedades dentro dele, incluindo um proprietario.
    descricao_geral: '',
    proprietario: {
      id: 0,
      cpf: 0,
      nome: '',
      telefone: 0,
      email: ''
    }
  });
  const [editingProperty, setEditingProperty] = useState<Propriedade | null>(null);
  const [propertyToDelete, setPropertyToDelete] = useState<Propriedade | null>(null);

  useEffect(() => {
    fetchPropriedades();
  }, []);

  const [clientes, setClientes] = useState<Cliente[]>([]); // Estado para armazenar a lista de clientes

  useEffect(() => {
    fetchClientes(); // Busca os clientes ao carregar a página
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
      setClientes([]); // Defina uma lista vazia em caso de erro
    }
  };


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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProperty({
      ...newProperty,
      [name]: value
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(newProperty.proprietario); 
    
    try {
      
      const response = await fetch(`http://localhost:8080/api/myhome/cadastrarpropriedade/${newProperty.proprietario.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProperty)
      });
  
      if (response.ok) {
        // Lidar com o sucesso da requisição
        console.log('Propriedade cadastrada com sucesso!');
        // Atualizar a lista de propriedades após o cadastro bem-sucedido
        await fetchPropriedades();
        // Ocultar o formulário após o cadastro
        setShowForm(false);
      } else {
        // Lidar com falha na requisição
        console.error('Erro ao cadastrar propriedade:', response.statusText);
      }
    } catch (error) {
      // Lidar com erros durante a requisição
      console.error('Erro ao cadastrar propriedade:', error);
    }
  };
  
  
  
  
  const handleEdit = (property: Propriedade) => {
    setEditingProperty(property);
    setNewProperty(property);
    setShowForm(true);
  };

  const handleUpdate = async () => {
    if (!editingProperty) return;

    try {
      const response = await fetch(`http://localhost:8080/api/myhome/atualizarpropriedade/${editingProperty.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProperty)
      });

      if (response.ok) {
        await fetchPropriedades();
        setShowForm(false);
        setEditingProperty(null);
        setNewProperty({
          id: 0,
          nip: 0,
          bairro: '',
          rua: '',
          numero_da_casa: 0,
          valor_mensal: 0,
          quantidade_de_comodos: 0,
          quantidade_de_banheiros: 0,
          descricao_geral: '',
          proprietario: {
            id: 0,
            cpf: 0,
            nome: '',
            telefone: 0,
            email: ''
          }
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar propriedade:', error);
    }
  };
  const handleDelete = (property: Propriedade) => {
    setPropertyToDelete(property); // Armazena a propriedade a ser excluída
    setShowConfirmation(true); // Exibe o formulário de confirmação
  };
  const confirmDelete = async () => {
    if (!propertyToDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/api/myhome/excluirpropriedade/${propertyToDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchPropriedades();
        setShowConfirmation(false); // Oculta o formulário de confirmação após a exclusão
        setPropertyToDelete(null); // Limpa a propriedade a ser excluída
      }
    } catch (error) {
      console.error('Erro ao excluir propriedade:', error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false); // Oculta o formulário de confirmação ao cancelar
    setPropertyToDelete(null); // Limpa a propriedade a ser excluída
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/myhome/por-bairro?parteDoBairro=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        setPropriedades(data); // Atualiza o estado com as propriedades filtradas pelo nome do bairro
      } else {
        console.error('Erro ao buscar propriedades por bairro');
      }
    } catch (error) {
      console.error('Erro ao buscar propriedades por bairro:', error);
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
          placeholder='Digite o nome do bairro para pesquisar'
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
              <th>id</th>
              <th>nip</th>
              <th>bairro</th>
              <th>rua</th>
              <th>Número da casa</th>
              <th>Valor Mensal</th>
              <th>Quantidade de Comodos</th>
              <th>Quantidade de Banheiros</th>
              <th>Descrição geral</th>
              <th>Proprietario</th>
              <th>Comandos</th>
            </tr>
          </thead>
          <tbody>
            {propriedades.map((element, index) => (
              <tr key={index}>
                <td>{element.id}</td>
                <td>{element.nip}</td>
                <td>{element.bairro}</td>
                <td>{element.rua}</td>
                <td>{element.numero_da_casa}</td>
                <td>{element.valor_mensal}</td>
                <td>{element.quantidade_de_comodos}</td>
                <td>{element.quantidade_de_banheiros}</td>
                <td>{element.descricao_geral}</td>
                <td>{element.proprietario?.nome}</td> 
                <td>
                  <button onClick={() => handleEdit(element)}>Editar</button>
                  <button onClick={() => handleDelete(element)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer>
        <button onClick={() => setShowForm(true)}>CADASTRAR NOVA PROPRIEDADE</button>
      </footer>
      <div className={`cadastro-overlay ${showForm ? 'show' : ''}`}>
        <h2>{editingProperty ? 'Editar Propriedade' : 'Novo Cadastro de Propriedade'}</h2>
        <div ref={formRef} className='form_Cadastro'>
          {showForm && (
            <div>
              <form onSubmit={editingProperty ? handleUpdate : handleSubmit}>
                <input type='number' name='id' placeholder='ID' value={newProperty.id} onChange={handleInputChange} />
                <input type='number' name='nip' placeholder='NIP' value={newProperty.nip} onChange={handleInputChange} />
                <input type='text' name='bairro' placeholder='Bairro' value={newProperty.bairro} onChange={handleInputChange} />
                <input type='text' name='rua' placeholder='Rua' value={newProperty.rua} onChange={handleInputChange} />
                <input type='number' name='numero_da_casa' placeholder='Número da casa' value={newProperty.numero_da_casa} onChange={handleInputChange} />
                <input type='number' name='valor_mensal' placeholder='Valor Mensal' value={newProperty.valor_mensal} onChange={handleInputChange} />
                <input type='number' name='quantidade_de_comodos' placeholder='Quantidade de Comodos' value={newProperty.quantidade_de_comodos} onChange={handleInputChange} />
                <input type='number' name='quantidade_de_banheiros' placeholder='Quantidade de Banheiros' value={newProperty.quantidade_de_banheiros} onChange={handleInputChange} />
                <input
                  type='text'
                  name='proprietario'
                  placeholder='Proprietario'
                  value={(newProperty.proprietario && clientes.find((cliente) => cliente.id === newProperty.proprietario.id))?.nome || ''}
                  readOnly
                />
                <input type='text' name='descricao_geral' placeholder='Descrição Geral' value={newProperty.descricao_geral} onChange={handleInputChange} />
                <select
                    name='proprietario'
                    value={newProperty.proprietario.id}
                    onChange={(e) =>
                      setNewProperty({
                        ...newProperty,
                        proprietario: clientes.find((cliente) => cliente.id === parseInt(e.target.value, 10)) || newProperty.proprietario
                      })
                    }
                  >
                    <option value=''>Selecione o proprietário</option>
                    {clientes.map((cliente) => (
                      <option key={cliente.id} value={cliente.id}>
                        {cliente.nome}
                      </option>
                    ))}
                  </select>

                <button className="botaoCadastrar" type='submit'>
                  {editingProperty ? 'Atualizar' : 'Cadastrar'}
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
            <p>Deseja realmente excluir esta propriedade?</p>
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
