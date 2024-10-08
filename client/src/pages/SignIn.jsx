import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInstart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/oAuth.jsx';

function SignIn() {

  const [formdata, setfromdata] = useState({});
  // const [errormessage, setErrormessage] = useState(null);
  // const [loading, setloading] = useState(false);
  const {loading, error:errormessage} = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlechange = (e) => {
    
    setfromdata({ ...formdata, [e.target.id]: e.target.value.trim() });
  }

  // console.log(formdata);

  // **********************************************************************************
                  // form submit function //

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formdata.email || !formdata.password ){
      // return setErrormessage('please fill out all the fields.')
      return dispatch(signInFailure('please fill out all the fields.'))
    }
    try {
      dispatch(signInstart());
      // setloading(true);
      // setErrormessage(null);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formdata),
      })
      const data = await res.json();
      if(data.success === false){
        // return setErrormessage(data.message);
        dispatch(signInFailure(data.message));
      }
      // setloading(false);
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/home');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      // setErrormessage(error.message);
      // setloading(false);
    }
  };
  
  // **********************************************************************************

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto gap-2 flex-col md:flex-row md:items-center'>

        <div className='flex-1 '>
          {/* leftside */}
          <Link to={"/home"} className='font-bold dark:text-white lg:text-4xl text-2xl' >
            <span className='border px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'  > Maverick Thought </span> Community
          </Link>

          <p className='text-sm mt-5 '>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste maiores sequi porro quo omnis, eos ullam mollitia saepe iusto animi, inventore quas rerum ab nisi sint voluptates quos. Voluptatum, sit!
          </p>
        </div>

        <div className="lg:w-[1px] lg:h-52 lg:mt-5 lg:bg-gray-400 lg:mx-4 "></div>

        <div className='flex-1'>
          {/* rightside */}
          <form className='flex flex-col gap-4 ' onSubmit={handleSubmit} >

            <div>
              <Label value='Email' />
              <TextInput
                type='email'
                placeholder='example@gmail.com'
                id='email'
                onChange={handlechange}
              />
            </div>

            <div>
              <Label value='Password' />
              <TextInput
                type='password'
                placeholder='*******'
                id='password'
                onChange={handlechange}
              />
            </div>

            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ? <><Spinner size='sm' /> <span className='pl-3' >loading...</span></> : <span>Sign In</span>
              }
            </Button>
              
            <OAuth />

          </form>

          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't Have an account ? </span>
            <Link to='/sign-up' className='text-blue-500' >signUp</Link>
          </div>

          {
            errormessage && (
              <Alert className='mt-5' color='failure' >
                {errormessage}
              </Alert>
            )
          }

        </div>
      </div>
    </div>
  )
}

export default SignIn;