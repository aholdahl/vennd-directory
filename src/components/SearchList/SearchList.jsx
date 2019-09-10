import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, CardContent, CardActionArea, Typography, CardActions, IconButton } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

class SearchList extends Component {

    handleSelect = ()=>{
        this.props.dispatch({
            type: 'FETCH_CURRENT',
            payload: {id: this.props.business.id}
        })
        this.props.history.push('/detail')
    }

    render (){
        return (
            <Card>
                <CardContent onClick={this.handleSelect}>
                    <CardActionArea>
                        <img className="thumbnail" src={this.props.business.image_url}/> {/*CardMedia*/}
                        <Typography>
                            {this.props.business.name}
                        </Typography>
                    </CardActionArea>
                    <Typography>
                        {this.props.business.address}{' '}{this.props.business.city}{', '}{this.props.business.state_code}{' '}{this.props.business.zip}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton>
                        {this.props.business.favorite && <StarIcon />}
                        {/* {this.props.business.favorite ? <StarIcon /> : <StarBorderIcon />} */}
                    </IconButton>
                    <IconButton>
                        {this.props.business.verified && <CheckCircleIcon/>}
                        {/* {this.props.business.verified ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />} */}
                    </IconButton>
                    <IconButton>
                        {this.props.business.warning && <ReportProblemIcon />}
                        {/* {this.props.business.warning ? <ReportProblemIcon /> : <ReportProblemOutlinedIcon />} */}
                    </IconButton>
                </CardActions>
            </Card>
        )
    }
} 

export default withRouter(connect ()(SearchList));