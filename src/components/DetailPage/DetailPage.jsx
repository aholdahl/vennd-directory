import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Card, CardMedia, CardContent, CardActionArea, Typography, CardActions, IconButton, Link } from '@material-ui/core';
import { Chip } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import DeleteSweepOutlinedIcon from '@material-ui/icons/DeleteSweepOutlined';
import DoneIcon from '@material-ui/icons/Done';
import BlockIcon from '@material-ui/icons/Block';

// import RatingClickers from '../RatingClickers/RatingClickers.jsx';

class DetailCard extends Component {

    // toggleFavorite = () => {
    //     if(this.props.store.detailReducer.favorite === false){
    //         this.props.dispatch({
    //             type: 'ADD_FAVORITE',
    //             payload: this.props.business.id
    //         }) 
    //     } else if (this.props.business.favorite === true){
    //         this.props.dispatch({
    //             type: 'REMOVE_FAVORITE',
    //             payload: this.props.business.id
    //         })
    //     }
    // }

    // handleDelete = ()=>{
    //     this.props.dispatch({
    //         type: 'REMOVE_BUSINESS',
    //         payload: {id: this.props.store.detailReducer.id}
    //     })
    // }

    render() {
        console.log(this.props.business)
        return (
                <Card>
                    <CardContent>
                        <CardActionArea>
                        <img src={this.props.store.detailReducer.image_url} /> {/* CardMedia */}
                            <Typography>
                            {this.props.store.detailReducer.name}
                            </Typography>
                        </CardActionArea>
                        <Typography>
                        {this.props.store.detailReducer.address}
                        </Typography>
                    <Typography>
                        {this.props.store.detailReducer.city}{', '}{this.props.store.detailReducer.state_code}{' '}{this.props.store.detailReducer.zip}
                    </Typography>
                        <Typography>
                        {this.props.store.detailReducer.description}
                        </Typography>
                    {this.props.store.detailReducer.lgbtqiaap ?
                            <Chip label="LGBTQIAAP" deleteIcon={<DoneIcon />} />
                        : < Chip label="LGBTQIAAP" variant="outlined" deleteIcon={<BlockIcon />}/>}
                    {this.props.store.detailReducer.poc ?
                            <Chip label="POC" deleteIcon={<DoneIcon />} />
                        : < Chip label="POC" variant="outlined" deleteIcon={<BlockIcon />}/>}
                    {this.props.store.detailReducer.accessible ?
                            <Chip label="Accessible" deleteIcon={<DoneIcon />} />
                        : < Chip label="Accessible" variant="outlined" deleteIcon={<BlockIcon />}/>}
                        <Typography>
                        <Link href={this.props.store.detailReducer.business_url}>Go to Website</Link>
                        </Typography>
                    <Link href={this.props.store.detailReducer.google_places_url}>Open in Google Maps</Link>
                    </CardContent>
                    <CardActions>
                        {/* <RatingClickers /> */}
                        <IconButton>
                        {this.props.store.detailReducer.favorite ? <StarIcon color="primary" onClick={this.toggleFavorite} /> : <StarBorderIcon color="secondary" onClick={this.toggleFavorite} />}
                        </IconButton>
                        <IconButton>
                        {this.props.store.detailReducer.verified && <CheckCircleIcon />}
                        {/* {this.props.store.detailReducer.verified ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />} */}
                        </IconButton>
                        <IconButton>
                        {this.props.store.detailReducer.warning && <ReportProblemIcon />}
                        {/* {this.props.store.detailReducer.warning ? <ReportProblemIcon /> : <ReportProblemOutlinedIcon />} */}
                        </IconButton>
                    </CardActions>
                </Card>
        )
    }
}

const mapStateToProps = (store)=>{
    return {
        store
    }
}

export default connect(mapStateToProps)(DetailCard);