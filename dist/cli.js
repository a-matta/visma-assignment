"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const visma_identity_1 = require("./visma.identity");
function main() {
    const params = process.argv.slice(2).join(" ");
    const action = (0, visma_identity_1.VismaIdentityBuilder)(params);
    action.execute();
}
main();
//# sourceMappingURL=cli.js.map