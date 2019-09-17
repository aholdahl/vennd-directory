import React, { Component } from 'react';
import { connect } from 'react-redux';

class ManageUsers extends Component {
    componentDidMount(){
        this.props.dispatch({
            type: 'FETCH_USER_LIST'
        })
    }

    render(){
        return (
            <div>
            <h1>Hello Admin</h1>
            <code>{JSON.stringify(this.props.store.adminReducer)}</code>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        store
    }
}

export default connect(mapStateToProps)(ManageUsers);