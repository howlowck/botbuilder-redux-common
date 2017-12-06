(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const defaultGetStore = (context) => context.reduxStore;
    class IncomingMessageReduxMiddleware {
        constructor(getStore = defaultGetStore) {
            this.getStore = getStore;
        }
        receiveActivity(context) {
            this.getStore(context).dispatch({ type: 'CLEAR_RESPONSES' });
            this.getStore(context).dispatch({ type: 'INCOMING_MESSAGE', data: context.request.text });
            if (context.topIntent) {
                this.getStore(context).dispatch({ type: 'INCOMING_INTENT', data: context.topIntent });
            }
        }
    }
    exports.default = IncomingMessageReduxMiddleware;
});
//# sourceMappingURL=IncomingMessageReduxMiddleware.js.map