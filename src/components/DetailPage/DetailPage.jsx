import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import VoteTable from '../VoteTable/VoteTable.jsx';
import { Card, CardContent, Typography, CardActions, Link, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import { withStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import FavoriteIcon from '@material-ui/icons/Favorite';

const StyledRating = withStyles({
    iconFilled: {
        color: '#ff6d75',
    },
    iconHover: {
        color: '#ff3d47',
    },
})(Rating);

function getLabelText(value) {
    return `${value} Heart${value !== 1 ? 's' : ''}`;
}

class DetailCard extends Component {

    componentDidMount() {
        this.fetchCurrent();
        this.fetchDemographics();
        this.fetchRatings();
        this.fetchVotes();
        this.fetchStats();
    }

    //fetches the current business details via the detailSaga and stores them in the detailReducer
    fetchCurrent = () => {
        this.props.dispatch({
            type: 'FETCH_CURRENT',
            payload: { id: this.props.match.params.id }
        })
    }

    //fetches the user's rating for the current business via the ratingSaga and stores them in the ratingReducer
    fetchRatings = () => {
        this.props.dispatch({
            type: 'FETCH_RATING',
            payload: {
                business_id: this.props.match.params.id
            }
        })
    }

    //fetches all available demographics via the demographicSaga and stores them in the demographicReducer
    fetchDemographics = () => {
        this.props.dispatch({
            type: 'FETCH_DEMOGRAPHICS'
        })
    }

    //fetches the user's voting history via the voteSaga and stores them in the voteReducer
    fetchVotes = () => {
        this.props.dispatch({
            type: 'FETCH_VOTES',
            payload: {
                business_id: this.props.match.params.id
            }
        })
    }

    //fetches all user's voting history via the statSaga and stores them in the statReducer
    fetchStats = () => {
        this.props.dispatch({
            type: 'FETCH_STATS',
            payload: {
                business_id: this.props.match.params.id
            }
        })
    }

    //sends a post or put request to the ratingSaga, depending on if a previous rating exists for that user/business relationship
    handleRate = (event) => {
        if (this.props.store.ratingReducer.user_rating === undefined) {
            this.props.dispatch({
                type: 'ADD_RATING',
                payload: {
                    user_rating: event.target.value,
                    business_id: this.props.store.detailReducer.id
                }
            })
        } else {
            this.props.dispatch({
                type: 'UPDATE_RATING',
                payload: {
                    user_rating: event.target.value,
                    business_id: this.props.store.detailReducer.id
                }
            })
        }
    }

    //When the StarBorderIcon is clicked, the business id is sent to the database to be added, and the page is re-rendered
    addFavorite = () => {
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

    //when the admin clicks the Edit button, navigates to Edit page
    goToEdit = () => {
        this.props.history.push(`/edit/${this.props.match.params.id}`)
    }

    render() {
        let isFavorite = (this.props.store.favoriteReducer.array_agg.filter((business_id) => { return business_id === this.props.store.detailReducer.id }))

        let adminEdit = () => {
            if (this.props.store.user.access_id === 1) {
                return true
            } else {
                return false
            }
        }

        return (
            <Card className="pageBody detailCard">
                <CardContent>
                    <img className="logo" src={this.props.store.detailReducer.image_url} alt={this.props.store.detailReducer.name + ' logo'} />
                    <Typography className="businessName">
                        {this.props.store.detailReducer.name}
                    </Typography>
                    <Typography>
                        {this.props.store.detailReducer.address}
                    </Typography>
                    <Typography>
                        {this.props.store.detailReducer.city}{', '}{this.props.store.detailReducer.state_code}{' '}{this.props.store.detailReducer.zip}
                    </Typography>
                    <Typography className="businessCategory">
                        {this.props.store.detailReducer.description}
                    </Typography>
                    <Typography>
                        <Link href={this.props.store.detailReducer.business_url}>Go to Website</Link>
                    </Typography>
                    <Link href={this.props.store.detailReducer.google_places_url}>Open in Google Maps</Link>
                    <Typography>
                        Average User Rating:
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <StyledRating name="pristine" disabled={true} value={Number(this.props.store.detailReducer.avg_rating)} getLabelText={getLabelText} precision={1} icon={<FavoriteIcon fontSize="inherit" />} />
                        </Box>
                    </Typography>
                    {this.props.store.detailReducer.verified && <CheckCircleIcon />}
                    {this.props.store.detailReducer.warning && <ReportProblemIcon />}
                    <br />
                    {isFavorite.length > 0 ? <StarIcon onClick={this.removeFavorite} color="primary" /> : <StarBorderIcon onClick={this.addFavorite} color="secondary" />}

                    <CardActions>
                        <Typography>
                            My Rating:
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <StyledRating onChange={this.handleRate} name="customized-color" value={this.props.store.ratingReducer.user_rating} getLabelText={getLabelText} precision={1} icon={<FavoriteIcon fontSize="inherit" />} />
                            </Box>
                        </Typography>
                        {adminEdit() && <Button variant="contained" color="primary" onClick={this.goToEdit}>Edit</Button>}
                    </CardActions>
                </CardContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Demographic</TableCell>
                            <TableCell>Voting Buttons</TableCell>
                            <TableCell>Statistics</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.store.demographicReducer.map((demo) => {
                            return (
                                <VoteTable demographic={demo} key={demo.id} />
                            )
                        })}
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

export default withRouter(connect(mapStateToProps)(DetailCard));