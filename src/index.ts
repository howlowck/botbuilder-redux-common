import { Store } from 'redux'
import IncomingMessageReduxMiddleware, {IncomingMessageState} from './IncomingMessageReduxMiddleware'

export function defaultRenderer<T extends IncomingMessageState> (
  ctx: BotContext, 
  store: Store<T>
) {
  store.getState().responses.forEach((response) => {
    ctx.reply(response)
  })
}

export {
  IncomingMessageReduxMiddleware, 
}
