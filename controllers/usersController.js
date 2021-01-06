const db = require('../db_connection')
const userRepository = require("../models/userRepository")
const userController = {}
const tagRepository  = require("../models/tagRepository")

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

userController.changePassword = async (id, password) => {
    await userRepository.updatePasswordById(id, password)
    return {ok: true}
}

userController.likeTag = async (id, tid) => {
    if(!await userRepository.userHasTag(id, tid))
        await userRepository.userAddTag(id, tid)
}

userController.dislikeTag = async (id, tid) => {
    if(await userRepository.userHasTag(id, tid))
        await userRepository.userRemoveTag(id, tid)
}

userController.getTags = async (id) => {
    return Object.assign([] ,(await userRepository.getTagsById(id)))
}

userController.getTagsStatus = async (id) => {
    const tags = await tagRepository.getAll()
    const tagsLiked = await userController.getTags(id)
    const t = {}
    tagsLiked.forEach( tag => {
        t[tag.id] = true
    })
    tags.forEach(tag => {
        tag.like = tag.id in t
    });
    return tags
}

userController.userLikeBook = async (userId, bookId) => {
    return userRepository.userLikeBook(userId, bookId)
}

userController.userDislikeBook = async (userId, bookId) => {
    return userRepository.userDislikeBook(userId, bookId)
}

userController.userClickBook = async (userId, bookId) => {
    return userRepository.userClickBook(userId, bookId)
}

module.exports = userController