import { useSelector } from 'react-redux';
import './styles/sb-admin-2.min.css'
import './App.css';
import { PrivateRoute } from './components';
import {Route, Routes, useNavigate } from 'react-router-dom';
import { AppState } from './store';
import { useEffect } from 'react';

function App() {
  const token = useSelector((state:AppState) => state.account.token); 
  const navigate = useNavigate();

  useEffect(()=>{
    if(token){
      navigate('/admin',{replace:true})
    }else{
      navigate('/',{replace:true})
    }
  },[token])

  return (
    <div id="wrapper" className="App">
        <Routes>
          <Route path={token? '/admin' : "/"} element={<PrivateRoute isLogin={token? true : false}/>}/>
        </Routes>
    </div>
  );
}

export default App;
