"use strict";

import VismaIdentity from "./visma.identity";

export function cli(args) {
  const params = args.slice(2).join(" ");
  const vi = new VismaIdentity(params);
  console.log("action", vi.action);
  console.log("parameters", vi.parameters);
}
