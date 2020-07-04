
const router = require('koa-router')(),
fs= require('fs')

// 路由中间件
// router.use(async(ctx,next)=>{
//     if(ctx.session.uname=='tianzi'){
//         next()
//     }else{
//         ctx.redirect('/')
//     }
// })

router.get('/',ctx =>{
    ctx.render('home')
})

router.post('/homeDoAsync',ctx =>{
    
    // 接收表单数据
    let {productname,price} =ctx.request.body;
    // 接收文件
    let file =ctx.request.files[0]
    
    console.log(productname,price, file)

    // // 上传文件
    // let uploadDir = 'upload'
    //     // 没有就创建目录
    // if(!fs.existsSync(uploadDir)){
    //     fs.mkdirSync(uploadDir)
    // }
    //     // 使用管道流文件上传
    // // 新文件命名(时间+随机数+扩展名)
    // let date_ = new Date()
    // let dateTime =date_.getTime()
    // let rand_ = parseInt(Math.random()*100)
    // let fn = file.name.split('.')

    // let extension_ =fn[fn.length-1]

    // // 新方件名
    // let newFileName = dateTime + rand_ + '.'+extension_

    // // console.log(newFileName)
    
    // let readStream_ =fs.createReadStream(file.path)
    // // let writeStream_ = fs.createWriteStream(uploadDir+'/'+file[i].name)
    // let writeStream_ = fs.createWriteStream(uploadDir+'/'+newFileName)
    // readStream_.pipe(writeStream_)

    ctx.body = 'xxx'
})

module.exports = router.routes()