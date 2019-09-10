import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, CardActionArea, Typography, CardActions, IconButton, Link } from '@material-ui/core';
import { Chip } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import DoneIcon from '@material-ui/icons/Done';
import BlockIcon from '@material-ui/icons/Block';

class DetailCard extends Component {

    addFavorite = ()=>{
        this.props.dispatch({
            type: 'ADD_FAVORITE',
            payload: {
                business_id: this.props.store.detailReducer.id
            }
        })
    }

    removeFavorite = () => {
        this.props.dispatch({
            type: 'REMOVE_FAVORITE',
            payload: {
                business_id: this.props.store.detailReducer.id
            }
        })
    }

    render() {

        return (
            <Card>
                <CardContent>
                    <CardActionArea>
                        <img src={this.props.store.detailReducer.image_url} />
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
                        : < Chip label="LGBTQIAAP" variant="outlined" deleteIcon={<BlockIcon />} />}
                    {this.props.store.detailReducer.poc ?
                        <Chip label="POC" deleteIcon={<DoneIcon />} />
                        : < Chip label="POC" variant="outlined" deleteIcon={<BlockIcon />} />}
                    {this.props.store.detailReducer.accessible ?
                        <Chip label="Accessible" deleteIcon={<DoneIcon />} />
                        : < Chip label="Accessible" variant="outlined" deleteIcon={<BlockIcon />} />}
                    <Typography>
                        <Link href={this.props.store.detailReducer.business_url}>Go to Website</Link>
                    </Typography>
                    <Link href={this.props.store.detailReducer.google_places_url}>Open in Google Maps</Link>
                </CardContent>
                <CardActions>
                    <IconButton>
                        {/* <StarIcon/> conditional rendering goes here */}
                        <StarBorderIcon onClick={this.addFavorite} />
                    </IconButton>
                    <IconButton>
                        <StarIcon onClick={this.removeFavorite} />
                    </IconButton>
                    <IconButton>
                        {this.props.store.detailReducer.verified && <CheckCircleIcon />}
                    </IconButton>
                    <IconButton>
                        {this.props.store.detailReducer.warning && <ReportProblemIcon />}
                    </IconButton>
                </CardActions>
            </Card>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        store
    }
}

export default connect(mapStateToProps)(DetailCard);