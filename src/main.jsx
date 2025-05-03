import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "./components/ui/provider.jsx"
import {BrowserRouter} from 'react-router-dom'
import { SnackbarProvider } from 'notistack';

createRoot(document.getElementById('root')).render(
  <SnackbarProvider 
      maxSnack={3} 
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
  <BrowserRouter>
      <Provider>
        <App />
      </Provider>
  </BrowserRouter>,
  </SnackbarProvider>
)
