import React, { useContext, useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '/logo.png';
import Swal from 'sweetalert2';
import { Button } from '@chakra-ui/react';
import { AuthContext } from '../Context/AuthContext';

const menuItems = [
  {
    name: 'Home',
    href: '/',
  }
];

export function Navbar() {
  const { authStatus, authUser, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await logout(); // Call the logout function from context
        } catch (error) {
          console.error('Logout error', error);
        }
        Swal.fire({
          title: "Logout!",
          text: "Logout Successful",
          icon: "success",
          timer: 1500
        });
      }
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-orange-500 border-b-4 border-black-500 relative w-full bg-white py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <Link to={'/'}>
            <img src={logo} style={{ width: "50px" }} alt="Buildhub" />
          </Link>
        </div>
        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="inline-flex items-center text-md font-semibold text-gray-800 hover:text-gray-900"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden space-x-2 lg:block">
          {!authStatus ? (
            <>
              <Link
                to={'/register'}
                type="button"
                className="rounded-md bg-transparent px-3 py-2 text-md font-semibold text-black hover:bg-black/10"
              >
                Sign Up
              </Link>
              <Link
                to={'/login'}
                type="button"
                className="rounded-md border border-black px-3 py-2 text-md font-semibold text-black shadow-sm"
              >
                Log In
              </Link>
            </>
          ) : (
            <Button onClick={handleLogout} className="rounded-md border border-black px-3 py-2 text-md font-semibold">
              Logout
            </Button>
          )}
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <Link to={'/'}>
                      <img src={logo} style={{ width: "50px" }} alt="Buildhub" />
                    </Link>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    >
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-md font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                        <ChevronRight className="ml-3 h-4 w-4" />
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="mt-5 flex gap-5">
                  {!authStatus ? (
                    <>
                      <Link
                        to={'/register'}
                        type="button"
                        className="rounded-md bg-transparent px-3 py-2 text-md font-semibold text-black hover:bg-black/10"
                      >
                        Sign Up
                      </Link>
                      <Link
                        to={'/login'}
                        type="button"
                        className="rounded-md border border-black px-3 py-2 text-md font-semibold text-black shadow-sm"
                      >
                        Log In
                      </Link>
                    </>
                  ) : (
                    <Button onClick={handleLogout} className="rounded-md border border-black px-3 py-2 text-md font-semibold">
                      Logout
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
