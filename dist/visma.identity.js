"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VismaIdentityBuilder = exports.SignAction = exports.ConfirmAction = exports.LoginAction = void 0;
const uuid_v4_validator_1 = require("uuid-v4-validator");
class LoginAction {
    constructor(source) {
        this.source = source;
    }
    execute() {
        console.log(`Executing LoginAction with source=${this.source}`);
    }
}
exports.LoginAction = LoginAction;
class ConfirmAction {
    constructor(source, paymentNumber) {
        this.source = source;
        this.paymentNumber = paymentNumber;
    }
    execute() {
        console.log(`Executing ConfirmAction with source=${this.source} & paymentNumber=${this.paymentNumber}`);
    }
}
exports.ConfirmAction = ConfirmAction;
class SignAction {
    constructor(source, documentId) {
        this.source = source;
        this.documentId = documentId;
        if (!uuid_v4_validator_1.UUIDv4.validate(documentId)) {
            throw new Error(`invalid documentid = ${documentId}`);
        }
    }
    execute() {
        console.log(`Executing ConfirmAction with source=${this.source} & documentId=${this.documentId}`);
    }
}
exports.SignAction = SignAction;
const VismaIdentityBuilder = (uri) => {
    const vismaIdentityRegEx = /^visma-identity:\/\/[a-z]+\?[a-z]+=[\w-]+(&[a-z]+=[\w-]+)?$/g;
    const res = uri.match(vismaIdentityRegEx);
    if (!res) {
        throw new Error(`Invalid uri = '${uri}'`);
    }
    const result = new URL(uri);
    const action = result.host;
    const parameters = result.searchParams;
    const source = parameters.get("source");
    if (!source) {
        throw new Error(`mandatory parameter source is missing`);
    }
    switch (action) {
        case "login":
            return new LoginAction(source);
        case "confirm":
            const paymentNumber = parameters.get("paymentnumber");
            if (!paymentNumber) {
                throw new Error(`confirm requires mandatory parameter paymentnumber`);
            }
            return new ConfirmAction(source, paymentNumber);
        case "sign":
            const documentId = parameters.get("documentid");
            if (!documentId) {
                throw new Error(`sign requires mandatory parameter documentid`);
            }
            return new SignAction(source, documentId);
        default:
            throw new Error(`Invalid action = ${action}`);
    }
};
exports.VismaIdentityBuilder = VismaIdentityBuilder;
//# sourceMappingURL=visma.identity.js.map