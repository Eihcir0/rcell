import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions/actions'
import PropTypes from 'prop-types'
import React from 'react'

import HeaderRow from './Rows/HeaderRow'
import HeaderColumn from './HeaderColumn'
import HeaderCorner from './Cells/HeaderCorner'
import Rows from './Rows/Rows'
import KeyBindings from './KeyBindings'

class Grid extends React.Component {
    static propTypes = {
        actions: PropTypes.object,
    }

    render() {
        return (
            <div className="grid">
                <KeyBindings/>
                <HeaderCorner/>
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
       actions: bindActionCreators(actions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Grid)