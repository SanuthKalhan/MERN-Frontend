import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout, resetNotifications } from "../features/userSlice";
import './Navigation.css';





function Navigation() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const bellRef = useRef(null);
  const notificationRef = useRef(null);
  const [bellPos, setBellPos] = useState({});

  function handleLogout() {
      dispatch(logout());
  }
  const unreadNotifications = user?.notifications?.reduce((acc, current) => {
      if (current.status == "unread") return acc + 1;
      return acc;
  }, 0);

  function handleToggleNotifications() {
      const position = bellRef.current.getBoundingClientRect();
      setBellPos(position);
      notificationRef.current.style.display = notificationRef.current.style.display === "block" ? "none" : "block";
      dispatch(resetNotifications());
      if (unreadNotifications > 0) axios.post(`/users/${user._id}/updateNotifications`);
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ backgroundColor: '#333', color: '#fff' }}>
      <Container>
        <Navbar.Brand href="#home">Quick Mart</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/Home.js">Home</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
        {!user && (
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        )}
        {user && !user.isAdmin && (
          <LinkContainer to="/cart">
            <Nav.Link>
              <i className="fas fa-shopping-cart"></i>
              {user?.cart.count > 0 && (
                <span className="badge badge-warning" id="cartcount">
                  {user.cart.count}
                </span>
              )}
           </Nav.Link>
         </LinkContainer>
        )}

        {/* if user */}
        {user && (
          <>
            <Nav.Link style={{ position: "relative" }} onClick={handleToggleNotifications}>
              <i className="fas fa-bell" ref={bellRef} data-count={unreadNotifications || null}></i>
            </Nav.Link>
           <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
              {user.isAdmin && (
                <>
                  <LinkContainer to="/admin">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/new-product">
                      <NavDropdown.Item>Create Product</NavDropdown.Item>
                  </LinkContainer>
                </>
             )}
              {!user.isAdmin && (
                <>
                  <LinkContainer to="/cart">
                    <NavDropdown.Item>Cart</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orders">
                   <NavDropdown.Item>My orders</NavDropdown.Item>
                  </LinkContainer>
                </>
              )}

              <NavDropdown.Divider />
                <center><Button variant="danger" onClick={handleLogout} className="logout-btn">
                    Logout
                </Button></center>
              </NavDropdown>
          </>
        )}
          
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;


<Button variant="outline-light" href='/Login'>Login</Button>
