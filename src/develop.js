import ThreePropTypes from './ThreePropTypes'
import { HedraProvider, useParent, useRoot } from './helpers/context'
import useHedra, { propTypes } from './helpers/useHedra'
import { updateVector2, updateVector3, updateEuler, updateColor } from './helpers/updaters'
import { useUpdate } from './plugins/useClock'

export {
  ThreePropTypes,
  useHedra,
  propTypes,
  useUpdate,

  HedraProvider,
  useParent,
  useRoot,

  updateVector2,
  updateVector3,
  updateEuler,
  updateColor,
}
