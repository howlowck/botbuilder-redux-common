import { Store } from 'redux';
import 'botbuilder-core';
import IncomingMessageReduxMiddleware, { IncomingMessageState } from './IncomingMessageReduxMiddleware';
export declare function defaultRenderer<T extends IncomingMessageState>(ctx: BotContext, store: Store<T>): void;
export { IncomingMessageReduxMiddleware };
