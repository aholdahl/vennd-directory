import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, CardContent, CardActionArea, Typography, CardActions, IconButton } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

class SearchList extends Component {

    //When a business is clicked, saves the business details via detailSaga in a reducer and takes the user to the Detail page where the info will be rendered
    handleSelect = () => {
        this.props.dispatch({
            type: 'FETCH_CURRENT',
            payload: { id: this.props.business.id }
        })
        this.props.dispatch({
            type: 'FETCH_FAVORITE',
            payload: {
                business_id: this.props.business.id
            }
        })
        this.props.history.push('/detail')
    }

    render() {

        return (
            <Card>
                <CardContent onClick={this.handleSelect}>
                    <CardActionArea>
                        <img className="thumbnail" src={this.props.business.image_url} />
                        <Typography>
                            {this.props.business.name}
                        </Typography>
                    </CardActionArea>
                    <Typography>
                        {this.props.business.address}{' '}{this.props.business.city}{', '}{this.props.business.state_code}{' '}{this.props.business.zip}
                    </Typography>
                </CardContent>
                <CardActions>
                    {/* <StarIcon/> conditional rendering goes here */}
                    <IconButton>
                        {this.props.business.verified && <CheckCircleIcon />}
                    </IconButton>
                    <IconButton>
                        {this.props.business.warning && <ReportProblemIcon />}
                    </IconButton>
                </CardActions>
            </Card>
        )
    }
}

export default withRouter(connect()(SearchList));