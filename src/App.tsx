import { useSelector } from 'react-redux';
import './styles/sb-admin-2.css'
import './styles/sb-admin-2.min.css'
import './App.css';
import {Route, Routes, useNavigate } from 'react-router-dom';
import { AppState } from './store';
import {Admin, Login, Register } from './pages';
import { useEffect } from 'react';
import { privateRoutes, publicRoutes } from './routes';

function App() {
  const token = useSelector((state:AppState) => state.account.token); 
  const navigate = useNavigate();
  
  const isPublicPath = () => {
    const publicPath = publicRoutes.map((route,i)=>route.path);
    return publicPath.includes(window.location.pathname);
  }

  const isPrivatePath = () => {
    const privatePath = privateRoutes.map((route,i)=>route.path);
    return privatePath.includes(window.location.pathname);
  }

  useEffect(()=>{
    if (!token && !isPublicPath()) {
      navigate('/login', { replace: true });
    } else if (token && !isPrivatePath()) {
      navigate('/home', { replace: true });
    }
  },[token])
  
  return (
    <div id="wrapper" className="App">
        <Routes>
          {!token && (
            publicRoutes.map((routePublic,index) =>{
            const Page = routePublic.component;
            return <Route key={index} path={routePublic.path} element={<Page/>}/>
            })
          )}
          {token && (
            privateRoutes.map((routePrivate,index) =>{
            const Page = routePrivate.component;
            return <Route key={index} path={routePrivate.path} element={<Page/>}/>
            })
          )} 
        </Routes>
    </div>
  );
}

export default App;
