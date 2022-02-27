export interface Action {
    execute(): void;
}
export declare class LoginAction implements Action {
    source: string;
    constructor(source: string);
    execute(): void;
}
export declare class ConfirmAction implements Action {
    source: string;
    paymentNumber: string;
    constructor(source: string, paymentNumber: string);
    execute(): void;
}
export declare class SignAction implements Action {
    source: string;
    documentId: string;
    constructor(source: string, documentId: string);
    execute(): void;
}
export declare const VismaIdentityBuilder: (uri: string) => Action;
//# sourceMappingURL=visma.identity.d.ts.map