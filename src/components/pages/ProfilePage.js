import React, { useEffect, useRef } from "react";
import { Button, Form, NavLink } from "react-bootstrap";
import { AuthContext } from "../../context/context";

let idToken = localStorage.getItem("token");

const ProfilePage = () => {
  const fullnameInput = useRef();
  const profileLinkInput = useRef();

  const authCtx = AuthContext();

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDYfusG2ykTFrcF5AZHX45XIWzd3ffeaEg",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMess = "failed";
            if (data && data.error && data.error.message) {
              errorMess = data.error.message;
            }
            throw new Error(errorMess);
          });
        }
      })
      .then((data) => {
        // console.log(data);
        data.users.map((item) => {
          fullnameInput.current.value = item.displayName;
          profileLinkInput.current.value = item.photoUrl;
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const fullname = fullnameInput.current.value;
    const profileLink = profileLinkInput.current.value;

    console.log(fullname, profileLink);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDYfusG2ykTFrcF5AZHX45XIWzd3ffeaEg",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          displayName: fullname,
          photoUrl: profileLink,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMess = "failed";
            if (data && data.error && data.error.message) {
              errorMess = data.error.message;
            }
            throw new Error(errorMess);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4>Welcome to Expense Tracker!!!</h4>
        <h6>
          Your Profile is incomplete. A complete profile has higher chances to
          landing a job
          <NavLink to="/profile">
            <button>Complete Now</button>
          </NavLink>
        </h6>
      </div>
      <Form onSubmit={submitHandler}>
        <h2>Profile</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" ref={fullnameInput} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Profile Photo URL</Form.Label>
          <Form.Control type="text" ref={profileLinkInput} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default ProfilePage;
