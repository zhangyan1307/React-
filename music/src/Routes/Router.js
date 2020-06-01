import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"
import Play from "../pages/Play/Play"
import Home from "../pages/Home/Home"
import Recommend from "../pages/Home/Recommend/Recommend"
import Hot from "../pages/Home/Hot/Hot"
import Search from "../pages/Home/Search/Search"
let router = [
    {
        path: "/Home", component: Home,shile: true , children: [
            {
                path: '/Home/recommend', component: Recommend,shile: true 
            }, {
                path: '/Home/hotmusic', component: Hot,shile: true 
            }, {
                path: '/Home/search', component: Search,shile: true 
            }
        ]
    },
    { path: '/Login', component: Login },
    { path: '/Register', component: Register },
    { path: '/Play', component: Play, shile: true },
    { from: '/', redirect: '/Home/recommend' }
]
export default router