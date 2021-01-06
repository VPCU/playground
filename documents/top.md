# 用户注册页

## GET /signup

## POST /signup

    username

    password

返回注册成功界面 views/signupResult.pug

## views/signup.pug

    username

    password

## routes/users.js

## controllers/usersController.js

    signup(username, password)
    {ok: false, msg: ''}

## models/userRepository.js

    UserRepository.existsByUsername(username)
    true false

    UserRepository.addUser({username, password})

对应的数据表：

    users
        id
        username
        password

# 用户登录页

## GET /login

## POST /login

用户登录后，设置session：

    session.userId = userid

## views/layout.pug

用户登陆后，传入变量：

    username

## middleware

通过中间件userValidation验证用户是否需要登录

# 用户个人信息编辑

## GET /editinfo

## 修改密码
### views/changeUserInfo.pug

跳转到 POST /changpassword

### POST /changpassword

    password

## 标签

数据表

    user_like_tag
        uid
        tid

    tags
        id
        name
        

### views/changeUserInfo.pug

    likes: ['tag', 'tag']

展示喜欢标签

- 删除喜欢的标签 GET /unliketag/{tagname}

展示所有标签

- 添加喜欢的标签 GET /liketag/{tagname}

### controllers/usersController.js

    addTag(uid, tagname)
    boolean

    removeTag(uid, tagname)
    boolean

### models/userRepository.js
    UserHasTag(uid, tid) : boolean
    UserAddTag(uid, tid)
    UserRemoveTag(uid, tid)

### POST /liketag/{tagname}
    redirect to prev page

### POST /unliketag/{tagname}
    redirect to prev page


# 首页

## GET /

## views/index.pug

    contents: [{head: '推荐', books:[{name: '书名', img:'1.png', author:'作者', price:'11.2', summary:''}]}]

- 书籍随机推荐
 
- 用户喜欢的标签的书籍推荐

## controllers/indexController.js

    getIndexContents(uid)

## controllers/bookController.js

    getRecommends(uid)
        [{id: '1', name: '书名', img:'1.png', author:'作者', price:'11.2', summary:''}]
    getRecommendsByTag(uid, tag)
        [{id: '1', name: '书名', img:'1.png', author:'作者', price:'11.2', summary:''}]

## views/layout.pug

- 搜索功能

数据表
    
    books
        id
        name
        price
        author
        img
        summary

    book_has_tag
        bid
        tid

## models/bookRepository.js

    getBookById()

    getBookSummaryById()
    {name: '书名', img:'1.png', author:'作者', price:'11.2', summary:''}
    

# 书籍详情

数据表

    reviews
        id
        bid
        author
        content

    comments
        id
        bid
        uid
        content

## GET /books/{id}

## views books.pug

    book: {name: '书名', img:'1.png', author:'作者', price:'11.2'}  
    reviews: [author:'', summary:'', content:'']
    comments:[{username:'', content:''}]
    recommends:[{id: '1', name: '书名', img:'', author:'作者', price:'11.2', summary:''}]

相似图书推荐
评论
提交评论

### controllers/recommendController.js
    getRecommendsByBook(uid, bid)

### POST /books/id/newreview
提交新评论
    
    redirect to prev page

## controllers/bookController.js

    getBookById(bid)
    getCommendsByBookId(bid)

# 搜索结果

## GET /search?keyword={keyword}

返回书籍列表
    
    [{name: '书名', img:'1.png', author:'作者', price:'11.2'}]

## controllers/bookController.js

    searchBooks(keyword)
    [{name: '书名', img:'1.png', author:'作者', price:'11.2'}]

## views/searchResult.pug

    result:[{name: '书名', img:'1.png', author:'作者', price:'11.2'}]

# 分类浏览书籍

## GET /category/{category}

## views/category.pug

# 管理员添加管理书籍

## GET /admin/addbooks

## GET /admin/booksadded/id

## GET /admin/books/addtag/id/tag

## GET /admin/books/removetag/id/tag

## POST /admin/books/addreview/id

## GET /admin/settings

## addBooks.pug

    name, price, author, img, url, summary

## POST /admin/addbooks

## POST /admin/addTag

## GET /admin/editbooks/{id}