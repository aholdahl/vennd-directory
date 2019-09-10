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

    // componentDidMount() {
    //     this.getCategories();
    // }

    // getCategories = () => {
    //     this.props.dispatch({
    //         type: 'FETCH_CATEGORIES'
    //     })
    // }

    handleDropdown = (event) => {
        this.setState({
            ...this.state,
            selectedCategoryId: event.target.value
        })
    }

    handleSubmit = (event)=>{
        event.preventDefault();
    }

    render(){
        return (
            <form>
                <Input placeholder="Name" value={this.state.name}/>
                <Input placeholder="Address" value={this.state.address}/>
                <Input placeholder="City" value={this.state.city}/>
                <Input placeholder="State" value={this.state.state_code}/>
                <Input placeholder="Zip" value={this.state.zip}/>
                <Select
                    value={this.state.selectedCategoryId}
                    onChange={this.handleDropdown}
                    input={<OutlinedInput name="select category" />}
                >
                    <MenuItem value='0'>
                        <em>Category</em>
                    </MenuItem>
                    {this.props.store.categoryReducer.map((type) => {
                        return (
                            <MenuItem value={type.id}>{type.description}</MenuItem>
                        )
                    })}
                </Select>
                <Input placeholder="Image URL" value={this.state.image_url}/>
                <Input placeholder="Business URL" value={this.state.business_url}/>
                <Input placeholder="Google Places URL" value={this.state.google_places_url}/>
                <Button variant="contained" color="primary" type="submit">Add</Button>
            </form>
                )
            }
        }
        
const mapStateToProps = (store)=>{
    return {
        store
    }
}
export default connect(mapStateToProps)(BusinessForm);