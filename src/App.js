import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import './config/ReactotronConfig';
import { store, persistor } from './store';
import Routes from './routes';
import history from './services/history';
import GlobalStyle from './styles/global';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={5000} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
