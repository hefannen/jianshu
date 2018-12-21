<template>
    <div>
        <div>
            <!-- 标签简介 -->
            <div class="collection-info">
                <img :src="titleList.image" alt="" class="avatar">
                <div class="summary">
                    <div class="name">{{titleList.tag}}</div>
                    <div class="desc">
                        <a href="">简书</a>
                        编，
                        <span>3947</span>
                        篇文章，
                        <span>66.9</span>
                        万人关注
                    </div>
                    <div class="intro" v-if="this.down">
                        {{titleList.subtitle}}
                        <span class="mui-icon mui-icon-arrowdown" @click="handleDown"></span>
                    </div>
                    <div class="intro" v-if="this.up">
                        {{titleList.title}}
                        <br>收起
                        <span class="mui-icon mui-icon-arrowup" @click="handleUp"></span>
                    </div>
                    <button type="button" class="button" id="btn1" @click="handleGuanzhu" v-if="this.btn1"><span class="mui-icon mui-icon-plus"></span> 关注</button>
                    <button type="button" class="button" id="btn2" @click="handleGuanzhu" v-if="this.btn2"><span class="mui-icon mui-icon-checkmarkempty"></span> 已关注</button>
                </div>
            </div>
            <hr>
            <!-- 对应标签下的文章 -->
            <ul class="flow-list-sort">
                <li id="shoulu" class="active" @click="handleShoulu">最新收录</li>
                <li id="pinglun" class="" @click="handlePinglun">最新评论</li>
                <li id="remen" class="" @click="handleRemen">热门</li>
            </ul>
            <ul class="flow-list-ul">
                <li class="note-li">
                    <a href="#" class="content">
                        <span class="warp-img">
                            <img :src="myList.image">
                        </span>
                        <div class="summary">
                            <h6 class="title">{{myList.title}}</h6>
                            <p class="abstract">{{myList.abstract}}</p>
                        </div>
                    </a>
                    <div class="meta">
                        <span class="name">{{myList.uname}}</span>
                        <span><i class="mui-icon-extra mui-icon-extra-comment"></i>  {{myList.pinglun}}</span>
                        <span><i class="mui-icon-extra mui-icon-extra-heart-filled"></i>  {{myList.dianzan}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <hr>

        <!-- 底部用户登录注销 -->
        <div class="panel">
            <button class="item" @click="handleLogin" v-if="!(this.show)">登录</button>
            <router-link :to="'/user?uid='+this.uid" class="touxiang" v-if="this.show">
                <span style="width:36px;height:36px;"><img src="../../lib/img/logo.png"/></span>
            </router-link>
            <button class="item" @click="handleZhuxiao" v-if="this.show">注销</button>  
            
            <span class="line">|</span>
            <button class="item">打开App</button>
            <span class="line">|</span>
            <a href="" class="item">热门文章</a>
        </div>
    </div>
</template>> 
<style>
    *{
        box-sizing:border-box;
        margin:0;
        padding:0;
    }
    img{
        max-width:100%;
        border-style:none;
    }
    .app-container{
        padding:0 18px;
    }
    .collection-info{
        margin:20px 0 15px;
        min-height:112px;
    }
    .avatar{
        height:72px;
        width:72px;
        border-radius:7px;
        border:1px solid #ddd;
        margin-right:13px;
        float:left;
    }
    .summary{
        overflow:hidden;
    }
    .collection-info .summary .name{
        margin-right:5px;
        font-size:19px;
        font-weight:700;
        display:inline-block;
        line-height:1.3;
        color:#484848;
        vertical-align:middle;
    }
    .collection-info .summary .intro{
        font-size:14px;
        line-height:20px;
        color:#484848;
    }
    .mui-icon-arrowdown{
        font-size:16px !important;
    }
    #btn1{
        margin:12px 0;
        width:100%;
        border:1px solid #42c02e;
        background-color:#42c02e;
        color:#fff;
        height:40px;
        display:inline-block;
        border-radius:4px;
        text-align:center;
        padding:6px 0;
        font-size:16px;
    }
    #btn2{
        margin:12px 0;
        width:100%;
        border:1px solid #c8c8c8;
        background-color:#fff;
        color:#333;
        height:40px;
        display:inline-block;
        border-radius:4px;
        text-align:center;
        padding:6px 0;
        font-size:16px;
    }
    .flow-list-sort{
        margin:0 -18px;
        border:1px solid #f0f0f0;
        border-right:0;
        border-left:0;
    }
    .flow-list-sort li{
        position:relative;
        display:inline-block;
        width:33.33%;
        margin:-1px 0;
        padding:12px 0;
        text-align:center;
        font-size:14px;
        color:#999;
    }
    .flow-list-sort li.active{
        color:#ea6f5a;
    }
    .flow-list-sort li.active:after{
        content:"";
        position:absolute;
        bottom:0;
        left:50%;
        margin-left:-28px;
        width:56px;
        border-bottom:2px solid #ea6f5a;
    }
    .panel{
        height:80px;
        padding:20px 0;
        font-size:16px;
        text-align:center;
    }
    button.item{
        user-select:none;
        text-align:center;
        border:none;
        margin:0;
        padding:0;
    }
    .item{
        height:40px;
        line-height:40px;
        color:#969696;
    }
    .line{
        margin:0 13px;
        font-weight:100;
        color:#d9d9d9;
    }
    .touxiang{
        display:inline-block;
        vertical-align:middle;
        margin-right:10px;
        margin-top:-4px;
    }
    .touxiang span{
        border-radius:50%;
        position:relative;
        background-color:transparent;
        transition:.4s linear;
        overflow:hidden;
        display:inline-block;
    }
    .touxiang span img{
        width:100%;
        height:100%;
        display:block;
    }
</style>

<script>
    export default {
        data(){
            return{
                list:[],
                myList:[],
                tid:this.$route.query.tid,
                titleList:[],
                show:localStorage.getItem("uid")>0,
                btn1:true,
                btn2:false,
                down:true,
                up:false,
                uid:localStorage.getItem("uid")
            }
        },
        methods:{
            // 请求标签简介
            getTitle(){
                 this.$http.get("indexTitle?tid="+this.tid).then(result=>{
                     this.list=result.body
                     this.myList=this.list[0]
                 })
            },
            getTag(){
                this.$http.get("tagTitle?tid="+this.tid).then(result=>{
                    this.titleList=result.body[0]
                })
            },
            handleShoulu(){
                var id=document.getElementById("shoulu")
                if(id.classList.contains("active")){
                    return
                }else{
                    this.myList=this.list[0]
                    id.nextSibling.classList.remove("active")
                    id.parentNode.lastChild.classList.remove("active")
                    id.classList.add("active")
                }
            },
            handlePinglun(){
                var id=document.getElementById("pinglun")
                if(id.classList.contains("active")){
                    return
                }else{
                    this.myList=this.list[1]
                    id.nextSibling.classList.remove("active")
                    id.previousSibling.classList.remove("active")
                    id.classList.add("active")
                }
            },
            handleRemen(){
                var id=document.getElementById("remen")
                if(id.classList.contains("active")){
                    return
                }else{
                    this.myList=this.list[2]
                    id.previousSibling.classList.remove("active")
                    id.parentNode.firstChild.classList.remove("active")
                    id.classList.add("active")
                }
            },
            handleLogin(){
                this.$router.push("/login")
            },
            handleZhuxiao(){
                localStorage.setItem("uid","")
                this.btn1=false
                this.btn2=true
                this.$router.go(0)
            },
            handleGuanzhu(){
                if(!this.show){
                    this.$router.push("/login")
                }else if(this.btn1){
                    this.btn1=false
                    this.btn2=true
                }else{
                    this.btn1=true
                    this.btn2=false
                }
            },
            handleDown(){
                this.down=false
                this.up=true
            },
            handleUp(){
                this.down=true
                this.up=false
            }
        },
        mounted(){
            this.getTitle(),
            this.getTag()
        }
    }

</script>