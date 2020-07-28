import PropTypes from 'prop-types'
import React, { useContext } from 'react'

const Context = React.createContext()

export function HedraProvider({ value, children }) {
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

HedraProvider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.object,
  children: PropTypes.node,
}

export function useHedra() {
  const hedra = useContext(Context)
  return hedra
}
