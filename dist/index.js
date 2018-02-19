(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./IncomingMessageReduxMiddleware"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const IncomingMessageReduxMiddleware_1 = require("./IncomingMessageReduxMiddleware");
    exports.IncomingMessageReduxMiddleware = IncomingMessageReduxMiddleware_1.default;
    function defaultRenderer(ctx, store) {
        store.getState().responses.forEach((response) => {
            ctx.reply(response);
        });
    }
    exports.defaultRenderer = defaultRenderer;
});
//# sourceMappingURL=index.js.map