"use strict";

const parse = require("url-parse");
const UUIDv4 = require("uuid-v4-validator").UUIDv4;

const vismaIdentityRegEx =
  /^visma-identity:\/\/[a-z]+\?[a-z]+=[\w-]+(&[a-z]+=[\w-]+)?$/g;

module.exports = class VismaIdentity {
  constructor(uri) {
    const res = uri.match(vismaIdentityRegEx);
    if (!res) {
      throw new Error(`Invalid uri = ${uri}`);
    }

    const result = parse(uri, true);

    this.action = result.hostname;
    this.parameters = result.query;

    if (!this.parameters.source) {
      throw new Error(`mandatory parameter source is missing`);
    }

    switch (this.action) {
      case "login":
        break;
      case "confirm":
        if (!this.parameters.paymentnumber) {
          throw new Error(`confirm requires mandatory parameter paymentnumber`);
        }
        break;
      case "sign":
        const documentId = this.parameters.documentid;
        if (!documentId) {
          throw new Error(`sign requires mandatory parameter documentid`);
        }
        if (!UUIDv4.validate(documentId)) {
          throw new Error(`invalid documentid = ${documentId}`);
        }
        console.log();
        break;
      default:
        throw new Error(`Invalid action = ${this.action}`);
    }
  }
};
