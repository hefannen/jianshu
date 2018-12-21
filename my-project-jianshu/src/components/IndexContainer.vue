<template>
    <div>
        <div id="header">
            <div class="top-title">
                <span>热门专题</span>
                <span class="mui-icon mui-icon-loop" @click="handleTag">换一批</span>
            </div>
            <div class="recommend-collection">
                <router-link :to="'/index/tag?tid='+item.tid" class="tag" v-for="item in tagList" :key="item.id">{{item.tag}}</router-link>
            </div>
        </div>
        <hr>
        <ul class="flow-list-ul">
            <li class="note-li" v-for="item of myList" :key="item.iid">
                <router-link :to="'/index/products?iid='+item.iid" class="content">
                    <span class="warp-img">
                        <img :src="item.image">
                    </span>
                    <div class="summary">
                        <h6 class="title">{{item.title}}</h6>
                        <p class="abstract">{{item.abstract}}</p>
                    </div>
                </router-link>
                <div class="meta">
                    <span class="name">{{item.uname}}</span>
                    <span><i class="mui-icon-extra mui-icon-extra-comment"></i>  {{item.pinglun}}</span>
                    <span><i class="mui-icon-extra mui-icon-extra-heart-filled"></i>  {{item.dianzan}}</span>
                </div>
            </li>
        </ul>
        <div>
            <div class="load-more" @click="handleMore">
                展开更多文章
                <i class="mui-icon mui-icon-arrowdown"></i>
            </div>
        </div>
        <footer class="footer">
            <hr>
            <div class="download">   
            </div>
        </footer>
    </div>
</template>
<style>
    body{
        background-color: #fff !important;
        font-size:14px !important;
        font-weight:400 !important;
        line-height:1.6 !important;
    }
    hr{
        border-width:0;
        height:10px !important;
        background-color: #f5f5f5;
        margin:0 -18px;
    }
    .flow-list-ul{
        width:100%;
        list-style-type:none;
        position:relative;
        margin-bottom:0;
        margin-top:0;
        padding-right:0;
        padding-left:0;
    }
    .note-li{
        position:relative;
        width:100%;
        padding:15px 18px;
        border-bottom:1px solid #f0f0f0;
    }
    .content{
        display:block;
        padding-right:95px;
        margin:6px;
        cursor: default;
    }
    .warp-img{
        position:absolute;
        width:80px;
        height:80px;
        right:15px;
        background-color:transparent;
        overflow:hidden;
        display:inline-block;
    }
    .warp-img img{
        height:80px;
        width:80px;
    }
    .summary .title{
        font-size:18px;
        font-weight:700;
        color:#333;
        overflow:hidden;
        text-overflow:ellipsis;
        line-height: 25px;
        white-space:normal;
        max-height:50px;
        box-sizing:content-box;
    }
    .abstract{
        margin-top:6px;
        font-size:13px;
        line-height:19px;
        color:#999;
        max-height:38px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space: normal;
        box-sizing:content-box;
    }
    .meta{
        padding-right:95px;
        margin-top:8px;
        line-height:22px;
    }
    .meta span{
        font-size:12px;
        margin-right:12px;
        color:#b1b1b1;
        width:13px;
        height:12px;
    }
    .mui-icon-extra{
        font-size:12px !important; 
    }
    .top-title{
        font-size:14px;
        font-weight:700;
        color:#545454;
        padding:10px 0;
    }
    .top-title .mui-icon-loop{
        float:right;
        font-size:13px;
        color:#888;
        font-weight:400;
        line-height:1.75;
    }
    .recommend-collection{
        padding:0 18px 5px 18px;
    }
    .show{display:none;}
    .tag{
        display:inline-block;
        padding:2px 10px;
        margin:0 12px 12px 0;
        font-size:14px;
        position:relative;
        color:#ea6f5a;
        border:1px solid #ea6f5a;
        border-radius: 4px;
    }
    .load-more{
        margin:auto 0;
        padding:15px 0 15px 7px;
        text-align:center;
        font-size:15px;
        color:#969696;
    }
    footer{
        display:block;
    }
    .download{
        margin:0 -18px;
        background-color:transparent;
        height:230px;
        background-image:url(../lib/img/download.png);
        background-size: contain;
    }
</style>

<script>
    export default {
        data(){
            return{
                list:[],
                myList:[],
                count:0,
                tag:[],
                tagList:[],
                i:0,
            }
        },
        methods:{
            getIndex(){
                //var url="http://127.0.0.1:3000/index"
                this.$http.get("index").then(result=>{
                    for(var i=0;i<Math.ceil(result.body.data.length/7);i++){
                        this.list.push(result.body.data.slice(i*7,i*7+7))
                    }
                    this.myList=this.list[0]
                    //.log(this.list)
                    console.log(this.list)
                    console.log(this.myList)
            })
            },
            getTitle(){
                var url="http://127.0.0.1:3000/tag"
                this.$http.get(url).then(result=>{
                    for(var i=0;i<Math.ceil(result.body.data.length/7);i++){
                        this.tag.push(result.body.data.slice(i*7,i*7+7))
                    }
                    //this.tag=result.body.data
                    this.tagList=this.tag[0]
                    console.log(this.tag)
                })
            },
            handleTag(){
                this.i++
                console.log(this.i)
                if(this.i>=this.tag.length){
                    this.i=0
                }
                this.tagList=this.tag[this.i]
            },
            handleMore(){
                this.count++
                if(this.count>=this.list.length){
                    return
                }
                for(var item of this.list[this.count]){
                    this.myList.push(item)
                }
                console.log(this.myList)
            }
        },
        mounted(){
            this.getIndex(),
            this.getTitle()
        }
    }
</script>