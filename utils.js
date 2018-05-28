var conf = require('./configure');
var https = require('https');

async function getAccess_token() {
    const option = {
        hostname: 'api.weixin.qq.com',
        path: '/cgi-bin/token?appid='+conf.wxkey.appid+'&secret='+conf.wxkey.secret
        +'&grant_type=client_credential',
        method: 'GET'
    };
    await new Promise(function (resolve,reject){
        https.request(option,response =>{
            response.setEncoding('utf8');
            let content ='';
            response.on('data',body =>{
                content += body;
            }).on("end", function () {
                content = JSON.parse(content)
                conf.template.access_token = content.access_token;
                conf.template.expires_in = content.expires_in;
                // console.log('access_token',access_token);
                resolve("象征意义的表示成功")
                conf.template.starttime = new Date().getTime()
            });
        }).on('error', function (e) {
            console.log(" error: " + e.message);
        }).end();
    })
}
module.exports={
    getAccess_token,
}