import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import SweetAlert from 'react-bootstrap-sweetalert';
import { Link } from 'react-router-dom'

function Users() {
    let [users, setUsers] = useState([]);

    let [showdeletealert,setShowDeleteAlert] = useState(false);

    let[id,setId] = useState(0);
    useEffect(() => {
        bindData();

    }, []);
    function confirmDeleteUser(e, userid) {
        e.preventDefault();
        setId(userid);
        setShowDeleteAlert(true);
       
       
    }

    function deleteUser(e){
        if(id !== 0){
        axios.delete("https://638da23b4190defdb748ba4f.mockapi.io/api/v1/users/" + id).then((result) => {
           setShowDeleteAlert(false);
        bindData()
        });
        }
    }

    function bindData() {
        axios.get("https://638da23b4190defdb748ba4f.mockapi.io/api/v1/users").then((result) => {
            setUsers(result.data);
        }, (err) => {
            console.log(err);
        })
    }
    return (
        <div>
            <h2> Users </h2>
            <hr />
        {
            showdeletealert &&
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                title="Are you sure?"
                onConfirm={(e)=>{deleteUser()}}
                onCancel={(e)=>{setShowDeleteAlert(false);}}
                focusCancelBtn
            >
                You will not be able to recover this imaginary file!
            </SweetAlert>
        }
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>No</th>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, i) => {
                            return (
                                <tr key={i}>
                                    <td>
                                        <Link className='btn btn-primary' to="/edit/1"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Link> &nbsp;
                                        <Button variant="danger" onClick={(e) => { confirmDeleteUser(e, user.id) }}><i className="fa fa-trash"></i></Button>
                                    </td>
                                    <td>{i + 1}</td>
                                    <td>{user.name}</td>
                                    <td><img src={user.avatar} alt={user.name} /></td>
                                    <td>{user.email}</td>
                                    <td>{user.mobileno}</td>
                                </tr>
                            )
                        })
                    }


                </tbody>
            </Table>
        </div>
    )
}

export default Users