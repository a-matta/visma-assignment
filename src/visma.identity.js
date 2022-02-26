"use strict";

const UUIDv4 = require("uuid-v4-validator").UUIDv4;

const vismaIdentityRegEx =
  /^visma-identity:\/\/[a-z]+\?[a-z]+=[\w-]+(&[a-z]+=[\w-]+)?$/g;

module.exports = class VismaIdentity {
  constructor(uri) {
    const res = uri.match(vismaIdentityRegEx);
    if (!res) {
      throw new Error(`Invalid uri = ${uri}`);
    }

    const result = new URL(uri);

    this.action = result.host;
    this.parameters = result.searchParams;

    if (!this.parameters.get("source")) {
      throw new Error(`mandatory parameter source is missing`);
    }

    switch (this.action) {
      case "login":
        break;
      case "confirm":
        if (!this.parameters.get("paymentnumber")) {
          throw new Error(`confirm requires mandatory parameter paymentnumber`);
        }
        break;
      case "sign":
        const documentId = this.parameters.get("documentid");
        if (!documentId) {
          throw new Error(`sign requires mandatory parameter documentid`);
        }
        if (!UUIDv4.validate(documentId)) {
          throw new Error(`invalid documentid = ${documentId}`);
        }
        break;
      default:
        throw new Error(`Invalid action = ${this.action}`);
    }
  }
};
