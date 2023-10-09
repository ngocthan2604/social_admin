import config from "../config";
import { Admin, Login, Register } from "../pages";
import ListUser from "../pages/ListUser/ListUser";

const publicRoutes = [
    {path:config.routes.login,component:Login},
    {path:config.routes.register,component:Register},
]

const privateRoutes = [
    {path:config.routes.home,component:Admin},
    {path:config.routes.list,component:ListUser},
]

export {privateRoutes,publicRoutes}