import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Select, OutlinedInput, MenuItem, Button, Typography } from '@material-ui/core';
import swal from 'sweetalert';

class BusinessForm extends Component {
    state = {
        name: '',
        address: '',
        city: '',
        state_code: '',
        zip: '',
        image_url: '',
        business_url: '',
        google_places_url: '',
        selectedCategoryId: 0
    }

    handlePresent = ()=>{
        this.setState({
            name: 'Hard Times Cafe',
            address: '1821 Riverside Ave',
            city: 'Minneapolis',
            state_code: 'MN',
            zip: '55454',
            image_url: 'data:image/jpeg;base64,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',
            business_url: 'https://www.facebook.com/pages/Hard-Times-Cafe/110170505679746',
            google_places_url: 'https://goo.gl/maps/paQdjsS9QoAEzENF8',
            selectedCategoryId: 72
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
            selectedCategoryId: event.target.value
        })
    }

    //When the Add button is clicked, all form info is sent to the database, the state is cleared, and the user is taken back to the Search page
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_BUSINESS',
            payload: this.state
        })
        this.setState({
            name: '',
            address: '',
            city: '',
            state_code: '',
            zip: '',
            image_url: '',
            google_places_url: '',
            selectedCategoryId: 0
        })
        swal("Business has been added!")//should conditionally render based on success status
        this.props.history.push('/search')
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Typography>Fields marked with an asterisk are required.</Typography>
                <Input title="Required: Enter business name." className="inputs" placeholder="*Name" required={true} value={this.state.name} onChange={(event) => { this.handleInput(event, 'name') }} />
                <br />
                <Input title="Enter business address." className="inputs" placeholder="Address" value={this.state.address} onChange={(event) => { this.handleInput(event, 'address') }} />
                <br />
                <Input title="Enter business city." className="inputs" placeholder="City" value={this.state.city} onChange={(event) => { this.handleInput(event, 'city') }} />
                <br />
                <Input title="Enter business state code." className="inputs" placeholder="State" value={this.state.state_code} onChange={(event) => { this.handleInput(event, 'state_code') }} />
                <br />
                <Input title="Enter business zip code." className="inputs" placeholder="Zip code" value={this.state.zip} onChange={(event) => { this.handleInput(event, 'zip') }} />
                <br />
                <Select title="Required: Select business category." className="inputs" required={true}
                    value={this.state.selectedCategoryId}
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
                <Button onClick={this.handlePresent}>.</Button>
                <br />
                <Input title="Enter URL for business logo." className="inputs" placeholder="Image URL" value={this.state.image_url} onChange={(event) => { this.handleInput(event, 'image_url') }} />
                <br />
                <Input title="Enter URL for business website." className="inputs" placeholder="Business URL" value={this.state.business_url} onChange={(event) => { this.handleInput(event, 'business_url') }} />
                <br />
                <Input title="Enter URL for Google Maps `Share` link." className="inputs" placeholder="Google Places URL" value={this.state.google_places_url} onChange={(event) => { this.handleInput(event, 'google_places_url') }} />
                <br />
                <Button title="Click to add new business." variant="contained" color="primary" type="submit">Add</Button>
            </form>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        store
    }
}
export default connect(mapStateToProps)(BusinessForm);