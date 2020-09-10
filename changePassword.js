"use strict"
/***
 * 修改密码
 */
const valideKey = require('./valideKey');

function ChangePassword(){

}

ChangePassword.prototype.changePassword = function*(ctx){
     var errCodeDo = function(errcode,ctx){
        ctx.body.success = false;
        switch(errcode){
            case -1:
                ctx.body.msg = "原密码错误";
                break;
            case -2:
                ctx.body.msg = "默认数据库错误";
                break;
            default:
                ctx.body.msg = "默认错误";
        }
    }

    let msg = ctx.msg;
    let id = msg.id;
    let oldPassword = msg.oldPassword;
    let newPassword = msg.newPassword;
    let ip = msg.ip;
    let sql = `CALL gm_changePassword(${id},'${oldPassword}','${newPassword}','${ip}')`;
    let result = yield valideKey.dataBase(sql,ctx);
    if(result[0][0]==null){
        ctx.body.success = false;
        ctx.body.msg = '错误';
    }else{
        if(result[0][0][0].ERRCODE == 0){
            ctx.body.success = true;
        }else{
            errCodeDo(result[0][0][0].ERRCODE,ctx);
        }
    }
    return;
}


module.exports = new ChangePassword();