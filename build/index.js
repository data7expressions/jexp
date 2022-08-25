#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const js_expressions_1 = require("js-expressions");
const helper_1 = require("./helper");
const readFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield helper_1.Helper.readFile(file);
    if (!content) {
        throw Error(`can not read file ${file}`);
    }
    const context = helper_1.Helper.tryParse(content);
    if (context === null || content === undefined) {
        throw Error(`can not parse content of file ${file}`);
    }
    return context;
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (process.argv.length !== 4) {
                console.error(`Error: 2 arguments were expected and 3 came ${process.argv.length - 2}`);
            }
            const execPath = process.argv[0];
            const currenPath = process.argv[1];
            const expression = process.argv[2];
            const source = process.argv[3];
            const data = yield readFile(source);
            const result = js_expressions_1.expressions.eval(expression, { _: data });
            console.log(result);
        }
        catch (error) {
            console.error(error.stack);
        }
    });
}
exports.run = run;
run();
//# sourceMappingURL=index.js.map