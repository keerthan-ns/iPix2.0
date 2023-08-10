import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App.jsx'
import './index.css'
import store from './state/store'


ReactDOM.createRoot(document.getElementById('root')).render(
  // to provide redux store to all components
    <Provider store={store}>
      <App/>
    </Provider>
)
