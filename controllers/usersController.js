const db = require('../db_connection')
const userRepository = require("../models/userRepository")
const userController = {}

userController.signup = async (username, password) => {
    try{
        await userRepository.addUser({username: username, password: password})
    } catch (e) {
        return {ok: false, msg: "用户名不可用"}
    }

    return {ok: true, msg: "欢迎"}
}

userController.login = async (username, password) => {
    const ret = await userRepository.getByUsernameAndPassword(username, password)
    if(ret.length) {
        let a = Object.assign({} ,ret[0])
        delete a.password
        return a
    }
    return undefined
}

module.exports = userController