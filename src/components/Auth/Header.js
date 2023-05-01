import React, { } from "react";
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <>
      <header className="mainheader">
        <Navbar  expand="xl">
            <Navbar.Brand className="bg-black" href="#home">
                <img src='/images/logo.png' alt="logo white"/>
            </Navbar.Brand>
            <Navbar.Toggle className="mx-4" aria-controls="basic-navbar-nav" />
          
        </Navbar>
      </header>
    </>
  );
};

export default Header;
