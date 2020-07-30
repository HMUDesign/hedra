import PropTypes from 'prop-types'
import React, { useContext } from 'react'

const Context = React.createContext()

export function HedraProvider({ hedra, children }) {
  return (
    <Context.Provider value={hedra}>
      {children}
    </Context.Provider>
  )
}

HedraProvider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  hedra: PropTypes.object,
  children: PropTypes.node,
}

export function useParent() {
  const hedra = useContext(Context)
  return hedra
}

export function useRoot() {
  const hedra = useContext(Context)
  return hedra.root
}
