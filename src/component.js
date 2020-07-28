import { Component as ReactComponent } from 'react'

const instances = new Set()

export default class Component extends ReactComponent {
  constructor(props) {
    super(props)

    instances.add(this)
  }

  componentWillUnmount() {
    instances.delete(this)
  }
}

export function fakeLifecycleCallback(method, ...args) {
  for (const child of instances) {
    if (typeof child[method] === 'function') {
      child[method](...args)
    }
  }
}
