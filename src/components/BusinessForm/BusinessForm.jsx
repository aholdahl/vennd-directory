import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Select, OutlinedInput, MenuItem, Button } from '@material-ui/core';

class BusinessForm extends Component {
    state = {
        name: '',
        address: '',
        city: '',
        state_code: '',
        zip: '',
        image_url: '',
        google_places_url: '',
        selectedCategoryId: 0
    }

    //this may not be necessary during deployment, but was helpful during development because the dropdown would clear at every change.
    componentDidMount() {
        // this.getCategories();
    }

    // //saves the list of available categories to a reducer for use in the dropdown menu
    // getCategories = () => {
    //     this.props.dispatch({
    //         type: 'FETCH_CATEGORIES'
    //     })
    // }

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
        alert('Check the console to confirm completion!')//should conditionally render based on success status
        this.props.history.push('/search')
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Input className="inputs" placeholder="Name" value={this.state.name} onChange={(event) => { this.handleInput(event, 'name') }} />
                <br/>
                <Input className="inputs" placeholder="Address" value={this.state.address} onChange={(event) => { this.handleInput(event, 'address') }} />
                <br />
                <Input className="inputs" placeholder="City" value={this.state.city} onChange={(event) => { this.handleInput(event, 'city') }} />
                <br />
                <Input className="inputs" placeholder="State" value={this.state.state_code} onChange={(event) => { this.handleInput(event, 'state_code') }} />
                <br />
                <Input className="inputs" placeholder="Zip" value={this.state.zip} onChange={(event) => { this.handleInput(event, 'zip') }} />
                <br />
                <Select className="inputs"
                    value={this.state.selectedCategoryId}
                    onChange={this.handleDropdown}
                    input={<OutlinedInput name="select category" />}
                >
                    <MenuItem value='0'>
                        <em>Category</em>
                    </MenuItem>
                    {this.props.store.categoryReducer.map((type) => {
                        return (
                            <MenuItem key={type.id} value={type.id}>{type.description}</MenuItem>
                        )
                    })}
                </Select>
                <br />
                <Input className="inputs" placeholder="Image URL" value={this.state.image_url} onChange={(event) => { this.handleInput(event, 'image_url') }} />
                <br />
                <Input className="inputs" placeholder="Business URL" value={this.state.business_url} onChange={(event) => { this.handleInput(event, 'business_url') }} />
                <br />
                <Input className="inputs" placeholder="Google Places URL" value={this.state.google_places_url} onChange={(event) => { this.handleInput(event, 'google_places_url') }} />
                <br />
                <Button variant="contained" color="primary" type="submit">Add</Button>
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