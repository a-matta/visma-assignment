import { VismaIdentityBuilder } from "./visma.identity";

function main() {
  const params = process.argv.slice(2).join(" ");
  const action = VismaIdentityBuilder(params);
  action.execute();
}

main();
