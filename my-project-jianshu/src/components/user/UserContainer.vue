<template>
    <div class="main-view">
        <div id="user-info">
            <div class="background">
                <img src="../../lib/img/userBG.jpg" alt="">
            </div>
            <div class="user_touxiang">
                <img src="../../lib/img/logo.png" alt="">
            </div>
            <div class="auther">
                <div class="name">{{userList.user_name}}</div>
                <div class="follow-meta">
                    <span>{{userList.guanzhu}}</span>关注
                    <span class="last">{{userList.fensi}}</span>粉丝
                </div>
            </div>
            <div class="auther-meta">
                写了{{userList.zishu}}万字，获得了{{userList.xihuan}}个喜欢
            </div>
            <div class="btn-group" v-if="!(this.show)">
                <button type="button" class="follow-btn user-btn">
                    <span class="mui-icon mui-icon-plus"></span>
                    关注
                </button>
                <a href="#" class="a-btn user-btn">赞赏作者</a>
            </div>
        </div>
        <hr>
        <ul class="flow-list-sort">
            <li id="shoulu" class="active" @click="handleShoulu">最新收录</li>
            <li id="pinglun" class="" @click="handlePinglun">最新评论</li>
            <li id="remen" class="" @click="handleRemen">热门</li>
        </ul>
        <div class="flow-list-container" v-if="this.nothing">
            <div class="flow-list-nothing">
                <img src="../../lib/img/nothing.png">
                <div>这里还木有内容哦~</div>
            </div>
        </div>
        <ul class="flow-list-ul" v-if="this.title">
            <li class="note-li" v-for="item of indexList">
                <a href="#" class="content">
                    <span class="warp-img">
                        <img :src="item.image">
                    </span>
                    <div class="summary">
                        <h6 class="title">{{item.title}}</h6>
                        <p class="abstract">{{item.abstract}}</p>
                    </div>
                </a>
                <div class="meta">
                    <span class="name">{{item.uname}}</span>
                    <span><i class="mui-icon-extra mui-icon-extra-comment"></i>  {{item.pinglun}}</span>
                    <span><i class="mui-icon-extra mui-icon-extra-heart-filled"></i>  {{item.dianzan}}</span>
                </div>
            </li>
        </ul>
        <hr>
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
</template>
<style>
    .main-view{
        flex-grow:1;
    }
    #user-info{
        min-height:80px;
    }
    #user-info .background{
        margin:0 -18px;
        height:32vw;
        overflow:hidden;
        background-color:hsla(0,0%,71%,.2);
    }
    .background img{
        margin-top:-4vh;
        width:100%;
        opacity:.85;
    }
    .user_touxiang{
        position:relative;
        margin:-20px 15px 0 -4px;
        float:left;
        border-radius:50%;
        border:3px solid #fff;
        background-color:#fff;
    }
    .user_touxiang img{
        width:84px;
        height:84px;
        border-radius:50px;
        border:1px solid #ddd;
    }
    .auther{
        margin:15px 0 20px;
        padding-left:100px;
    }
    .auther .name{
        font-size:19px;
        font-weight:700;
        display:inline-block;
        vertical-align:middle;
        line-height:1.3;
        color:#484848;
    }
    .auther .follow-meta{
        margin-top:10px;
        font-size:14px;
        line-height:1;
        color:#969696;
    }
    .auther .follow-meta span{
        font-size:16px;
        color:#333;
    }
    .auther .follow-meta span.last{
        margin-left:10px;
    }
    .auther-meta{
        margin-bottom:15px;
        color:#969696;
        font-size:14px
    }
    .flow-list-container{
        position:relative;
        height:100%;
        height:100%;
        background-color:transparent;
    }
    .flow-list-nothing{
        padding:40px 0;
        text-align:center;
        font-size:14px;
        color:#969696;
    }
    .flow-list-nothing img{
        padding-bottom:10px;
        width:140px;
    }
    .btn-group{
        margin-bottom:20px;
    }
    .follow-btn{
        width:calc(50% - 10px);
        background-color:#42c02e;
        border:1px solid #42c02e;
        color:#fff;
    }
    .user-btn{
        height:40px;
        border-radius:4px;
        font-size:16px;
        text-align:center;
        padding:6px 0;
    }
    .a-btn{
        display:inline-block;
        margin-left:15px;
        border:1px solid #c8c8c8;
        color:#333;
        width:calc(50% - 10px);
    }
</style>
<script>
    export default{
        data(){
            return {
                show:localStorage.getItem("uid")>0,
                uid:localStorage.getItem("uid"),
                uid:this.$route.query.uid,
                userList:{},
                indexList:{},
                nothing:true,
                title:false
            }
        },
        methods:{
            getUser(){
                this.$http.get("user?uid="+this.uid).then(result=>{
                    console.log(result)
                    this.userList=result.body[0]
                    console.log(this.userList)
                })
            },
            getIndex(){
                this.$http.get("wenzhang?uid="+this.uid).then(result=>{
                    console.log(result)
                    this.indexList=result.body
                    console.log(this.indexList)
                    if(this.indexList.length>0){
                        this.nothing=false
                        this.title=true
                    }
                })
            },
            handleShoulu(){
                var id=document.getElementById("shoulu")
                if(id.classList.contains("active")){
                    return
                }else{
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
                    //this.myList=this.list[1]
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
                    //this.myList=this.list[2]
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
        },
        mounted(){
            this.getUser(),
            this.getIndex()
        }
    }
</script>