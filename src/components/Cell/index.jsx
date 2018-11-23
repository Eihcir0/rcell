import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import PropTypes from 'prop-types'
import * as actions from '../../actions/actions'

class Cell extends React.Component {
    static propTypes = {
        actions: PropTypes.object,
        cursorLocation: PropTypes.array,
        row: PropTypes.number.isRequired,
        col: PropTypes.number.isRequired,
    }
    
    isCursor = () => {
        const {
            cursorLocation,
            col,
            row,
        } = this.props

        return (
            cursorLocation[0] === row &&
            cursorLocation[1] === col
        ) 
    }

    getClass = () => {
        return this.isCursor() ? 'cell cursor' : 'cell'

    }

    renderCell = () => {
        return null
    }

    render() {
        return (
            <div className={this.getClass()}>
                {this.renderCell()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cursorLocation: state.grid.cursorLocation,
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
)(Cell)