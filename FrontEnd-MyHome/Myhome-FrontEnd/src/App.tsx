import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import AreaDeLogin from './login/areaDeLogin';
import PaginaPrincipal from './paginaPrincipal/paginaPrincipal';
import PaginaPropriedade from './tabelaPropriedade/Propriedade';
import PaginaClientes from './tebelaCliente/Cliente';
import PaginaContrato from './tabelaContrato/Contrato';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/principal" element={<PaginaPrincipal />} />
        <Route path="/imoveis" element={<PaginaPropriedade />} />
        <Route path="/clientes" element={<PaginaClientes />} />
        <Route path="/contratos" element={<PaginaContrato />} />
        
      </Routes>
    </Router>
  );
}

export default App;