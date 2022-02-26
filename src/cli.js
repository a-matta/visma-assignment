"use strict";

import VismaIdentity from "./visma.identity";

export function cli(args) {
  console.log(args);
  const vi = new VismaIdentity("visma-identity://login?source=severa");
  console.log("action", vi.action);
  console.log("parameters", vi.parameters);
}
