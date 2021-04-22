import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { store, persistor } from '../src/store/';
import { Provider } from 'react-redux';
import { PersistGate} from 'redux-persist/integration/react';

/*PÁGINAS*/
import Login from './view/login/';
import NovoUsuario from './view/usuario-novo/';
import Home from './view/home/';
import UsuarioRecuperarSenha from './view/usuario-recuperar-senha/';
import MundoCadastro from './view/world-cadastro/';
import WorldDetalhes from './view/world-detalhes/';
import CharCadastro from './view/chars-cadastro/';
//import CharDetalhes from './view/chars-detalhes/';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Route exact path='/' component={Home} />
        <Route exact path='/novousuario' component={NovoUsuario} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/usuariorecuperarsenha' component={UsuarioRecuperarSenha} />
        <Route exact path='/mundocadastro' component={MundoCadastro} />
        <Route path='/editarworld/:id' component={MundoCadastro} />
        <Route path='/worlddetalhes/:id' component={WorldDetalhes} />
        <Route exact path='/charcadastro' component={CharCadastro} />
        <Route path='/charcadastro/:id' component={CharCadastro} />

      </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;