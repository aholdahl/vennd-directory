import React, { Component } from 'react';
import { connect } from 'react-redux';
import {TableRow, TableCell} from '@material-ui/core';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';

class VoteTable extends Component {

    state = {
        upvote: true,
        downvote: false,
    }
    handleVote = (direction) => {
        //need to create functionality to check for existing value in reducer
        this.props.dispatch({
            type: 'ADD_VOTE',
            payload: {
                vote: direction,
                business_id: this.props.store.detailReducer.id
            }
        })
        //     this.setState({
        //         ...this.state,
        //         upvote: !this.state.upvote,
        //         downvote: false
        //     })
        // } else if (direction === 'down') {
        //     this.setState({
        //         ...this.state,
        //         upvote: false,
        //         downvote: !this.state.downvote
        //     })
    }

    render(){
        return (
            <TableRow>
                <TableCell>{/*Demographic Name*/}</TableCell>
                <TableCell>
                    {
                        this.state.upvote ? <ArrowUpwardOutlinedIcon onClick={() => { this.handleVote('up') }} color="primary" />
                            : <ArrowUpwardOutlinedIcon onClick={() => { this.handleVote('up') }} />
                    }
                    {
                        this.state.downvote ? <ArrowDownwardOutlinedIcon onClick={() => { this.handleVote('down') }} color="error" />
                            : <ArrowDownwardOutlinedIcon onClick={() => { this.handleVote('down') }} />
                    }
                </TableCell>
                <TableCell>{/* Demographic Statistics */}</TableCell>
            </TableRow>
        )
    }
}

export default connect()(VoteTable);