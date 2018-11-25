import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../actions/actions'
import HeaderCell from './Cells/HeaderCell'

class HeaderColumn extends React.Component {
    static propTypes = {
        actions: PropTypes.object,
        cursorLocation: PropTypes.array
    }

    renderHeaderCells = () => {
        let cols = []
        for (let rowIdx = 0; rowIdx < this.props.totalRows; rowIdx++) {
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
        console.log('rendering header column')
        return (
            <div className="header-column">
                {this.renderHeaderCells()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {
        totalRows,
    } = state.grid
    return {
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