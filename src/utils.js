const fs = require('fs')
const path = require('path')
/**
 * 从文本中过滤出路径
 * @param {string} linetext 包含路径的字符串
 * @returns 目标路径
 */
const screeningPath = function (linetext){
    let arr = linetext.match(/('@.+')|("@.+")/) // 正则匹配
    let text = ''
    if(arr){
        text = arr[0].substring(3,arr[0].length-1)
    }
    return text
}
/**
 * 通过当前文件的绝对路径解析出包含src的base路径
 * @param {*} presentPath 当前文件路径
 * @returns 包含src的base路径
 */
const rootPath = function (presentPath){
    let srcarr = presentPath.match(/^.+src\\/)
    let baseSrc = ''
    if(srcarr){
        baseSrc = srcarr[0]
    }
    return baseSrc
}
/**
 * 通过目标的路径拼接后缀并验证该文件存在
 * @param {*} targetPath 目标路径
 * @returns 拼接上后缀名并返回
 */
const joiningSuffix = function (targetPath){
    const extname = path.extname(targetPath)
    if(!extname){
        if(fs.existsSync(`${targetPath}.vue`)){
            return `${targetPath}.vue`
        }else if(fs.existsSync(`${targetPath}.js`)){
            return `${targetPath}.js`
        }else{
            console.log('5555')
            return ''
        }
    }
    return targetPath
}
/**
 * 从文本中过滤出相对路径
 * @param {string} linetext 包含路径的字符串
 * @returns 目标路径的相对路径
 */
const screeningRelativePath = function (linetext){
    let arr = linetext.match(/('\..+')|("\.+")/) // 正则匹配
    let text = ''
    if(arr){
        text = arr[0].substring(1,arr[0].length-1)
    }
    return text
}
module.exports = {
    screeningPath,
    rootPath,
    joiningSuffix,
    screeningRelativePath
}