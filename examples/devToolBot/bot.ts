import { Bot, MemoryStorage } from 'botbuilder'
import { BotFrameworkAdapter } from 'botbuilder-services'
import { get } from 'lodash'
import { IncomingMessageReduxMiddleware, defaultRenderer } from '../../src'
import BotReduxMiddleware , {getStore} from 'botbuilder-redux'
const restify = require('restify')
import createStore, { State } from './createStore'

// if you see a weird Compilation error: https://github.com/uNetworking/uWebSockets/pull/526/files
var remotedev = require('remotedev-server') 
remotedev({ hostname: 'localhost', port: 8100 })

// Create server
let server = restify.createServer()
server.listen(process.env.port || 3978, () => {
  console.log(`${server.name} listening to ${server.url}`)
})

// Create connector
const adapter = new BotFrameworkAdapter(
  { appId: process.env.MICROSOFT_APP_ID, appPassword: process.env.MICROSOFT_APP_PASSWORD }
)
server.post('/api/messages', adapter.listen())

// Initialize bot
const bot = new Bot(adapter)
    .use(new MemoryStorage())
    .use(new BotReduxMiddleware<State.All>(createStore))
    .use(new IncomingMessageReduxMiddleware<State.All>())
    .onReceive((context: BotContext) => {
      if (context.request.type !== 'message') {
        return
      }
      const {dispatch, getState} = getStore<State.All>(context)

      if (!get(getState(), 'info.name')) {
        dispatch({type: 'SEND_TEXT', data: `What is Your name?`})
        dispatch({type: 'ASK', data: 'info.name'})
      } else {
        const name = get(getState(), 'info.name')
        dispatch({type: 'SEND_TEXT', data: `Hello ${name}!`})
      }

      defaultRenderer(context, getStore<State.All>(context))
    })
