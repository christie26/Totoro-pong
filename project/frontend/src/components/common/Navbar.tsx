'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import NavIcon from './NavIcon';
import useToast from './useToast';

const Navbar = () => {
  const [errorMessage, setErrorMessage] = useState(() => '');
  const router = useRouter();
  const { message, closeMessage } = useToast();

  useEffect(() => {
    setTimeout(() => closeMessage(), 2000);
  }, [message, closeMessage]);

  const css =
    'fixed w-[300px] h-[100px] left-1/2 p-sm transform -translate-x-1/2 translate-y-1/2 flex justify-center items-center bg-default border-3 border-dark-purple text-dark-purple rounded-md z-50 text-h3';
  return (
    <>
      {message && <div className={css}>{message}</div>}
      {errorMessage && <div className={css}>{errorMessage}</div>}

      <nav
        className={
          'flex flex-col w-[80px] min-h-[750px] h-[inherit] bg-default items-center'
        }
      >
        <Logo />
        <NavIcon type="friend" />
        <NavIcon type="video" />
        <NavIcon type="profile" />
      </nav>
    </>
  );
};

export default Navbar;
