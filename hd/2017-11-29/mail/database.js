var mysql = require("mysql");

var options = {
    host: "localhost",
    user: "root",
    password: "hd7502002",
    database: "mail"
}

function DatabaseManage() {
    this.con = mysql.createConnection(options);
    this.con.connect();
}

//数据库查询
DatabaseManage.prototype.get = function (table, json, callback) {
    var sql = 'select * from ' + table + " where ";
    for (var key in json) {
        sql = sql + key + "=" + "'" + json[key] + "'" + " and ";
    }
    sql = sql.substring(0, sql.length - 4);
    sql = sql + ";";

    this.con.query(sql,(err,result)=>{
        callback(err,result);
    })
}

//数据库添加
DatabaseManage.prototype.add = function (table, json, callback) {
    //字符串拼接
    var sql = "insert into " + table + " (";
    for (var key in json) {
        sql = sql + key + ",";
    }
    sql = sql.substring(0, sql.length - 1);
    sql = sql + ") values("
    for (var key in json) {
        sql = sql + "'" + json[key] + "',";
    }
    sql = sql.substring(0, sql.length - 1);
    sql = sql + ");";

    this.con.query(sql,(err, result)=> {
        callback(err, result);
    })

}

module.exports = DatabaseManage;