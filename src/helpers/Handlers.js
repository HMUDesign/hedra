export default class Handlers {
  constructor() {
    this._handlers = new Set()
  }

  on(handler) {
    if (typeof handler === 'function') {
      this._handlers.add(handler)
    }
  }

  off(handler) {
    if (typeof handler === 'function') {
      this._handlers.delete(handler)
    }
  }

  register(handler) {
    this.on(handler)
    return () => this.off(handler)
  }

  handle(...args) {
    for (const handler of this._handlers) {
      handler(...args)
    }
  }
}
