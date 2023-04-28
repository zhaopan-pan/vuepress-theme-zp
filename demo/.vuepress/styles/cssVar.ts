import fs from 'fs'
import path from 'path'

/**
 * 读取css变量
 */
const cssStr = fs.readFileSync(path.resolve(__dirname, './var.css')).toString()

export default cssStr
