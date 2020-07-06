const router = require('koa-router')()


router.get('/',ctx =>{
    console.log('member地址')
})

router.get('/login',ctx =>{
    ctx.render('login')
})

// 表单异步接收
router.post('/loginDoAsync',ctx=>{

    // 后台获取输入的用户名和密码
    let {uname,upassword}=ctx.request.body
    
    if(uname=='tianzi'&&upassword==123456){

        // 用户名密码加入session缓存中
        ctx.session.admin =uname

        // 跳转到后台管理首页
        // ctx.redirect('../admin')
        ctx.body = 'success'

    }else{
        ctx.body = 'fail'
    }

})
module.exports = router.routes()