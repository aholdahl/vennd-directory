import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import swal from 'sweetalert';

class ManageUsers extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_USER_LIST'
        })
    }

    //When clicked, a confirmation modal will appear. The admin will have the opportunity to confirm or cancel.
    handleDelete = (id) => {
        swal({
            title: 'Please confirm',
            text: 'Are you sure you want to delete?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                this.confirmDelete(id);
                swal('Completed', {
                    icon: "success",
                })
            }
        })
    }

    //When the Admin confirms deletion, the id to be deleted will be dispatched to the adminSaga
    confirmDelete = (id) => {
        this.props.dispatch({
            type: 'DELETE_USER',
            payload: { id: id }
        })
    }

    toggleAdmin = (id, access) => {
        this.props.dispatch({
            type: 'UPDATE_USER',
            payload: {
                id: id,
                access_id: access
            }
        })
    }

    render() {
        let adminEdit = () => {
            if (this.props.store.user.access_id === 1) {
                return true
            } else {
                return false
            }
        }
        return (
            <div>
                {adminEdit() ?
                    < Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>Access Type</TableCell>
                                <TableCell>Make Admin</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.store.adminReducer.map((user) => {
                                return <TableRow key={user.id}>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.clearance}</TableCell>
                                    <TableCell>{user.access_id === 1 ? <Button variant="contained" color="primary" onClick={() => { this.toggleAdmin(user.id, 2) }}>Remove Admin</Button> : <Button variant="contained" color="primary" onClick={() => { this.toggleAdmin(user.id, 1) }}>Make Admin</Button>}</TableCell>
                                    <TableCell><DeleteSweepIcon color="primary" onClick={() => { this.handleDelete(user.id) }} /></TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table >
                    : <h1>You are not authorized to view this page.</h1>}
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        store
    }
}

export default connect(mapStateToProps)(ManageUsers);