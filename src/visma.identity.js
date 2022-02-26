"use strict";

const parse = require("url-parse");

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
        if (!this.parameters.documentid) {
          throw new Error(`sign requires mandatory parameter documentid`);
        }
        break;
      default:
        throw new Error(`Invalid action = ${this.action}`);
    }
  }
};
