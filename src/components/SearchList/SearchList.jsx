import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, CardContent, CardActionArea, Typography, Grid } from '@material-ui/core';
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
    // componentDidMount() {
    //     this.fetchFavorite();
    // }
    //
    // // //saves the list of available favorites via favoriteSaga to the favoriteReducer
    // fetchFavorite = () => {
    //     this.props.dispatch({
    //         type: 'FETCH_FAVORITE',
    //     })
    // }

    //When a business is clicked, user is taken to the Detail page
    handleSelect = () => {
        this.props.history.push(`/detail/${this.props.business.id}`)
    }
    // 
    render() {
        //maps over favoriteReducer to allow conditional rendering of star icon
        let favoriteFilter = (this.props.store.favoriteReducer.array_agg.filter((business_id) => { return business_id === this.props.business.id }))
        // let isFavorite = ()=>{
        //     if(favoriteFilter.length>0){
        //         return true
        //     } else {
        //         return false
        //     }
        // }

        return (
            <Grid item s={6} m={4} className="pageBody">
                <Card className="businessCard">
                    <CardContent onClick={this.handleSelect}>
                        <CardActionArea title={`Click here to view more information about ${this.props.business.name}`}>
                            <img className="thumbnail" alt={this.props.business.name + ' logo'} src={this.props.business.image_url} />
                        </CardActionArea>
                            <Typography title="business name">
                                {this.props.business.name}
                            </Typography>
                        <Typography title="business address">
                            {this.props.business.address}
                        <br/>
                            {this.props.business.city}{', '}{this.props.business.state_code}{' '}{this.props.business.zip}
                        </Typography>
                        <Typography title="category" className="businessCategory">
                            {this.props.business.description}
                        </Typography>
                        {favoriteFilter.length>0 ? <StarIcon title="Favorite status: active"/> : <StarBorderIcon title="Favorite status: inactive"/>}
                        {this.props.business.verified && <CheckCircleIcon title="This business has been verified by an administrator."/>}
                        {this.props.business.warning && <ReportProblemIcon title="This business has been flagged for moderation."/>}
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography>Avg Rating: </Typography>
                            <StyledRating title={`The average user rating for ${this.props.business.name} is ${this.props.business.avg_rating}`} name="pristine" disabled={true} value={Number(this.props.business.avg_rating)} getLabelText={getLabelText} precision={1} icon={<FavoriteIcon fontSize="inherit" />} />
                        </Box>
                    </CardContent>
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