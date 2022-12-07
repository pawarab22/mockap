import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';

function User() {

  let navigate = useNavigate();
  let { id } = useParams();

  let [user, setUser] = useState({
    name: "",
    email: "",
    "mobileno": ""
  });

  let [userValidations, setUserValidations] = useState({
    nameMessage: "",
    emailMessage: "",
    "MobilenoMessage": ""
  })

  useEffect(() => {
    if (id !== undefined) {
      axios.get("https://638da23b4190defdb748ba4f.mockapi.io/api/v1/users/" + id).then((result) => {
        console.log(result.data);
        setUser({
          name: result.data.name,
          email: result.data.email,
          mobileno: result.data.mobileno
        })
      }, (err) => {
        console.log(err);
      });
    }
    else {
      setUser({
        name: "",
        email: "",
        mobileno: ""
      })
    }
  }, [id]);

  function handleChange(e) {
    e.preventDefault();

    setUser({ ...user, [e.target.id]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    let validated = true;
    let nameMessage = "";
    let emailMessage = "";
    let MobilenoMessage = "";


    if (user.name.trim() === "") {
      nameMessage = "Please Enter Name";
      validated = false;
    }


    if (user.email.trim() === "") {
      emailMessage = "Please Enter Email";
      validated = false;
    }
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
      emailMessage = "Please Enter Valid Email";
      validated = false;
    }

    if (user.mobileno.trim() === "") {
      MobilenoMessage = "Please Enter mobile number";
      validated = false;
    }
    else if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(user.mobileno)) {
      MobilenoMessage = "Please Enter Mobileno";
      validated = false;
    }

    setUserValidations(
      {
        nameMessage: nameMessage,
        emailMessage: emailMessage,
        MobilenoMessage: MobilenoMessage
      }
    )

    if (validated) { //callapi
      if (id === undefined) {
        axios.post("https://638da23b4190defdb748ba4f.mockapi.io/api/v1/users", user).then((result) => {
          navigate("/");
        }, (err) => {
          console.log(err);
        });
      }
      else {
        axios.put("https://638da23b4190defdb748ba4f.mockapi.io/api/v1/users/" + id, user).then((result) => {
          navigate("/");
        }, (err) => {
          console.log(err);
        })

      }
    }
    else {
      return;
    }
  }

  return (
    <div>

      <h2>User</h2>
      <hr />
      <Form onSubmit={(e) => { submit(e) }}>
        <Form.Group className="mb-3">
          <Form.Label>Name <span className='text-danger'>{userValidations.nameMessage}</span> </Form.Label>
          <Form.Control type="text" placeholder="Enter name" id='name' value={user.name} onChange={(e) => { handleChange(e) }} />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Email Address <span className='text-danger'>{userValidations.emailMessage}</span></Form.Label>
          <Form.Control type="email" placeholder="email" id='email' value={user.email} onChange={(e) => { handleChange(e) }} />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Mobile No <span className='text-danger'>{userValidations.MobilenoMessage}</span></Form.Label>
          <Form.Control type="text" placeholder="Enter mobile number" id='mobileno' value={user.mobileno} onChange={(e) => { handleChange(e) }} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default User