import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Select, MenuItem, OutlinedInput, Button, Grid, Container } from '@material-ui/core';
// import StarIcon from '@material-ui/icons/Star';
// import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Chip } from '@material-ui/core';
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
        this.fetchFavorite();
    }

    //saves the list of available businesses via businessSaga to the businessReducer
    fetchBusinesses = () => {
        this.props.dispatch({
            type: 'FETCH_BUSINESSES'
        })
    }

    // //saves the list of available favorites via favoriteSaga to the favoriteReducer
    fetchFavorite = () => {
        this.props.dispatch({
            type: 'FETCH_FAVORITE',
        })
    }

    //retrieves the search results via searchSaga from the database based on the specified parameters
    handleSubmit = () => {
        this.props.dispatch({
            type: 'FETCH_SEARCH',
            payload: this.state
        })
    }

    handleKeyUp = (key)=>{
        if (key.key === 'Enter'){
            this.handleSubmit();
        }
    }

    //resets the page to show all businesses, resets the state to original values
    handleClear = () => {
        this.setState({
            searchInput: '',
            selectedCategoryId: 0,
            selectedDemoId: 0,
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
    }

    //saves the chip tags to the local state until submit
    toggleBadge = (property, demo_id, current) => {
        this.setState({
            ...this.state,
            lgbtqiaap: false,
            poc: false,
            accessible: false,
            [property]: !current
        })
    }

    //when the Add New icon is clicked, takes user to the BusinessForm component
    handleNew = () => {
        this.props.history.push('/new');
    }

    render() {

        // maps over the search results and renders them to the DOM using the SearchList component
        let renderSearch = this.props.store.searchReducer.map((business) => {
            return (
                <SearchList business={business} key={business.id} />
            )
        })

        return (
            <Container className="pageBody">
                <Container onKeyUp={this.handleKeyUp}>
                    <SearchIcon color="primary" />
                    <OutlinedInput className="inputs" onChange={this.handleInput} value={this.state.searchInput} placeholder="Search by keyword" title="Type here to search by business name" />

                    <Select
                        value={this.state.selectedCategoryId}
                        onChange={this.handleDropdown}
                        input={<OutlinedInput className="inputs" name="select category" title="Select category from dropdown to filter by category" />}
                    >
                        <MenuItem value='0'>
                            <em>Search By Category</em>
                        </MenuItem>
                        {this.props.store.categoryReducer.map((type) => {
                            return (
                                <MenuItem key={type.id} value={type.id}>{type.description}</MenuItem>
                            )
                        })}
                    </Select>
                    {/* <Select
                        value={this.state.selectedDemoId}
                        onChange={this.toggleBadge()}
                        input={<OutlinedInput className="inputs" name="select category" />}
                    >
                        <MenuItem value={0}>
                            <em>Search By Demographic</em>
                        </MenuItem>
                        <MenuItem value="lgbtqiaap">
                            LGBTQIAAP
                        </MenuItem>
                        <MenuItem value="poc">
                            POC
                        </MenuItem>
                        <MenuItem value="accessible">
                            Accessible
                        </MenuItem>
                    </Select> */}
                    {this.state.lgbtqiaap ?
                        <Chip title="Filter by LGBT+ friendly: currently active" color="primary" label="LGBTQIAAP" onClick={() => { this.toggleBadge('lgbtqiaap', 1, true) }} />
                        : < Chip title="Filter by LGBT+ friendly: currently inactive" color="secondary" label="LGBTQIAAP" variant="outlined" onClick={() => { this.toggleBadge('lgbtqiaap', 1, false) }} />}
                    {this.state.poc ?
                        <Chip title="Filter by POC friendly: currently active" color="primary" label="POC" onClick={() => { this.toggleBadge('poc', 2, true) }} />
                        : < Chip title="Filter by POC friendly: currently inactive" color="secondary" label="POC" variant="outlined" onClick={() => { this.toggleBadge('poc', 2, false) }} />}
                    {this.state.accessible ?
                        <Chip title="Filter by disability friendly: currently active" color="primary" label="Accessible" onClick={() => { this.toggleBadge('accessible', 3, true) }} />
                        : < Chip title="Filter by disability friendly: currently inactive" color="secondary" label="Accessible" variant="outlined" onClick={() => { this.toggleBadge('accessible', 3, false) }} />}

                    {/* <IconButton>
                        {this.state.favorite ? <StarIcon color="primary" onClick={() => { this.toggleBadge('favorite', true) }} />
                            : <StarBorderIcon color="secondary" onClick={() => { this.toggleBadge('favorite', false) }} />}
                    </IconButton> */}
                    <br />
                    <Button title="Click here to submit search parameters" color="primary" variant="contained" onClick={this.handleSubmit}>Search</Button>
                    <Button title="Click here to clear search parameters" color="primary" variant="contained" onClick={this.handleClear}>Clear</Button>
                    <Button title="Click here to add a new business" color="primary" variant="contained" onClick={this.handleNew}><AddCircleIcon />Add Business</Button>
                    <br />
                    <Grid container spacing={0} alignItems={'center'} justify={'space-around'}>
                        {renderSearch}
                    </Grid>
                </Container>
            </Container>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        store
    }
}

export default withRouter(connect(mapStateToProps)(SearchBar));