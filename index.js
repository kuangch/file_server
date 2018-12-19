/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2018/12/19
 * ======================================== */

let process = require('child_process');
let path = require('path')
let os = require('os')
let config = require('./config')

process.exec('npm prefix -g', function (error, stdout, stderror) {

    // 添加全局安装的npm包路径
    const system = os.platform()
    module.paths.push(stdout.replace('\n','') + (system.match(/win(.*?)/) ? '': (path.sep + 'lib')) + path.sep + 'node_modules')

    let colors = require('colors');

    for(const server in config.servers){
        let script = process.exec(`http-server ${config.servers[server].dir} -p ${config.servers[server].port}`);
        script.stdout.on('data',(data)=>{
            console.log(`${data}`);
        })
        script.stderr.on('data',(data)=>{
            console.log(`${data}`.red);
        })
    }
})