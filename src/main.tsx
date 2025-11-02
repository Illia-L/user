import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/_elevation-sets.css';
import './css/reset.css';
import './css/colors.css';
import './css/index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './redux/store.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
