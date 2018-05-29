var wxkey = {
    "appid":"wx9be3bbf4ab113f27",
    "secret":"7d238c9deae38221b23fe855021e107c",
}
var db = {
    "username": "root",
    "password": "123456",
    "database": "bookms",
    "host": "localhost",
    "dialect": "mysql"
}
var template = {
    //图书可取提醒
    "template_id1" :"YQhz9IvhGLaYl9Tk96rgysFioELOBkFxOrchCrjqdVE",
    //图书借阅提醒
    "template_id2" :"LGVI1P5vjEi-Xw5HyMn25SqnQXtkO-ojk_l4fUOAUfI",
    "starttime" : 0,
    "expires_in" : 7200,
    "access_token" :null,
}
module.exports = {
    wxkey,
    db,
    template,
};