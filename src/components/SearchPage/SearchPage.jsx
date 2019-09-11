import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Select, MenuItem, OutlinedInput, Chip, Button, IconButton } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import DoneIcon from '@material-ui/icons/Done';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchList from '../SearchList/SearchList';

class SearchBar extends Component {
    state = {
        searchInput: '',
    }

    componentDidMount() {
        this.getCategories();
        this.handleSubmit();
    }

    //saves the list of available categories via categorySaga to a reducer for use in the search parameters dropdown menu
    getCategories = () => {
        this.props.dispatch({
            type: 'FETCH_CATEGORIES'
        })
    }

    //retrieves the search results via searchSaga from the database based on the specified parameters
    handleSubmit = () => {
        this.props.dispatch({
            type: 'FETCH_SEARCH',
            payload: { searchInput: this.state.searchInput }
        })
    }

    //saves the search text input to the local state until submit
    handleInput = (event) => {
        this.setState({
            ...this.state,
            searchInput: event.target.value
        })
    }

    //saves the search category to the local state until submit
    handleDropdown = (event) => {
        this.setState({
            ...this.state,
            selectedCategoryId: event.target.value
        })
    }

    //saves the chip tags to the local state until submit
    toggleBadge = (property, current) => {
        this.setState({
            ...this.state,
            [property]: !current
        })
    }

    //when the Add New icon is clicked, takes user to the BusinessForm component
    handleNew = () => {
        this.props.history.push('/new');//history is undefined?
    }

    render() {

        // maps over the search results and renders them to the DOM using the SearchList component
        let renderSearch = this.props.store.searchReducer.map((business) => {
            return (
                <SearchList business={business} />
            )
        })

        return (
            <div>
                <SearchIcon color="primary" />
                <OutlinedInput onChange={this.handleInput} />
                <Button color="primary" variant="contained" onClick={this.handleSubmit}>Search</Button>

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
                            <MenuItem key={type.id} value={type.id}>{type.description}</MenuItem>
                        )
                    })}
                </Select>

                {this.state.lgbtqiaap ?
                    <Chip color="primary" label="LGBTQIAAP" deleteIcon={<DoneIcon />} onClick={() => { this.toggleBadge('lgbtqiaap', true) }} />
                    : < Chip color="secondary" label="LGBTQIAAP" variant="outlined" onClick={() => { this.toggleBadge('lgbtqiaap', false) }} />}
                {this.state.poc ?
                    <Chip color="primary" label="POC" deleteIcon={<DoneIcon />} onClick={() => { this.toggleBadge('poc', true) }} />
                    : < Chip color="secondary" label="POC" variant="outlined" onClick={() => { this.toggleBadge('poc', false) }} />}
                {this.state.accessible ?
                    <Chip color="primary" label="Accessible" deleteIcon={<DoneIcon />} onClick={() => { this.toggleBadge('accessible', true) }} />
                    : < Chip color="secondary" label="Accessible" variant="outlined" onClick={() => { this.toggleBadge('accessible', false) }} />}

                <IconButton>
                    {this.state.favorite ? <StarIcon color="primary" onClick={() => { this.toggleBadge('favorite', true) }} />
                        : <StarBorderIcon color="secondary" onClick={() => { this.toggleBadge('favorite', false) }} />}
                </IconButton>
                <IconButton>
                    {this.state.saved ? <WatchLaterIcon color="primary" onClick={() => { this.toggleBadge('saved', true) }} />
                        : <ScheduleIcon color="secondary" onClick={() => { this.toggleBadge('saved', false) }} />}
                </IconButton>
                <IconButton>
                    {this.state.verified ? <CheckCircleIcon color="primary" onClick={() => { this.toggleBadge('verified', true) }} />
                        : <CheckCircleOutlineIcon color="secondary" onClick={() => { this.toggleBadge('verified', false) }} />}
                </IconButton>
                <IconButton>
                    {this.state.warning ? <ReportProblemIcon color="primary" onClick={() => { this.toggleBadge('warning', true) }} />
                        : <ReportProblemOutlinedIcon color="secondary" onClick={() => { this.toggleBadge('warning', false) }} />}
                </IconButton>

                <AddCircleIcon color="primary" onClick={this.handleNew} />

                <br />
                {renderSearch}
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        store
    }
}

export default withRouter(connect(mapStateToProps)(SearchBar));