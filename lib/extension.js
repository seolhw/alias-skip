import * as vscode from 'vscode';
import { screeningPath, rootPath, joiningSuffix, screeningRelativePath } from './utils';
const path = require('path');
const activate = function (context) {
    const hoverHander = vscode.languages.registerDefinitionProvider([
        { scheme: 'file', language: 'vue' },
        { scheme: 'file', language: 'javascript' },
        { scheme: 'file', language: 'typescript' },
        { scheme: 'file', language: 'javascriptreact' }
    ], {
        provideDefinition(document, position, token) {
            const fileName = document.fileName; // 当前文件的绝对路径加文件名
            const workDir = path.dirname(fileName); // 当前文件的绝对路径
            const linetext = document.lineAt(position).text; // 当前行字符串
            const q = screeningPath(linetext); // 路由别名目标路径
            const z = rootPath(workDir, context); // 项目根目录
            const u = screeningRelativePath(linetext); // 相对路径的目标路径
            let targetPath = ''; // 要跳转的目标路径
            if (q && z) {
                targetPath = path.resolve(z, q);
            }
            else if (u) {
                targetPath = path.resolve(workDir, u);
            }
            const k = joiningSuffix(targetPath); // 文件存在就返回目标文件，不存在就返回空字符串
            if (!k)
                return;
            return new vscode.Location(vscode.Uri.file(k), new vscode.Position(0, 0));
        }
    });
    context.subscriptions.push(hoverHander);
};
const deactivate = function () {
};
export { activate, deactivate };
