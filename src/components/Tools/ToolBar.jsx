import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ShiftGrid from './ShiftGrid'

import * as actions from '../../redux/actions/actions'


class ToolBar extends React.Component {
    static propTypes = {
        actions: PropTypes.object,
        gridShifted: PropTypes.bool,
    }
    render() {
        return (
            <div className='tool-bar'>
                <ShiftGrid
                    gridShifted={this.props.gridShifted}
                    actions={this.props.actions}
                />
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        gridShifted: state.grid.gridShifted,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ToolBar)