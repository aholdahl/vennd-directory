import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableRow, TableCell } from '@material-ui/core';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';

class VoteTable extends Component {

    // If there has not been a vote for this user-business-demographic combination, a POST request will be sent to the database
    handleNewVote = (direction, demoId) => {
        this.props.dispatch({
            type: 'ADD_VOTE',
            payload: {
                vote: direction,
                demographic_id: demoId,
                business_id: this.props.store.detailReducer.id
            }
        })
    }

    //If the user is changing their vote for this user-business-demographic combination, a PUT request will be sent to the database
    handleVote = (direction, demoId) => {
        this.props.dispatch({
            type: 'UPDATE_VOTE',
            payload: {
                vote: direction,
                demographic_id: demoId,
                business_id: this.props.store.detailReducer.id,
            }
        })
    }

    render() {

        //conditionally renders to Vote statistics based on the current vote counts
        let statFilter = (this.props.store.statReducer.filter((stat_id) => { return stat_id.demographic_id === this.props.demographic.id }))
        let renderStats = statFilter.map((stat) => {
            if (stat.vote !== '') {
                return <p>{stat.vote}: {stat.count}</p>
            } else { return null }
        })

        //conditionally renders the Vote icon buttons based on the current vote
        let voteFilter = (this.props.store.voteReducer.filter((vote_id) => { return vote_id.demographic_id === this.props.demographic.id }))
        let renderVoteIcons =
            this.props.store.voteReducer.map((vote) => {
                if (vote.demographic_id === this.props.demographic.id) {
                    if (vote.vote === 'up') {
                        return (
                            <TableCell>
                                <ArrowUpwardOutlinedIcon color="primary" onClick={() => { this.handleVote('', this.props.demographic.id) }} />
                                <ArrowDownwardOutlinedIcon onClick={() => { this.handleVote('down', this.props.demographic.id) }} />
                            </TableCell>)
                    } else if (vote.vote === 'down') {
                        return (
                            <TableCell>
                                < ArrowUpwardOutlinedIcon onClick={() => { this.handleVote('up', this.props.demographic.id) }} />
                                < ArrowDownwardOutlinedIcon color="error" onClick={() => { this.handleVote('', this.props.demographic.id) }} />
                            </TableCell>)
                    } else if (vote.vote === '') {
                        return (
                            <TableCell>
                                < ArrowUpwardOutlinedIcon onClick={() => { this.handleVote('up', this.props.demographic.id) }} />
                                < ArrowDownwardOutlinedIcon onClick={() => { this.handleVote('down', this.props.demographic.id) }} />
                            </TableCell>)
                    }
                } return null;
            })

        return (
            <TableRow key={this.props.demographic.id}>
                <TableCell>{this.props.demographic.specific}</TableCell>
                {voteFilter[0] === undefined ?
                    <TableCell>
                        < ArrowUpwardOutlinedIcon onClick={() => { this.handleNewVote('up', this.props.demographic.id) }} />
                        < ArrowDownwardOutlinedIcon onClick={() => { this.handleNewVote('down', this.props.demographic.id) }} />
                    </TableCell>
                    : renderVoteIcons
                }
                <TableCell>{renderStats}</TableCell>
            </TableRow>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        store
    }
}

export default connect(mapStateToProps)(VoteTable);