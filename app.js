const { setegid } = require('process');

// 引入模块
const Koa = require('koa'),
    router = require('koa-router')(),
    render = require('koa-art-template'),
    path =require('path'),
    koaBody = require('koa-body'),
    static = require('koa-static'),
    session = require('koa-session'),
    Index = require('./router/home')

// 实例化
const app = new Koa()

// 模版
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

// 静态资源
app.use(static('statics'))

// koa-body
app.use(koaBody({
    multipart:true
}))

// session
app.keys = ['some secret hurr'];
 
const CONFIG = {
  key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  secure: false, /** (boolean) secure cookie*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};
 
app.use(session(CONFIG, app));


// 路由
router.get('/',ctx =>{
    ctx.render('login')
})


// 表单异步接收
router.post('/loginDoAsync',ctx=>{

    // 后台获取输入的用户名和密码
    let {uname,upassword}=ctx.request.body

    let res
    
    if(uname=='tianzi'&&upassword==123456){

        // 用户名密码加入session缓存中
        ctx.session.uname =uname
        ctx.session.upassword =upassword
        
        res =true

    }else{
        res =false
    }

    ctx.body ={res}

})

// 路由中间件
router.use(async(ctx,next)=>{
    if(ctx.session.uname=='tianzi'){
        next()
    }else{
        ctx.redirect('/')
    }
})

router.use('/home',Index)

// 路由中间件，一定要放到最后，配置下的最后
app.use(router.routes())
    .use(router.allowedMethods())

// 服务器监听
app.listen(2000,()=>{
    console.log('*localhost:2000')
})