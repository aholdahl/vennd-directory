import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, MenuItem, OutlinedInput, Chip, InputBase, Button, IconButton } from '@material-ui/core';
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

class SearchBar extends Component {
    state = {
        searchInput: '',
        categoryList: [{
            id: 1,
            name: 'Education'
        },
        {
            id: 2,
            name: 'Food & Drink'
        },
        ],
        selectedCategoryId: 0,
        favorite: false,
        saved: false,
        lgbtqiaap: false,
        poc: false,
        accessible: false,
        verified: false,
        warning: false,
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_DIRECTORY',
            payload: {searchInput: this.state.searchInput}           
        })
    }

    handleInput = (event) => {
        this.setState({
            ...this.state,
            searchInput: event.target.value
        })
    }

    handleSubmit = () => {
        this.props.dispatch({
            type: 'FETCH_SEARCH',
            payload: this.state
        })
    }

    handleDropdown = (event) => {
        this.setState({
            ...this.state,
            selectedCategoryId: event.target.value
        })
    }

    toggleBadge = (property, current) => {
        this.setState({
            ...this.state,
            [property]: !current
        })
    }

    handleNew = () => {
        this.props.history.push('/new');//history is undefined?
    }
    
render(){
        return (
            <div>
                <SearchIcon color="primary" />
                <input onChange={this.handleInput} /> {/* InputBase */}
                <Button color="primary" variant="contained" onClick={this.handleSubmit}>Search</Button>
                <Select
                    value={this.state.selectedCategoryId}
                    onChange={this.handleDropdown}
                    input={<OutlinedInput name="select category" />}
                >
                    <MenuItem value='0'>
                        <em>Category</em>
                    </MenuItem>
                    {this.state.categoryList.map((type) => {
                        return (
                            <MenuItem value={type.id}>{type.name}</MenuItem>
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
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        store
    }
}

export default connect(mapStateToProps)(SearchBar);