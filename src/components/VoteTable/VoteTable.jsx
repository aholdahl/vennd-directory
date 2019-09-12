import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableRow, TableCell } from '@material-ui/core';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';

class VoteTable extends Component {

    handleNewVote = (direction, demoId) => {
        //need to create functionality to check for existing value in reducer
        this.props.dispatch({
            type: 'ADD_VOTE',
            payload: {
                vote: direction,
                demographic_id: demoId,
                business_id: this.props.store.detailReducer.id,
            }
        })
    }

    handleVote = (direction, demoId) => {
        //need to create functionality to check for existing value in reducer
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

        // let renderVoteIcons = this.props.store.voteReducer.map((vote) => {
        let renderVoteIcons = () => {
            for (let vote of this.props.store.voteReducer) {
                if (vote.demographic_id === this.props.demographic.id) {
                    if (vote.vote === 'up') {
                        return (
                            <TableCell>
                                <ArrowUpwardOutlinedIcon onClick={() => { this.handleVote('', this.props.demographic.id) }} color="primary" />
                                <ArrowDownwardOutlinedIcon onClick={() => { this.handleVote('down', this.props.demographic.id) }} />
                            </TableCell>)
                    } else if (vote.vote === 'down') {
                        return (
                            <TableCell>
                                <ArrowUpwardOutlinedIcon onClick={() => { this.handleVote('up', this.props.demographic.id) }} />
                                <ArrowDownwardOutlinedIcon onClick={() => { this.handleVote('', this.props.demographic.id) }} color="error" />
                            </TableCell>)
                    } else if (vote.vote === null) {
                        return (
                            <TableCell>
                                <ArrowUpwardOutlinedIcon onClick={() => { this.handleVote('up', this.props.demographic.id) }} />
                                <ArrowDownwardOutlinedIcon onClick={() => { this.handleVote('down', this.props.demographic.id) }} />
                            </TableCell>
                        )
                    }
                    } 
            } return (
                <TableCell>
                    <ArrowUpwardOutlinedIcon onClick={() => { this.handleNewVote('up', this.props.demographic.id) }} />
                    <ArrowDownwardOutlinedIcon onClick={() => { this.handleNewVote('down', this.props.demographic.id) }} />
                </TableCell>)
            }
        

        return (
            <TableRow >
                <TableCell>{this.props.demographic.specific}</TableCell>
                {/* {renderVoteIcons} */}
                <ArrowUpwardOutlinedIcon onClick={() => { this.handleNewVote('up', this.props.demographic.id) }} />
                <ArrowDownwardOutlinedIcon onClick={() => { this.handleNewVote('down', this.props.demographic.id) }} />
                <TableCell>{/* Demographic Statistics */}</TableCell>
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