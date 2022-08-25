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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Helper {
    static replace(string, search, replace) {
        return string.split(search).join(replace);
        // con la siguiente opción falla cuando se hace value=Helper.replace(value,"\\'","\\''")
        // return string.replace(new RegExp(search, 'g'), replace)
    }
    static clone(obj) {
        return obj && typeof obj === 'object' ? JSON.parse(JSON.stringify(obj)) : obj;
    }
    static cloneOperand(obj) {
        const children = [];
        if (obj.children) {
            for (const k in obj.children) {
                const p = obj.children[k];
                const child = Helper.clone(p);
                children.push(child);
            }
        }
        return new obj.constructor(obj.name, children);
    }
    static isObject(obj) {
        return obj && typeof obj === 'object' && obj.constructor === Object;
    }
    static isEmpty(value) {
        return value === null || value === undefined || value.toString().trim().length === 0;
    }
    static nvl(value, _default) {
        return !this.isEmpty(value) ? value : _default;
    }
    static existsPath(fullPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                fs_1.default.access(fullPath, (err) => {
                    if (err) {
                        resolve(false);
                    }
                    else {
                        resolve(true);
                    }
                });
            });
        });
    }
    static createIfNotExists(sourcePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const fullPath = Helper.resolvePath(sourcePath);
            if (yield Helper.existsPath(fullPath)) {
                return;
            }
            return new Promise((resolve, reject) => {
                fs_1.default.mkdir(fullPath, { recursive: true }, err => err ? reject(err) : resolve());
            });
        });
    }
    static resolvePath(source) {
        const _source = source.trim();
        if (_source.startsWith('.')) {
            return path_1.default.join(process.argv0, source);
        }
        if (_source.startsWith('~')) {
            return _source.replace('~', process.env.HOME);
        }
        return source;
    }
    static readFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const fullPath = Helper.resolvePath(filePath);
            if (!(yield Helper.existsPath(fullPath))) {
                return null;
            }
            return new Promise((resolve, reject) => {
                fs_1.default.readFile(fullPath, (err, data) => err ? reject(err) : resolve(data.toString('utf8')));
            });
        });
    }
    static removeFile(fullPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield Helper.existsPath(fullPath))) {
                return;
            }
            return new Promise((resolve, reject) => {
                fs_1.default.unlink(fullPath, err => err ? reject(err) : resolve());
            });
        });
    }
    static copyFile(src, dest) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield Helper.existsPath(src))) {
                throw new Error(`not exists ${src}`);
            }
            return new Promise((resolve, reject) => {
                fs_1.default.copyFile(src, dest, err => err ? reject(err) : resolve());
            });
        });
    }
    static writeFile(filePath, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const dir = path_1.default.dirname(filePath);
            if (!(yield Helper.existsPath(dir))) {
                yield Helper.mkdir(dir);
            }
            return new Promise((resolve, reject) => {
                fs_1.default.writeFile(filePath, content, { encoding: 'utf8' }, err => err ? reject(err) : resolve());
            });
        });
    }
    static mkdir(fullPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs_1.default.mkdir(fullPath, { recursive: true }, err => err ? reject(err) : resolve());
            });
        });
    }
    static lstat(fullPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs_1.default.lstat(fullPath, (err, stats) => err
                    ? reject(err)
                    : resolve(stats));
            });
        });
    }
    static getEnvironmentVariable(text) {
        const startIndex = text.indexOf('${');
        if (startIndex < 0) {
            return undefined;
        }
        const endIndex = text.indexOf('}', startIndex + 2);
        if (endIndex < 0) {
            throw new Error(`Environment variable not found end character "?" in ${text}`);
        }
        return text.substring(startIndex + 2, endIndex);
    }
    static solveEnvironmentVariables(source) {
        if (typeof source !== 'object') {
            return;
        }
        for (const name in source) {
            const child = source[name];
            if (typeof child === 'string' && child.indexOf('${') >= 0) {
                source[name] = Helper.replaceEnvironmentVariable(child);
            }
            else if (typeof child === 'object') {
                Helper.solveEnvironmentVariables(child);
            }
        }
    }
    static replaceEnvironmentVariable(text) {
        // there can be more than one environment variable in text
        while (text.indexOf('${') >= 0) {
            const environmentVariable = Helper.getEnvironmentVariable(text);
            if (!environmentVariable) {
                continue;
            }
            const environmentVariableValue = process.env[environmentVariable];
            if (environmentVariableValue === undefined || environmentVariableValue === null) {
                text = Helper.replace(text, '${' + environmentVariable + '}', '');
            }
            else {
                const objValue = Helper.tryParse(environmentVariableValue);
                const value = objValue ? JSON.stringify(objValue) : environmentVariableValue;
                text = Helper.replace(text, '${' + environmentVariable + '}', value);
            }
        }
        return text;
    }
    static tryParse(value) {
        try {
            return JSON.parse(value);
        }
        catch (_a) {
            return null;
        }
    }
}
exports.Helper = Helper;
//# sourceMappingURL=helper.js.map