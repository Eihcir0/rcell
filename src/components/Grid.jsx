import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions/actions'
import PropTypes from 'prop-types'
import React from 'react'

import HeaderRow from './Rows/HeaderRow'
import HeaderColumn from './HeaderColumn'
import HeaderCell from './Cell/HeaderCell'
import Rows from './Rows'
import KeyBindings from './KeyBindings'

class Grid extends React.Component {
    static propTypes = {
        actions: PropTypes.object,
    }

    render() {
        // console.log('rendering grid')
        return (
            <div className="grid">
                <KeyBindings/>
                <HeaderCell type="selectAll"/>
                <HeaderRow/>
                <HeaderColumn/>
                <Rows/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
       actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Grid)