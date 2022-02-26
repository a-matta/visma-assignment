"use strict";

const vismaIdentity = require("../src/visma.identity");

describe("Visma Identity construction", () => {
  test("invalid uri gives error", () => {
    const uri = "http://abc.com";
    expect(() => new vismaIdentity(uri)).toThrow(`Invalid uri = ${uri}`);
  });

  test("invalid action gives error", () => {
    const uri = "visma-identity://hello?source=b";
    expect(() => new vismaIdentity(uri)).toThrow(`Invalid action = hello`);
  });

  test("missing source parameter on login gives error", () => {
    const uri = "visma-identity://login?sourc=ab";
    expect(() => new vismaIdentity(uri)).toThrow(
      `mandatory parameter source is missing`
    );
  });

  test("missing source parameter on confirm gives error", () => {
    const uri = "visma-identity://confirm?sourc=netvisor&paymentnumber=11111";
    expect(() => new vismaIdentity(uri)).toThrow(
      `mandatory parameter source is missing`
    );
  });

  test("missing payment parameter on confirm gives error", () => {
    const uri = "visma-identity://confirm?source=netvisor&paymentnumbe=33334";
    expect(() => new vismaIdentity(uri)).toThrow(
      `confirm requires mandatory parameter paymentnumber`
    );
  });
  test("missing documentid parameter on sign gives error", () => {
    const uri =
      "visma-identity://sign?source=vismasign&documenti=47ed9186-2ba0-4e8b-b9e2-7123575fdd5b";
    expect(() => new vismaIdentity(uri)).toThrow(
      `sign requires mandatory parameter documentid`
    );
  });

  test("missing source parameter on sign gives error", () => {
    const uri =
      "visma-identity://sign?sourc=vismasign&documentid=47ed9186-2ba0-4e8b-b9e2-7123575fdd5b";
    expect(() => new vismaIdentity(uri)).toThrow(
      `mandatory parameter source is missing`
    );
  });
});
