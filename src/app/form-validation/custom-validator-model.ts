export class CustomValidator {
    pattern: RegExp;
    msg: string;

    constructor({ pattern, msg }: { pattern?: RegExp; msg?: string; } = {}) {
        this.pattern = pattern;
        this.msg = msg;
    }

}
