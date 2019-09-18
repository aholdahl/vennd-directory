import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, CardContent, CardActionArea, Typography, CardActions, IconButton, Grid } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import { withStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import FavoriteIcon from '@material-ui/icons/Favorite';

function getLabelText(value) {
    return `${value} Heart${value !== 1 ? 's' : ''}`;
}

const StyledRating = withStyles({
    iconFilled: {
        color: '#ff6d75',
    },
    iconHover: {
        color: '#ff3d47',
    },
})(Rating);

class SearchList extends Component {
    componentDidMount(){
        this.fetchFavorite();
    }

    // //saves the list of available favorites via favoriteSaga to the favoriteReducer
    fetchFavorite = () => {
        this.props.dispatch({
            type: 'FETCH_FAVORITE',
        })
    }

    //When a business is clicked, user is taken to the Detail page
    handleSelect = () => {
        this.props.history.push(`/detail/${this.props.business.id}`)
    }

    render() {

        let isFavorite = (this.props.store.favoriteReducer.array_agg.filter((business_id) => { return business_id === this.props.business.id }))

        return (
            <Grid item xs={4} className="pageBody">
                <Card className="businessCard">
                    <CardContent onClick={this.handleSelect}>
                        <CardActionArea>
                            <img className="thumbnail" alt={this.props.business.name + ' logo'} src={this.props.business.image_url} />
                            <Typography className="businessName">
                                {this.props.business.name}
                            </Typography>
                        </CardActionArea>
                        <Typography>
                            {this.props.business.address}{' '}{this.props.business.city}{', '}{this.props.business.state_code}{' '}{this.props.business.zip}
                        </Typography>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <StyledRating name="pristine" disabled="true" value={this.props.business.avg_rating} getLabelText={getLabelText} precision={1} icon={<FavoriteIcon fontSize="inherit"/>} />
                        </Box>
                    </CardContent>
                    <CardActions>
                        {isFavorite.length > 0 ? <StarIcon /> : <StarBorderIcon />}
                        <IconButton>
                            {this.props.business.verified && <CheckCircleIcon />}
                        </IconButton>
                        <IconButton>
                            {this.props.business.warning && <ReportProblemIcon />}
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        store
    }
}

export default withRouter(connect(mapStateToProps)(SearchList));