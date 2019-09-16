import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Select, MenuItem, OutlinedInput, Button, Typography, IconButton, Grid } from '@material-ui/core';
// import StarIcon from '@material-ui/icons/Star';
// import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Chip } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchList from '../SearchList/SearchList';

class SearchBar extends Component {
    state = {
        searchInput: '',
        selectedCategoryId: 0,
        lgbtqiaap: false,
        poc: false,
        accessible: false,
        // favorite: false,
    }

    componentDidMount() {
        this.fetchBusinesses();
        this.fetchCategories();
        this.fetchDemographics();
        this.fetchFavorites();
    }

    //saves the list of available categories via categorySaga to the categoryReducer
    fetchCategories = () => {
        this.props.dispatch({
            type: 'FETCH_CATEGORIES'
        })
    }

    //saves the list of available businesses via businessSaga to the businessReducer
    fetchBusinesses = () => {
        this.props.dispatch({
            type: 'FETCH_BUSINESSES'
        })
    }

    //saves the list of available demographics via demographicSaga to the demographicReducer
    fetchDemographics = () => {
        this.props.dispatch({
            type: 'FETCH_DEMOGRAPHICS'
        })
    }

    //saves the list of available favorites via favoriteSaga to the favoriteReducer
    fetchFavorites = () => {
        this.props.dispatch({
            type: 'FETCH_FAVORITE',
        })
    }

    //retrieves the search results via searchSaga from the database based on the specified parameters
    handleSubmit = () => {
        this.props.dispatch({
            type: 'FETCH_SEARCH_NAME',
            payload: this.state
        })
    }

    //resets the page to show all businesses, resets the state to original values
    handleClear = () => {
        this.setState({
            searchInput: '',
            selectedCategoryId: 0,
            lgbtqiaap: false,
            poc: false,
            accessible: false,
            favorite: false,
        })
        this.props.dispatch({
            type: 'FETCH_BUSINESSES'
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
            selectedCategoryId: Number(event.target.value)
        })
        this.props.dispatch({
            type: 'FETCH_SEARCH_CATEGORY',
            payload: { selectedCategoryId: Number(event.target.value) }
        })
    }

    //saves the chip tags to the local state until submit
    toggleBadge = (property, demo_id, current) => {
        if (current === false) {
            this.setState({
                ...this.state,
                [property]: true,
            })
            this.props.dispatch({
                type: 'FETCH_SEARCH_DEMOGRAPHIC',
                payload: { demographic: demo_id }
            })
        } else if (current === true) {
            this.handleClear();
        }
    }

    //when the Add New icon is clicked, takes user to the BusinessForm component
    handleNew = () => {
        this.props.history.push('/new');
    }

    render() {
        console.log(this.state)

        // maps over the search results and renders them to the DOM using the SearchList component
        let renderSearch = this.props.store.searchReducer.map((business) => {
            return (
                <SearchList business={business} key={business.id} />
            )
        })

        return (
            <div className="pageBody">
                <SearchIcon color="primary" />
                <OutlinedInput className="inputs" onChange={this.handleInput} />

                <Select
                    value={this.state.selectedCategoryId}
                    onChange={this.handleDropdown}
                    input={<OutlinedInput className="inputs" name="select category" />}
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
                    <Chip color="primary" label="LGBTQIAAP" deleteIcon={<DoneIcon />} onClick={() => { this.toggleBadge('lgbtqiaap', 1, true) }} />
                    : < Chip color="secondary" label="LGBTQIAAP" variant="outlined" onClick={() => { this.toggleBadge('lgbtqiaap', 1, false) }} />}
                {this.state.poc ?
                    <Chip color="primary" label="POC" deleteIcon={<DoneIcon />} onClick={() => { this.toggleBadge('poc', 2, true) }} />
                    : < Chip color="secondary" label="POC" variant="outlined" onClick={() => { this.toggleBadge('poc', 2, false) }} />}
                {this.state.accessible ?
                    <Chip color="primary" label="Accessible" deleteIcon={<DoneIcon />} onClick={() => { this.toggleBadge('accessible', 3, true) }} />
                    : < Chip color="secondary" label="Accessible" variant="outlined" onClick={() => { this.toggleBadge('accessible', 3, false) }} />}

                {/* <IconButton>
                    {this.state.favorite ? <StarIcon color="primary" onClick={() => { this.toggleBadge('favorite', true) }} />
                        : <StarBorderIcon color="secondary" onClick={() => { this.toggleBadge('favorite', false) }} />}
                </IconButton> */}
                <br />
                <Button color="primary" variant="contained" onClick={this.handleSubmit}>Search</Button>
                <Button color="primary" variant="contained" onClick={this.handleClear}>Clear</Button>
                <IconButton onClick={this.handleNew}>
                    <AddCircleIcon color="primary" />
                    <Typography color="primary">Add Business</Typography>
                </IconButton>
                <br />
                <Grid container spacing={0} alignItems={'center'} justify={'space-around'}>
                    {renderSearch}
                </Grid>
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