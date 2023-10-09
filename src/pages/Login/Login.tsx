import { useState,useEffect } from "react";
import { AppState } from "../../store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginAsync, logoutAsync } from "../../store/account/actions";
import './Login.css'
import { Link } from "react-router-dom";

function Login(){
  const [inputs,setInputs] = useState({
    email:'',
    password:''
  });
  const [submit,setSubmit] = useState(false);
  const [toastError,setToastError] = useState(false);

  const {email,password} = inputs;


  const loading = useSelector((state:AppState) => state.account.loading)
  const error = useSelector((state:AppState) => state.account.error)

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(logoutAsync() as any)
  },[])

  const handleChange= (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target; 
    setInputs((inputs)=>({...inputs,[name]:value}))
  }

  //handle submit login
  const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      if(!loading){
        setSubmit(true)
        if(email && password){
            dispatch(loginAsync({ email, password }) as any)
        }
      }
  }

  //handle login failure
  useEffect(()=>{
    if(!loading && submit && error){
      setInputs({email:'',
      password:''})
      setToastError(true);
      setTimeout(()=>{
        setToastError(false)
      },3700)
    }
  },[error,loading,submit])

    return (
      <div className="container position-relative">
        {/* toast message login failure */}
        {toastError && (
        <div className="toast toast-custom">
          <div className="toast-header">
            <strong className="mr-auto">Login Failed</strong>
            <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" onClick={()=>setToastError(false)}>&times;</button>
          </div>
          <div className="toast-body">
            Incorrect email or password. Please try again.
          </div>
        </div>
        )}

        {/* Outer Row */}
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/* Nested Row within Card Body */}
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="email"
                            value={email}
                            className={"form-control form-control-user " + (submit && !email ? 'is-invalid':'')}
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                            onChange={handleChange}
                            name="email"
                          />
                          {submit && !email && (
                            <div className="invalid-feedback ml-3">
                              Email is required.
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            value={password}
                            className={"form-control form-control-user " + (submit && !password ? 'is-invalid':'')}
                            id="exampleInputPassword"
                            placeholder="Password"
                            onChange={handleChange}
                            name="password"
                          />
                          {submit && !password && (
                            <div className="invalid-feedback ml-3">
                              Password is required.
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <button className="btn btn-primary btn-user btn-block">
                            {loading && (
                              <span className="spinner-border spinner-border-sm mr-1"></span>
                            )}
                            Login</button>
                        </div>
                        <hr />
                        <a
                          href="index.html"
                          className="btn btn-google btn-user btn-block"
                        >
                          <i className="fab fa-google fa-fw" /> Login with
                          Google
                        </a>
                        <a
                          href="index.html"
                          className="btn btn-facebook btn-user btn-block"
                        >
                          <i className="fab fa-facebook-f fa-fw" /> Login with
                          Facebook
                        </a>
                      </form>
                      <hr />
                      <div className="text-center">
                        <a className="small" href="forgot-password.html">
                          Forgot Password?
                        </a>
                      </div>
                      <div className="text-center">
                        <Link className="small" to="/register">
                          Create an Account!
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Login