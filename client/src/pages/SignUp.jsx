import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react'
import { Link } from 'react-router-dom';

function SignUp() {
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

        <div className="lg:w-[1px] lg:h-52 lg:mt-5 lg:bg-gray-400 lg:mx-4"></div>

        <div className='flex-1'>
          {/* rightside */}
          <form className='flex flex-col gap-4 ' >
            <div>
              <Label value='Username' />
              <TextInput
                type='text'
                placeholder='@name'
                id='username'
              /> 
            </div>

            <div>
              <Label value='Email' />
              <TextInput
                type='text'
                placeholder='example@gmail.com'
                id='email'
              />
            </div>

            <div>
              <Label value='Password' />
              <TextInput
                type='text'
                placeholder='*******'
                id='password'
              />
            </div>

            <Button gradientDuoTone='purpleToPink' type='submit' >Sign Up</Button>

          </form>

            <div className='flex gap-2 text-sm mt-5'>
              <span>Have an account ? </span>
              <Link to='/sign-in' className='text-blue-500' >signin</Link>
            </div>

        </div>
      </div>
    </div>
  )
}

export default SignUp;