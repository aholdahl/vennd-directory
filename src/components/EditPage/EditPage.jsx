import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input, Select, OutlinedInput, MenuItem, Button, IconButton, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import swal from 'sweetalert';

class EditPage extends Component {
    state = {}

    //this may not be necessary during deployment, but was helpful during development because the dropdown would clear at every change.
    componentDidMount() {
        this.setState({
            ...this.props.store.detailReducer
        })
    }

    //saves the text input to the local state until submit
    handleInput = (event, property) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }

    //saves the category to the local state until submit
    handleDropdown = (event) => {
        this.setState({
            ...this.state,
            category_id: event.target.value
        })
    }

    //saves the new boolean value to the local state until submit
    toggleIcon = (event, property, current) => {
        this.setState({
            ...this.state,
            [property]: !current
        })
    }

    //When the Add button is clicked, all form info is sent to the database, the state is cleared, and the user is taken back to the Search page
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'UPDATE_BUSINESS',
            payload: this.state
        })
        this.setState({
        })
        swal("Business has been updated!")//should conditionally render based on success status
        this.props.history.push('/search')
    }

    //When clicked, a confirmation modal will appear. The admin will have the opportunity to confirm or cancel.
    handleDelete = () => {
        swal({
            title: 'Please confirm',
            text: 'Are you sure you want to delete?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                this.confirmDelete();
                swal('Completed', {
                    icon: "success",
                })
            }
        }
        )
    }

    //When the Admin confirms deletion, the id to be deleted will be dispatched to the detailSaga
    confirmDelete = () => {
        this.props.dispatch({
            type: 'DELETE_BUSINESS',
            payload: { id: this.props.store.detailReducer.id }
        })
        this.props.history.push('/search')
    }

    render() {
        //confirms whether user has admin access or not. If user is not an admin, they will receive an error page instead.
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
                    <form onSubmit={this.handleSubmit}>
                        <Typography variant="h4" align="center">Edit Business Form</Typography>
                        <Typography variant="subtitle2">Fields marked with an asterisk are required.</Typography>
                        <br />
                        <Input title="Required: Enter business name." required={true} className="inputs" placeholder="*Name" value={this.state.name} onChange={(event) => { this.handleInput(event, 'name') }} />
                        <br />
                        <Input title="Enter business address." className="inputs" placeholder="Address" value={this.state.address} onChange={(event) => { this.handleInput(event, 'address') }} />
                        <br />
                        <Input title="Enter business city." className="inputs" placeholder="City" value={this.state.city} onChange={(event) => { this.handleInput(event, 'city') }} />
                        <br />
                        <Input title="Enter business state code." className="inputs" placeholder="State" value={this.state.state_code} onChange={(event) => { this.handleInput(event, 'state_code') }} />
                        <br />
                        <Input title="Enter business zip code." className="inputs" placeholder="Zip Code" value={this.state.zip} onChange={(event) => { this.handleInput(event, 'zip') }} />
                        <br />
                        <Select title="Required: Select business category." required={true} className="inputs"
                            value={this.state.category_id}
                            onChange={this.handleDropdown}
                            input={<OutlinedInput name="select category" />}
                        >
                            <MenuItem value={0}>
                                <em>*Category</em>
                            </MenuItem>
                            {this.props.store.categoryReducer.map((type) => {
                                return (
                                    <MenuItem key={type.id} value={type.id}>{type.description}</MenuItem>
                                )
                            })}
                        </Select>
                        <br />
                        <Input title="Enter URL for business logo." className="inputs" placeholder="Image URL" value={this.state.image_url} onChange={(event) => { this.handleInput(event, 'image_url') }} />
                        <br />
                        <Input title="Enter URL for business website." className="inputs" placeholder="Business URL" value={this.state.business_url} onChange={(event) => { this.handleInput(event, 'business_url') }} />
                        <br />
                        <Input title="Enter URL for Google Maps `Share` link." className="inputs" placeholder="Google Places URL" value={this.state.google_places_url} onChange={(event) => { this.handleInput(event, 'google_places_url') }} />
                        <br />
                        <IconButton>
                            {this.state.verified ? <CheckCircleIcon title="Verified. Click to remove verification." color="primary" onClick={(event) => { this.toggleIcon(event, 'verified', true) }} /> : <CheckCircleOutlinedIcon title="Not Verified. Click to mark as verified." color="secondary" onClick={(event) => { this.toggleIcon(event, 'verified', false) }} />}
                        </IconButton>
                        <IconButton>
                            {this.state.warning ? <ReportProblemIcon title="Warning enabled. Click to disable." color="primary" onClick={(event) => { this.toggleIcon(event, 'warning', true) }} /> : <ReportProblemOutlinedIcon title="Warning disabled. Click to enable." color="secondary" onClick={(event) => { this.toggleIcon(event, 'warning', false) }} />}
                        </IconButton>
                        <Button title="Click to save changes." variant="contained" color="primary" type="submit">Save Changes</Button>
                        <br />
                        <IconButton>
                            <DeleteSweepIcon title="Click to delete this business." color="primary" onClick={this.handleDelete} />
                        </IconButton>
                    </form>
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

export default withRouter(connect(mapStateToProps)(EditPage));