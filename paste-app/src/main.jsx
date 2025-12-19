import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {store} from './store.js'
import {Provider} from 'react-redux'
import './index.css'
import toast, {Toaster} from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
    <App />
    <Toaster/>
    </Provider>
  </StrictMode>,
)
