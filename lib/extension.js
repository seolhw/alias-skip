"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __importStar(require("vscode"));
const utils_1 = require("./utils");
const path = require('path');
const activate = function (context) {
    const hoverHander = vscode.languages.registerDefinitionProvider([
        { scheme: 'file', language: 'vue' },
        { scheme: 'file', language: 'scss' },
        { scheme: 'file', language: 'css' },
        { scheme: 'file', language: 'less' },
        { scheme: 'file', language: 'javascript' },
        { scheme: 'file', language: 'typescript' },
        { scheme: 'file', language: 'javascriptreact' }
    ], {
        provideDefinition(document, position, token) {
            const fileName = document.fileName; // 当前文件的绝对路径加文件名
            const workDir = path.dirname(fileName); // 当前文件的绝对路径
            const linetext = document.lineAt(position).text; // 当前行字符串
            const q = utils_1.screeningPath(linetext, position); // 路由别名目标路径
            const z = utils_1.rootPath(workDir, context); // 项目根目录
            const u = utils_1.screeningRelativePath(linetext, position); // 相对路径的目标路径
            let targetPath = ''; // 要跳转的目标路径
            let isPathInterior = false;
            let target = q;
            if (q && z) {
                targetPath = path.resolve(z, q.path);
                isPathInterior = position.character >= q.columns[0] && position.character <= q.columns[1];
            }
            else if (u) {
                targetPath = path.resolve(workDir, u.text);
                isPathInterior = position.character >= u.columns[0] && position.character <= u.columns[1];
                target = u;
            }
            const k = utils_1.joiningSuffix(targetPath); // 文件存在就返回目标文件，不存在就返回空字符串
            if (!k || !isPathInterior)
                return;
            return [
                {
                    originSelectionRange: target.rang,
                    targetRange: new vscode.Range(0, 0, 0, 0),
                    // targetSelectionRange: new vscode.Range(0,0,0,10),
                    targetUri: vscode.Uri.file(k)
                }
            ];
        },
    });
    context.subscriptions.push(hoverHander);
};
exports.activate = activate;
const deactivate = function () {
};
exports.deactivate = deactivate;
