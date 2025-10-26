'use client';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MainNavbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const u = localStorage.getItem('ssb_user');
      if (u) {
        setUser(JSON.parse(u));
      } else {
        setUser(null);
      }
    } catch (e) {
      setUser(null);
    }
  }, []);
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Bus Tracking</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            {/* Only show admin links when admin is logged in */}
            {user && user.role === 'admin' && (
              <>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/buses">Xe buýt</Nav.Link>
                <Nav.Link href="/schedules">Lịch trình</Nav.Link>
              </>
            )}
            {/* public links for non-admins can be limited */}
          </Nav>
          <Nav>
            {/* role-specific quick links */}
            {user && user.role === 'driver' && <Nav.Link href="/driver">Tài xế</Nav.Link>}
            {user && user.role === 'parent' && <Nav.Link href="/parent">Phụ huynh</Nav.Link>}
            {user && user.role === 'admin' && <Nav.Link href="/admin">Quản trị</Nav.Link>}
            {user ? (
              <>
                <span className="nav-link text-light">Xin chào, {user.name}</span>
                <Nav.Link as={Link} href="/logout">Đăng xuất</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} href="/login">Đăng nhập</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
