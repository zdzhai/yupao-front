import {createApp} from 'vue';
import App from './App.vue';
import {
    Button,
    Calendar,
    Card,
    Cell,
    CellGroup,
    Col,
    DatePicker,
    Dialog,
    Divider,
    Empty,
    Field,
    Form,
    Icon,
    Image as VanImage,
    NavBar,
    Radio,
    RadioGroup,
    Row,
    Search,
    Skeleton,
    Stepper,
    Switch,
    Tab,
    Tabbar,
    TabbarItem,
    Tabs,
    Tag,
    Toast,
    TreeSelect
} from 'vant';
import routes from "./config/route";
import * as VueRouter from 'vue-router';
import '../global.css';

const app = createApp(App);
app.use(Button);
app.use(NavBar);
app.use(Icon);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Toast);
app.use(Search);
app.use(Tag);
app.use(Divider);
app.use(TreeSelect);
app.use(Col);
app.use(Row);
app.use(Cell);
app.use(CellGroup);
app.use(Form);
app.use(Field);
app.use(Card);
app.use(Empty);
app.use(Stepper);
app.use(Radio);
app.use(RadioGroup);
app.use(DatePicker);
app.use(Calendar);
app.use(Switch);
app.use(Skeleton);
app.use(Tab);
app.use(Tabs);
app.use(Dialog);
app.use(VanImage);
// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
})
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)

app.mount('#app')
