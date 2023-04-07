import React, { Fragment } from 'react';
import { useLocation } from 'react-router';
import { HashLink } from 'react-router-hash-link';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { HiOutlineX, HiOutlineMenuAlt2 } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { navList } from '../Utilities/utilities';
import { useAuth } from '../Hook/useAuth';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const Header = () => {
    const { user, logOut, isLoading, admin } = useAuth();

    const location = useLocation();
    navList.forEach(link => {
        if (link.to.toLowerCase() === location.pathname.toLowerCase())
            link.current = true;
        else
            link.current = false;
    })
    // privateNavList.forEach(link => {
    //     if (link.to.toLowerCase() === location.pathname.toLowerCase())
    //         link.current = true;
    //     else
    //         link.current = false;
    // })

    return (
        <>
            <Disclosure as="nav" className="shadow-lg fixed top-0 z-10 w-screen bg-white">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                            <div className="relative flex items-center justify-between h-16">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <HiOutlineX className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <HiOutlineMenuAlt2 className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex-shrink-0 flex items-center">
                                    </div>
                                    <div className="hidden sm:block sm:ml-6">
                                        <div className="flex space-x-4">
                                            {navList.map((item) => (
                                                <HashLink
                                                    key={item.name}
                                                    to={item.to}
                                                    className={classNames(
                                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-700 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </HashLink>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {
                                    (isLoading) ? <div className=" flex justify-center items-center">
                                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-300"></div>
                                    </div> :
                                        (user?.displayName || user?.email) ? <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="ml-3 relative">
                                                <div>
                                                    <Menu.Button className="hover:bg-gray-300 flex items-center p-1 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-500 focus:ring-white">
                                                        {/* <span className="sr-only">Open user menu</span> */}
                                                        <img
                                                            className="h-8 w-8 rounded-full"
                                                            src={user.photoURL || '/assets/img/avator.png'}
                                                            alt="profile_pic"
                                                        />
                                                        <p className="mx-2 text-gray-600 font-semibold">{user?.displayName}</p>
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {
                                                            admin &&
                                                            <>
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <Link
                                                                            to="/manageservices"
                                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                        >
                                                                            Manage Services
                                                                        </Link>
                                                                    )}
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <Link
                                                                            to="/makeadmin"
                                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                        >
                                                                            Make Admin
                                                                        </Link>
                                                                    )}
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <Link
                                                                            to="/addservice"
                                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                        >
                                                                            Add Services
                                                                        </Link>
                                                                    )}
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <Link
                                                                            to="/pendingpost"
                                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                        >
                                                                            Blog request
                                                                        </Link>
                                                                    )}
                                                                </Menu.Item>
                                                            </>
                                                        }
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    to="/myorders"
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                >
                                                                    My order
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    to="/addblog"
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                >
                                                                    Add blog
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    to="/profile"
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                >
                                                                    Settings
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <span
                                                                    onClick={logOut}
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                                                >
                                                                    Sign out
                                                                </span>
                                                            )}
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div> : <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                            <Link className="px-4 py-1 bg-blue-300 overflow-hidden transform duration-300 hover:scale-110 font-semibold rounded-2xl" to="/login">Login</Link>
                                        </div>
                                }
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navList.map((item) => (
                                    <HashLink
                                        key={item.name}
                                        to={item.to}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-700 hover:text-white',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </HashLink>
                                ))
                                }

                                {/* {(isLoading) ? <span></span> : (user?.displayName || user?.email) ? privateNavList.map((item) => (
                                    <HashLink
                                        key={item.name}
                                        to={item.to}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-700 hover:text-white',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </HashLink>
                                )) : <span></span>
                                } */}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    );
};

export default Header;