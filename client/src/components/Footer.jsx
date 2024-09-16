import React from 'react';
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import {BsFacebook, BsInstagram, BsTwitter} from 'react-icons/bs'


function FooterComponent() {
  return (
    <Footer container className='border-t-4 border-teal-500' >
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols'>
          <div className='mt-5' >
            <Link to={"/home"} className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white' >
              <span className='border px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'  > Maverick Thought </span> Community
            </Link>
          </div>

          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6' >

            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link href='https://www.google.com' target='_blank' rel='noopener noreferrer' >
                  projects
                </Footer.Link>

                <Footer.Link href='https://www.facebook.com' target='_blank' rel='noopener noreferrer' >
                  facebook
                </Footer.Link>

                <Footer.Link href='https://www.instagram.com' target='_blank' rel='noopener noreferrer' >
                  instagram
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title='Project' />
              <Footer.LinkGroup col>
                <Footer.Link href='https://www.google.com' target='_blank' rel='noopener noreferrer' >
                  projects
                </Footer.Link>

                <Footer.Link href='https://www.facebook.com' target='_blank' rel='noopener noreferrer' >
                  facebook
                </Footer.Link>

                <Footer.Link href='https://www.instagram.com' target='_blank' rel='noopener noreferrer' >
                  instagram
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title='Contact' />
              <Footer.LinkGroup col>
                <Footer.Link href='https://www.google.com' target='_blank' rel='noopener noreferrer' >
                  projects
                </Footer.Link>

                <Footer.Link href='https://www.facebook.com' target='_blank' rel='noopener noreferrer' >
                  facebook
                </Footer.Link>

                <Footer.Link href='https://www.instagram.com' target='_blank' rel='noopener noreferrer' >
                  instagram
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between' >
          <Footer.Copyright href='#' by="Maverick' Blogs" year={new Date().getFullYear()}/>
          <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center' >
            <Footer.Icon href='#' icon={BsFacebook} />
            <Footer.Icon href='#' icon={BsInstagram} />
            <Footer.Icon href='#' icon={BsTwitter} />
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default FooterComponent;