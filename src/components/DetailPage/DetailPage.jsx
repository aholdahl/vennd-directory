import React, { Component } from 'react';
import { connect } from 'react-redux';
import VoteTable from '../VoteTable/VoteTable.jsx';
import { Card, CardContent, CardActionArea, Typography, CardActions, IconButton, Link, Table, TableBody, TableCell, TableHead,TableRow, Paper } from '@material-ui/core';
import { Chip } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import DoneIcon from '@material-ui/icons/Done';
import BlockIcon from '@material-ui/icons/Block';
// import { withStyles } from '@material-ui/core/styles';
// import { Box } from '@material-ui/core';
// import { Rating } from '@material-ui/lab';
// import FavoriteIcon from '@material-ui/icons/Favorite';

// const StyledRating = withStyles({
//     iconFilled: {
//         color: '#ff6d75',
//     },
//     iconHover: {
//         color: '#ff3d47',
//     },
// })(Rating);

// function getLabelText(value) {
//     return `${value} Heart${value !== 1 ? 's' : ''}`;
// }

class DetailCard extends Component {

    // state = {
    //     rating: 4,
    // }

    // handleRate = (event) => {
    // //     this.setState({
    // //         ...this.state,
    // //         rating: event.target.value
    // //     })
    // //     this.sendRating();
    // // }
    
    // // sendRating = ()=>{
    //     //need to create functionality to check for existing value in reducer
    //     this.props.dispatch({
    //         type: 'ADD_RATING',
    //         payload: {
    //             rating: this.state.rating,
    //             business_id: this.props.store.detailReducer.id
    //         }
    //     })
    //     // this.props.dispatch({
    //     //     TYPE: 'UPDATE_RATING',
    //     //     payload: { rating: event.target.value }
    //     // })
    // }

//When the StarBorderIcon is clicked, the business id is sent to the database to be added, and the page is re-rendered
    addFavorite = ()=>{
        this.props.dispatch({
            type: 'ADD_FAVORITE',
            payload: {
                business_id: this.props.store.detailReducer.id
            }
        })
    }

//When the StarIcon is clicked, the business id is sent to the database for deletion, and the page is re-rendered
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
                        <img src={this.props.store.detailReducer.image_url} alt={this.props.store.detailReducer.name+' logo'}/>
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
                        {this.props.store.detailReducer.verified && <CheckCircleIcon />}
                        {this.props.store.detailReducer.warning && <ReportProblemIcon />}
                </CardContent>
                <CardActions>
                    {this.props.store.favoriteReducer > 0 ? <StarIcon onClick={this.removeFavorite} /> : <StarBorderIcon onClick={this.addFavorite} />}
   
                    {/* <Box component="fieldset" mb={3} borderColor="transparent">
                        <StyledRating onChange={(event) => { this.handleRate(event) }} name="customized-color" value={this.props.store.ratingReducer} getLabelText={getLabelText} precision={1} icon={<FavoriteIcon fontSize="inherit" />} />
                    </Box> */}
                </CardActions>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Demographic</TableCell>
                                <TableCell>Voting Buttons</TableCell>
                                <TableCell>Statistics</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.store.demographicReducer.map((demo)=>{
                                return (
                                    <VoteTable demographic={demo} key={demo.id}/>
                                )
                            })}
                            {/* Map over demographics here */}
                        </TableBody>
                    </Table>
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