import { Store as ReduxStore } from 'redux'
import { Middleware } from 'botbuilder'

declare global {
  export interface BotContext {
    reduxStore: ReduxStore<any>
  }
}

export interface IncomingMessageState {
  responses: string[]
}

const defaultGetStore = (context: BotContext) => context.reduxStore

class IncomingMessageReduxMiddleware<S> implements Middleware {
  protected getStore: (context: BotContext) => ReduxStore<S>

  constructor (getStore: (context: BotContext) => ReduxStore<S> = defaultGetStore) {
    this.getStore = getStore
  }

  receiveActivity (context: BotContext, next: () => Promise<void>) {
    if (context.request.type !== 'message') {
      return next()
    }
    this.getStore(context).dispatch({type: 'CLEAR_RESPONSES'})
    this.getStore(context).dispatch({type: 'INCOMING_MESSAGE', data: context.request.text || null})
    if (context.topIntent) {
      this.getStore(context).dispatch({type: 'INCOMING_INTENT', data: context.topIntent || null})
    }
    return next()
  }
}

export default IncomingMessageReduxMiddleware
