import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../actions/actions'
import HeaderCell from './Cell/HeaderCell'

class HeaderColumn extends React.Component {
    static propTypes = {
        actions: PropTypes.object,
        cursorLocation: PropTypes.array
    }

    renderHeaderCells = () => {
        console.log('HeaderColumn', this.props.totalRows)
        let cols = []
        for (let rowIdx = 0; rowIdx < this.props.totalRows; rowIdx++) {
            console.log(rowIdx)
            cols.push(
                <HeaderCell
                    type={'row'}
                    key={rowIdx}
                    row={rowIdx}
                />
            )
        }
        return cols
    }


    render() {
        return (
            <div className="header-column">
                {this.renderHeaderCells()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {
        cursorLocation,
        totalRows,
    } = state.grid
    return {
        cursorLocation,
        totalRows,
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
)(HeaderColumn)