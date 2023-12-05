import './telaPrincipal.css';
import CasaLogo from '../assets/icons/casaLogo.svg';
import IconPerfil from '../assets/icons/iconPerfil1.png';
import Pesquisa from '../assets/icons/pesquisa.svg';
import Clientes  from '../assets/icons/people.svg';
import Imoveis  from '../assets/icons/building.svg';
import Contratos  from '../assets/icons/Docs.svg';
// import Usuarios from '../assets/icons/🦆 icon _password icon_.svg';
import { Link } from 'react-router-dom';
function PaginaPrincipal() {
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
            placeholder='Buscar por serviços'
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className='retangulo' >  
              <img src={Pesquisa} alt='Icone de pesquisa' />
            </button>
          </div>
      </div>

      <div className='corpoDaPagina'>

          <Link to='/clientes' className='link'>
            <section className='clientes'>
              <div className='ladoEsquerdo'>
                <img src={Clientes} alt='Icone de usuario' />                
              </div>
              <h2>Clientes</h2>
            </section>
          </Link>

          <Link to='/imoveis' className='link'>
            <section className='imoveis'>
              <div className='ladoEsquerdo'>
                <img src={Imoveis} alt='Icone de imoveis' />
              </div>
              <h2>Imóveis</h2>
            </section>
          </Link>

          <Link to='/contratos' className='link'>
            <section className='contratos'>
              <div className='ladoEsquerdo'>
                <img src={Contratos} alt='Icone de contratos' />
              </div>
              <h2>Contratos</h2>
            </section>
          </Link>

          {/* <Link to='/usuarios' className='link'>
            <section className='usuarios'>
              <div className='ladoEsquerdo'>
                <img src={Usuarios} alt='Icone de usuarios' />
              </div>
              <h2>Usuários</h2>
            </section>
          </Link>  */}
          
      </div>

      <div className='footer'>
        <div>Telefone: (xx) xxxxx-xxxx</div>
        <div>Email: MyHome@gmail.com</div>
        <div>Trabalhe conosco</div>
      </div>
    </div>
    
  );
}

export default PaginaPrincipal;
