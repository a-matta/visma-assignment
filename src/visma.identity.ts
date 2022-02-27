import { UUIDv4 } from "uuid-v4-validator";

export interface Action {
  execute(): void;
}

export class LoginAction implements Action {
  source: string;

  constructor(source: string) {
    this.source = source;
  }

  execute() {
    console.log(`Executing LoginAction with source=${this.source}`);
  }
}

export class ConfirmAction implements Action {
  source: string;
  paymentNumber: string;

  constructor(source: string, paymentNumber: string) {
    this.source = source;
    this.paymentNumber = paymentNumber;
  }

  execute() {
    console.log(
      `Executing ConfirmAction with source=${this.source} & paymentNumber=${this.paymentNumber}`
    );
  }
}

export class SignAction implements Action {
  source: string;
  documentId: string;

  constructor(source: string, documentId: string) {
    this.source = source;
    this.documentId = documentId;
    if (!UUIDv4.validate(documentId)) {
      throw new Error(`invalid documentid = ${documentId}`);
    }
  }

  execute() {
    console.log(
      `Executing ConfirmAction with source=${this.source} & documentId=${this.documentId}`
    );
  }
}

export const VismaIdentityBuilder = (uri: string): Action => {
  const vismaIdentityRegEx =
    /^visma-identity:\/\/[a-z]+\?[a-z]+=[\w-]+(&[a-z]+=[\w-]+)?$/g;

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
