"use strict";

import {
  VismaIdentityBuilder,
  LoginAction,
  ConfirmAction,
  SignAction,
} from "../src/visma.identity";

describe("Visma Identity invalid construction", () => {
  test("invalid uri", () => {
    const uri = "http://abc.com";
    expect(() => VismaIdentityBuilder(uri)).toThrow(`Invalid uri = '${uri}'`);
  });

  test("invalid action", () => {
    const uri = "visma-identity://hello?source=b";
    expect(() => VismaIdentityBuilder(uri)).toThrow(`Invalid action = hello`);
  });

  test("login action & missing source parameter", () => {
    const uri = "visma-identity://login?sourc=ab";
    expect(() => VismaIdentityBuilder(uri)).toThrow(
      `mandatory parameter source is missing`
    );
  });

  test("confirm action & missing source parameter", () => {
    const uri = "visma-identity://confirm?sourc=netvisor&paymentnumber=11111";
    expect(() => VismaIdentityBuilder(uri)).toThrow(
      `mandatory parameter source is missing`
    );
  });

  test("confirm action & missing payment parameter", () => {
    const uri = "visma-identity://confirm?source=netvisor&paymentnumbe=33334";
    expect(() => VismaIdentityBuilder(uri)).toThrow(
      `confirm requires mandatory parameter paymentnumber`
    );
  });
  test("sign action & missing documentid parameter", () => {
    const uri =
      "visma-identity://sign?source=vismasign&documenti=47ed9186-2ba0-4e8b-b9e2-7123575fdd5b";
    expect(() => VismaIdentityBuilder(uri)).toThrow(
      `sign requires mandatory parameter documentid`
    );
  });

  test("sign action & missing source parameter", () => {
    const uri =
      "visma-identity://sign?sourc=vismasign&documentid=47ed9186-2ba0-4e8b-b9e2-7123575fdd5b";
    expect(() => VismaIdentityBuilder(uri)).toThrow(
      `mandatory parameter source is missing`
    );
  });

  test("sign action & missing uuid in documentid", () => {
    const uri =
      "visma-identity://sign?source=vismasign&documentid=47ed9186-2ba0-4e8b-b9e2";
    expect(() => VismaIdentityBuilder(uri)).toThrow(
      `invalid documentid = 47ed9186-2ba0-4e8b-b9e2`
    );
  });
});

describe("Visma Identity successful cases", () => {
  test("Login Action", () => {
    const uri = "visma-identity://login?source=demo";
    const action = VismaIdentityBuilder(uri);
    expect(action).toBeInstanceOf(LoginAction);
  });

  test("Confirm Action", () => {
    const uri = "visma-identity://confirm?source=netvisor&paymentnumber=33334";
    const action = VismaIdentityBuilder(uri);
    expect(action).toBeInstanceOf(ConfirmAction);
  });

  test("Sign Action", () => {
    const uri =
      "visma-identity://sign?source=vismasign&documentid=47ed9186-2ba0-4e8b-b9e2-7123575fdd5b";
    const action = VismaIdentityBuilder(uri);
    expect(action).toBeInstanceOf(SignAction);
  });
});
