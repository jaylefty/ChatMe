/**
 * Created by lefty on 16/10/13.
 */
var sqlResult = function(){};


/**
 * 错误处理
 * @param err
 * @returns {{code: number, message: string, affectedRows: number, resultObj: {}}}
 */
function errHandle(err){
    if(err.errno == 1062){
        return {
            code : -1,
            message : "主键重复,添加失败!",
            affectedRows:0,
            resultObj:{}
        };
    }
    if(err.errno == 1451){
        return {
            code : -2,
            message : "外键关联错误!",
            affectedRows:0,
            resultObj:{}
        };
    }
}

/**
 * 查询成功调用
 * @param data
 * @returns {*}
 */
function affectNo(data){
    if(typeof data.affectedRows != "undefined"){
        if(data.affectedRows == 0){
            return {
                code : 1,
                message : "0行受到影响",
                affectedRows:0,
                resultObj:data
            };
        } else if(data.affectedRows == 1){
            return {
                code : 0,
                message : "1行受到影响",
                affectedRows:1,
                resultObj:data
            };
        }else{
            return {
                code : 0,
                message : data.affectedRows+"行受到影响",
                affectedRows:data.affectedRows,
                resultObj:data
            };
        }
    }else{
        return {
            code : 0,
            message : "",
            affectedRows:data.length,
            resultObj:data.length == 1?data[0]:data
        };
    }
}

sqlResult.prototype.isErr = function(err){
    return errHandle(err);
}

sqlResult.prototype.exeSuccess = function(data){
    return affectNo(data);
}


module.exports = sqlResult;