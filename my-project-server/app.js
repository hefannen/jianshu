const express=require("express")
const pool=require("./pool")
// 加载跨域模块
const cors=require("cors")

// 创建express对象
var app=express()

// 指定静态目录
app.use(express.static(__dirname+"/public"))

// 配置允许访问的程序与端口
app.use(cors({origin:["http://127.0.0.1:3000/","http://localhost:3000","http://localhost:8080"],credentials:true}))


// 绑定监听端口
app.listen(3000)


// 首页的主要内容数据
app.get("/index",(req,res)=>{
    var obj={}
    var sql="select * from jianshu_index"
    pool.query(sql,(err,result)=>{
        if(err) throw err
        obj.data=result
        res.send(obj)
    })
})


// 首页头部标签
app.get("/tag",(req,res)=>{
    var obj={}
    var sql="select * from jianshu_tag"
    pool.query(sql,(err,result)=>{
        if(err) throw err
        obj.data=result
        res.send(obj)
    })
})


// 对应标签页的简介数据
app.get("/tagTitle",(req,res)=>{
    var obj={}
    var id=req.query.tid
    var sql="select * from jianshu_tag where tid=?"
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err
        obj=result
        res.send(obj)
    })
})


// 对应标签下的文章
app.get("/indexTitle",(req,res)=>{
    var obj={}
    var id=req.query.tid
    var sql="select * from jianshu_index where tid=?"
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err
        obj=result
        res.send(obj)
    })
})


// 登录
app.get("/login",(req,res)=>{
    var uname=req.query.uname
    var upwd=req.query.upwd
    var sql="select uid from jianshu_user where uname=? and upwd=?"
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err) throw err
        if(result.length>0){
            var uid=result[0].uid
            var obj={code:1,msg:"登录成功",id:uid}
        }else{
            var obj={code:0,msg:"登录失败"}
        }
        res.send(obj)
    })
})

// 注册
app.get("/register",(req,res)=>{
    var uname=req.query.uname
    var phone=req.query.phone
    var upwd=req.query.upwd
    var sql="select uid from jianshu_user where uname=?"
    pool.query(sql,[uname],(err,result)=>{
        if(err) throw err
        if(result.length>0){
            var obj={code:0,msg:"用户名已存在"}
            res.send(obj)
            return
        }else{
            var sql="insert into jianshu_user (uname,phone,upwd) values (?,?,?)"
            pool.query(sql,[uname,phone,upwd],(err,result)=>{
                if(result.affectedRows==1){
                    var obj={code:1,msg:"注册成功"}
                }else{
                    var obj={code:0,msg:"注册失败"}
                }
                res.send(obj)
            })
        }
    })
})

// 用户中心对应的用户信息
app.get("/user",(req,res)=>{
    var uid=req.query.uid
    var obj={}
    var sql="select * from jianshu_user where uid=?"
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err
        obj=result
        res.send(obj)
    })
})

// 用户所写的文章
app.get("/wenzhang",(req,res)=>{
    var uid=req.query.uid
    var obj={}
    var sql="select * from jianshu_index where uid=?"
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err
        obj=result
        res.send(obj)
    })
})