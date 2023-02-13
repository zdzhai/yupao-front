import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import User from "../pages/UserPage.vue";
import Search from "../pages/SearchPage.vue";
import Edit from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";


// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
const routes = [
    { path: '/', component: Index },
    { path: '/team', component: Team },
    { path: '/team/add', component: TeamAddPage },
    { path: '/user', component: User },
    { path: '/search', component: Search },
    { path: '/user/edit', component: Edit },
    { path: '/user/list', component: SearchResultPage },
    { path: '/user/login', component: UserLoginPage },
]

export default routes;