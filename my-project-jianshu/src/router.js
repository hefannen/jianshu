import Vue from 'vue'
import Router from 'vue-router'

import IndexContainer from "./components/IndexContainer"
import TagContainer from "./components/tag/TagContainer"
import ProductsContainer from "./components/products/ProductsContainer"
import LoginContainer from "./components/login/LoginContainer"
import RegisterContainer from "./components/login/RegisterContainer"
import UserContainer from "./components/user/UserContainer"

Vue.use(Router)

export default new Router({
    routes:[
        {path:"/",redirect:"/index"},
        {path:"/index",component:IndexContainer},
        {path:"/index/tag",component:TagContainer},
        {path:"/index/products",component:ProductsContainer},
        {path:"/login",component:LoginContainer},
        {path:"/register",component:RegisterContainer},
        {path:"/user",component:UserContainer}
    ]
})