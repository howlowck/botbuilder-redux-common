import { Store as ReduxStore } from 'redux';
import { Middleware } from 'botbuilder-core';
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
    receiveActivity(context: BotContext): void;
}
export default IncomingMessageReduxMiddleware;
