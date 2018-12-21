<template>
    <div class="sign">
        <div class="login">
            <h3>用户注册</h3>
        </div>
        <form>
            <div class="input-wrap">
                <span class="mui-icon mui-icon-contact"></span>
                <input type="text" placeholder="您的用户名" v-model="uname">
            </div>
            <div class="input-wrap">
                <span class="mui-icon-extra mui-icon-extra-phone"></span>
                <input type="number" placeholder="您的手机号" v-model="phone">
            </div>
            <div class="input-wrap">
                <span class="mui-icon mui-icon-locked"></span>
                <input type="password" placeholder="您的密码" v-model="upwd">
            </div>
            <button type="button" @click="handleReg">注册</button>
        </form>
    </div>
</template>

<style>
</style>
<script>
    import {Toast} from "mint-ui"
    export default{
        data(){
            return {
                uname:"",
                phone:"",
                upwd:""
            }
        },
        methods:{
            handleReg(){
                var uname=this.uname
                var phone=this.phone
                var upwd=this.upwd
                var reg1=/^[a-zA-Z0-9]{6,18}$/
                var reg2=/^1[34578]\d{9}$/
                if(!uname){
                    Toast("用户名不能为空")
                }else if(!(reg1.test(uname))){
                    Toast("用户名至少有六位数字或字母")
                }else if(!(reg2.test(phone))){
                    Toast("请输入正确的手机号码")
                }else if(!upwd){
                    Toast("密码不能为空")
                }else if(!(reg1.test(upwd))){
                    Toast("密码不能少于六位数字或字母")
                }else{
                    this.$http.get("register?uname="+uname+"&phone="+phone+"&upwd="+upwd).then(result=>{
                        if(result.body.code){
                            Toast(result.body.msg)
                            setTimeout(()=>{this.$router.go(-1)},1500)
                        }else{
                            Toast(result.body.msg)
                        }
                    })
                }
            }
        }
    }
</script>