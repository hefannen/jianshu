<template>
    <div class="sign">
        <div class="login">
            <h3>登录简书</h3>
        </div>
        <form>
            <div class="input-wrap">
                <span class="mui-icon mui-icon-contact"></span>
                <input type="text" placeholder="用户名" v-model="uname">
            </div>
            <div class="input-wrap">
                <span class="mui-icon mui-icon-locked"></span>
                <input type="password" placeholder="密码" v-model="upwd">
            </div>
            <button @click="login" type="button">登录</button>
        </form>
        <div class="zhuce">
            <span>忘记密码？</span>
            <span @click="handleRegister">立即注册</span>
        </div>
        <div class="more-sign">
            <h6>社交账号直接登录</h6>
            <ul>
                <li><span class="mui-icon mui-icon-weixin"></span></li>
                <li><span class="mui-icon mui-icon-weibo"></span></li>
                <li><span class="mui-icon mui-icon-qq"></span></li>
            </ul>
        </div>
    </div>
</template>
<style>
    .login{
        text-align: center;
    }
    .login h3{
        margin-top:15%;
        font-size:16px;
        color:#333;
    }
    .sign form{
        margin-top:10px;
    }
    .sign form .input-wrap{
        position:relative;
        width:100%;
        border-bottom:2px solid #c8c8c8;
        color:#c8c8c8;
    }
    .sign form .input-wrap span{
        position:absolute;
        top:8px;
        font-size:18px !important;
        color:#969696;
    }
    
    input{  
        background:none;  
        outline:none !important;  
        border:0px !important;
        margin-bottom:0 !important;
    } 
    .sign form .input-wrap input{
        width:100%;
        height:40px;
        padding:2px 12px 4px 30px;
        background-color: transparent;
        font-size:14px;
        color:#333;
    }
    .sign form button{
        margin-top:25px;
        padding:12px 0;
        width:100%;
        color:#fff;
        background-color:#3194d0;
        border-radius:4px;
        font-size:16px;
        height:50px;
    }
    .sign .zhuce{
        margin-top:10px;
        font-size:12px;
    }
    .sign .zhuce span:first-child{
        float:left;
    }
    .sign .zhuce span:last-child{
        float:right;
    }
    .sign .more-sign{
        margin-top:60px;
        text-align:center;
    }
    .sign .more-sign h6{
        position:relative;
        margin-bottom:10px;
        font-size:12px;
        color:#b5b5b5;
    }
    .sign .more-sign h6::before{
        content:"";
        border-top:1px solid #b5b5b5;
        display:block;
        position:absolute;
        width:15%;
        top:8px;
        left:50px;
    }
    .sign .more-sign h6::after{
        content:"";
        border-top:1px solid #b5b5b5;
        display:block;
        position:absolute;
        width:15%;
        top:8px;
        right:50px;
    }
    .sign .more-sign ul{
        margin-bottom:30px;
        padding:0;
        list-style:none;
    }
    .sign .more-sign ul li{
        margin:0 8px;
        display:inline-block;
    }
</style>

<script>
    import {Toast} from "mint-ui"
    export default{
        data(){
            return {
                uname:"",
                upwd:""
            }
        },
        methods:{
            login(){
                var uname=this.uname
                var upwd=this.upwd
                console.log(upwd,uname)
                var reg1=/^[a-zA-Z0-9]{6,}$/
                if(!uname){
                    Toast("用户名不能为空")
                }else if(!(reg1.test(uname))){
                    Toast("用户名不少于六位数字或字母")
                }else if(!upwd){
                    Toast("密码不能为空")
                }else if(!(reg1.test(upwd))){
                    Toast("密码不能少于六位数字或字母")
                }else{
                    this.$http.get("login?uname="+uname+"&upwd="+upwd).then(result=>{
                        if(result.body.code){
                            var uid=result.body.id
                            Toast("登录成功")
                            localStorage.setItem("uid",uid)
                            setTimeout(()=>{this.$router.go(-1)},1500)
                        }else{
                            Toast("用户名或密码错误")
                        }
                    })
                }
            },
            handleRegister(){
                this.$router.push("/register")
            }
        }
    }
</script>