import './Register.css'
import {FaEye, FaEyeSlash,FaCheckCircle,FaInfoCircle} from 'react-icons/fa'
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { registerAsync } from '../../store/account/actions';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { useNavigate } from 'react-router-dom';

function Register(){
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    repeatpassword: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submit,setSubmit] = useState(false);
  const [showPass,setShowPass] = useState(false);
  const [toastMessage,setToastMessage] = useState(false);
  const [showRepeatPass,setShowRepeatPass] = useState(false);

  const loading = useSelector((state:AppState)=>state.account.loading);
  const message = useSelector((state:AppState)=>state.account.error);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const {firstname,lastname,email,password,repeatpassword}= formData;

  function handleRegister(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setSubmit(true)
    if(firstname && lastname && email && password && repeatpassword){
      setToastMessage(true);
      dispatch(registerAsync({firstname,lastname,email,repeatpassword}) as any)
    }
  }

  useEffect(()=>{
    setTimeout(()=>{
      setToastMessage(false);
    },6000)
  },[toastMessage])
    return (
      <div className="container">
        {/* toast message when submit form */}
        {toastMessage &&
          <div className='register-toast' style={{borderLeft:`${!message ? '4px solid #71be34':'4px solid #ff623d'}`}}>
            <i className='toast-icon' style={{color:`${!message ? '#71be34':'#ff623d'}`}}>{!message ? <FaCheckCircle/> :<FaInfoCircle/>}</i>
            <div className='toast-content'>
              <h4 className='toast-title'>{!message ? 'Success' :'Message'}</h4>
              <p className='toast-infor'>{!message ? 'You have successfully registered' : message}</p>
            </div>
          </div>
        }
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            {/* Nested Row within Card Body */}
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image" />
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">
                      Create an Account!
                    </h1>
                  </div>
                  <form className="user" onSubmit={handleRegister}>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          name="firstname"
                          className={"form-control form-control-user "+ (submit && !firstname ? 'is-invalid':'')}
                          id="exampleFirstName"
                          placeholder="First Name"
                          onChange={handleChange}
                        />
                        {submit && !firstname && (
                            <div className="invalid-feedback ml-3">
                              Firstname is required.
                            </div>
                          )}
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          name="lastname"
                          className={"form-control form-control-user "+ (submit && !lastname ? 'is-invalid':'')}
                          id="exampleLastName"
                          placeholder="Last Name"
                          onChange={handleChange}
                        />
                        {submit && !lastname && (
                            <div className="invalid-feedback ml-3">
                              Lastname is required.
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        className={"form-control form-control-user "+ (submit && !email ? 'is-invalid':'')}
                        id="exampleInputEmail"
                        placeholder="Email Address"
                        onChange={handleChange}
                      />
                      {submit && !email && (
                            <div className="invalid-feedback ml-3">
                              Email is required.
                            </div>
                          )}
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0 password">
                        <input
                          type={showPass ? 'text':'password'}
                          name="password"
                          className={"form-control form-control-user "+ (submit && (!password || password.length < 6) ? 'is-invalid':'')}
                          id="exampleInputPassword"
                          placeholder="Password"
                          onChange={handleChange}
                        />
                        <FaEye className={`show ${password && 'view'}`} onClick={()=>setShowPass(false)}/>
                        <FaEyeSlash className={`hide ${password && 'view'} ${showPass && 'change'}`}  onClick={()=>setShowPass(true)}/>
                        {submit && !password && (
                            <div className="invalid-feedback ml-3">
                              Password is required.
                            </div>
                          )
                        }
                        {submit && password && password.length < 6 && (
                            <div className="invalid-feedback ml-3">
                              Password must be at least 6 characters long.
                            </div>
                        )}
                      </div>
                      <div className="col-sm-6 repeat-password">
                        <input
                          type={showRepeatPass ? 'text':'password'}
                          name="repeatpassword"
                          className={"form-control form-control-user "+ (submit && (!repeatpassword || repeatpassword != password)? 'is-invalid':'')}
                          id="exampleRepeatPassword"
                          placeholder="Repeat Password"
                          onChange={handleChange}
                        />
                        <FaEye className={`show ${repeatpassword && 'view'}`} onClick={()=>setShowRepeatPass(false)}/>
                        <FaEyeSlash className={`hide ${repeatpassword && 'view'} ${showRepeatPass && 'change'}`}  onClick={()=>setShowRepeatPass(true)}/>
                        {submit && !repeatpassword && (
                            <div className="invalid-feedback ml-3">
                              Repeatpassword is required.
                            </div>
                          )}
                        {submit && repeatpassword && password != repeatpassword && (
                            <div className="invalid-feedback ml-3">
                              Password confirmation does not match.
                            </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <button className="btn btn-primary btn-user btn-block">
                        {loading && (
                              <span className="spinner-border spinner-border-sm mr-1"></span>
                            )}
                        Register Account
                      </button>
                    </div>
                    {/* <a
                      href="#"
                      className="btn btn-primary btn-user btn-block"
                    >
                      Register Account
                    </a> */}
                    <hr />
                    <a
                      href="index.html"
                      className="btn btn-google btn-user btn-block"
                    >
                      <i className="fab fa-google fa-fw" /> Register with Google
                    </a>
                    <a
                      href="index.html"
                      className="btn btn-facebook btn-user btn-block"
                    >
                      <i className="fab fa-facebook-f fa-fw" /> Register with
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
                    <a className="small" href="/login">
                      Already have an account? Login!
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Register;