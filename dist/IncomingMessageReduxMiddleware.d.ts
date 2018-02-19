import { Store as ReduxStore } from 'redux';
import { Middleware } from 'botbuilder';
declare global  {
    interface BotContext {
        reduxStore: ReduxStore<any>;
    }
}
export interface IncomingMessageState {
    responses: string[];
}
declare class IncomingMessageReduxMiddleware<S> implements Middleware {
    protected getStore: (context: BotContext) => ReduxStore<S>;
    constructor(getStore?: (context: BotContext) => ReduxStore<S>);
    receiveActivity(context: BotContext, next: () => Promise<void>): Promise<void>;
}
export default IncomingMessageReduxMiddleware;
