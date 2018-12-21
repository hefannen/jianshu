<template>
  <div class="app-container">
    <header id="header" class="header">
      <div class="logo-wrap" @click="goback">
        <img src="./lib/img/logo.png" class="logo">
        <span class="alogo">创作你的创作</span>
      </div>
      <div class="down">
        免费下载
        <span></span>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<style>
  .header{
    box-shadow:0 2px 4px rgba(0,0,0,.1);
    height:40px;
    margin:0 -18px;
    z-index:10;
    padding:3px 18px;
  }
  .logo-wrap{
    height:100%;
    float:left;
  }
  .logo{
    height:100%;
    vertical-align:middle;
  }
  .alogo{
    font-size:16px;
    margin-left:12px;
    vertical-align:middle;
    display:inline-block;
    line-height:20px;
    color:#333;
  }
  .down{
    float:right;
    padding:6px 15px;
    font-size:16px;
    color:#ea6f5a;
  }
</style>

<script>
  export default {
    data(){
      return {
      }
    },
    methods:{
      goback(){
        this.$router.go(-1)
      }
    }
    
  }
</script>
