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

        //conditionally renders the Vote icon buttons based on the current vote
        let voteFilter = (this.props.store.voteReducer.filter((vote_id) => { return vote_id.demographic_id === this.props.demographic.id }))
        let renderVoteIcons = 
            this.props.store.voteReducer.map((vote) => {
                if (vote.demographic_id === this.props.demographic.id) {
                    if(vote.vote === 'up'){ return(
                        <div>
                        <ArrowUpwardOutlinedIcon color="primary" onClick={() => { this.handleVote('', this.props.demographic.id) }} />
                        <ArrowDownwardOutlinedIcon onClick={() => { this.handleVote('down', this.props.demographic.id) }} />
                        </div>)
                    } else if (vote.vote === 'down'){ return(
                        <div>
                        < ArrowUpwardOutlinedIcon onClick = {() => { this.handleVote('up', this.props.demographic.id) }} />
                        < ArrowDownwardOutlinedIcon color="error" onClick = {() => { this.handleVote('', this.props.demographic.id) }} />
                        </div>)
                    } else if (vote.vote === ''){ return (
                        <div>
                        < ArrowUpwardOutlinedIcon onClick={() => { this.handleVote('up', this.props.demographic.id) }} />
                        < ArrowDownwardOutlinedIcon onClick={() => { this.handleVote('down', this.props.demographic.id) }} />
                        </div >)
                    } 
                } return null;
            })

        return (
            <TableRow >
                <TableCell>{this.props.demographic.specific}</TableCell>
                {voteFilter[0] === undefined ?
                    <div>
                        < ArrowUpwardOutlinedIcon onClick={() => { this.handleNewVote('up', this.props.demographic.id) }} />
                        < ArrowDownwardOutlinedIcon onClick={() => { this.handleNewVote('down', this.props.demographic.id) }} />
                    </div >
                    :
                        renderVoteIcons   
            }
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