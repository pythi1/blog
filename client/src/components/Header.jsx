import React from 'react';
import { Avatar, Button, Dropdown, DropdownHeader, Navbar, NavbarToggle, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../Redux/theme/themeSlice';

function Header() {

    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const { theme } = useSelector(state => state.theme);
    const { currentUser } = useSelector(state => state.user);

    return (
        <div>
            <Navbar className='border-b-2 ' >
                <Link to={"/home"} className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white' >
                    <span className='border px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'  > Maverick Thought </span> Community
                </Link>

                <form >
                    <TextInput
                        placeholder='search...'
                        type='text'
                        rightIcon={AiOutlineSearch}
                        className='hidden lg:inline'
                    />

                </form>
                <Button className='w-12 h-10 lg:hidden' pill color='gray' >
                    <AiOutlineSearch />
                </Button>

                <div className='flex gap-2 md:order-2' >
                    <Button
                        className='w-12 h-10 hidden sm:inline'
                        color='gray'
                        pill
                        onClick={() => dispatch(toggleTheme())}
                    >
                        {/* <FaMoon /> */}
                        {theme === "light" ? <FaMoon /> : <FaSun /> }

                    </Button>
                    {
                        currentUser ?
                            (
                                <Dropdown
                                    className='bg-gradient-to-t from-red-300 via-pink-400 to-slate-100'
                                    arrowIcon={false}
                                    inline
                                    label={
                                        <Avatar
                                            alt='user'
                                            img={currentUser.profilePicture}
                                        />
                                    }
                                >
                                    <Dropdown.Header>
                                        <span className='block text-sm' >@{currentUser.username}</span>
                                        <span className='block text-sm font-medium truncate' >{currentUser.email}</span>
                                    </Dropdown.Header>
                                    <Link to={'/dashboard?tab=profile'} >
                                        <Dropdown.Item>Profile</Dropdown.Item>
                                    </Link>
                                    <Dropdown.Divider />

                                    <Dropdown.Item>SignOut</Dropdown.Item>


                                </Dropdown>
                            )
                            :
                            (
                                <Link to="/sign-in">
                                    <Button outline gradientDuoTone='purpleToBlue' >
                                        Sign In
                                    </Button>
                                </Link>
                            )
                    }

                    <NavbarToggle />

                </div>

                <Navbar.Collapse >
                    <Navbar.Link active={path === "/home"} >
                        <Link to='/home' className='font-bold' >
                            Home
                        </Link>
                    </Navbar.Link>

                    <Navbar.Link active={path === "/about"} >
                        <Link to='/about' className='font-bold' >
                            About
                        </Link>
                    </Navbar.Link>

                    <Navbar.Link active={path === "/projects"} >
                        <Link to='/projects' className='font-bold' >
                            Projects
                        </Link>
                    </Navbar.Link>

                </Navbar.Collapse>

            </Navbar>
        </div>
    )
}

export default Header