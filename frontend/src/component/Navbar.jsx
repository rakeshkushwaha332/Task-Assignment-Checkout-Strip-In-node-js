import React from "react";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const themeColor = "#131921"; // Amazon-like dark color

  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: themeColor }}
      className="py-2 sticky-top"
    >
      <Container fluid>
        {/* Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-4 text-white"
          style={{ letterSpacing: "1px" }}
        >
          MyStore
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            {/* Cart */}
            <Nav.Link as={Link} to="/cart" className="position-relative text-white">
              <FaCartArrowDown size={28} />
              {cartItems.length > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartItems.length}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
