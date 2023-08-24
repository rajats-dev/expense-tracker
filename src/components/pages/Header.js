import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, ToggleButton } from "react-bootstrap";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/auth";
import { featureAction } from "../../store/features";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { SiDarkreader } from "react-icons/si";
// import { AuthContext } from "../../context/context";

const Header = () => {
  // const authCtx = AuthContext();
  const dispatch = useDispatch();
  const [features, setFeatures] = useState(false);
  const darkMode = useSelector((state) => state.feature.darkmode);

  useEffect(() => {
    dispatch(authAction.refresh());
  }, [dispatch]);

  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const isExpenseLimitOff = useSelector(
    (state) => state.expense.isExpenseLimitOff
  );

  const logOutHandler = () => {
    dispatch(authAction.logout());
  };

  const activateFeatures = () => {
    setFeatures(true);
  };

  const toggleDarkMode = () => {
    dispatch(featureAction.toggleDarkMode());
  };

  return (
    <Navbar expand="lg" className="bg-info bg-body-tertiary">
      <Container>
        <Navbar.Brand>Expense Tracker</Navbar.Brand>
        <Nav>
          {features && (
            <ToggleButton
              variant={darkMode ? "dark" : "light"}
              onClick={toggleDarkMode}
            >
              {darkMode ? <SiDarkreader /> : <MdOutlineDarkMode />}
            </ToggleButton>
          )}
          {isUserLoggedIn && isExpenseLimitOff && (
            <Button variant="success" onClick={activateFeatures}>
              Activate Premium
            </Button>
          )}
          {isUserLoggedIn && (
            <NavLink to="/expense">
              <Button variant="success">Track Expenses</Button>
            </NavLink>
          )}
          {isUserLoggedIn && (
            <NavLink to="/auth">
              <Button variant="danger" onClick={logOutHandler}>
                Log Out
              </Button>
            </NavLink>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;