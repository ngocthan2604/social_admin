import { RouteProps} from "react-router-dom"
import { Admin, Login } from "../../pages"

interface props{
    isLogin:boolean
}

function PrivateRoute({isLogin=false}:props):JSX.Element{
    return isLogin? <Admin/> : <Login/>
}

export default PrivateRoute