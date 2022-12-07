import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

function User() {
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
      axios.post("https://638da23b4190defdb748ba4f.mockapi.io/api/v1/users").then((result) => {
        console.log(result);
      }, (err) => {
        console.log(err);
      })
      return;
    }
    else {
      return;
    }
  }

  return (
    <div>

      <h2>   User</h2>
      <hr />
      <Form onSubmit={(e) => { submit(e) }}>
        <Form.Group className="mb-3">
          <Form.Label>Name <span className='text-danger'>{userValidations.nameMessage}</span> </Form.Label>
          <Form.Control type="text" placeholder="Enter name" id='name' onChange={(e) => { handleChange(e) }} />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Email Address <span className='text-danger'>{userValidations.emailMessage}</span></Form.Label>
          <Form.Control type="email" placeholder="email" id='email' onChange={(e) => { handleChange(e) }} />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Mobile No <span className='text-danger'>{userValidations.MobilenoMessage}</span></Form.Label>
          <Form.Control type="text" placeholder="Enter mobile number" id='mobileno' onChange={(e) => { handleChange(e) }} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default User