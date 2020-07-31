import React from 'react'
import ReactDOM from 'react-dom'

import { Scene } from '@hmudesign/hedra'
import App from './App'

ReactDOM.render((
  <React.StrictMode>
    <Scene helper>
      <App />
    </Scene>
  </React.StrictMode>
), document.getElementById('root'))
