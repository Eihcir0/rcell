import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../../redux/actions/actions'
import HeaderCell from './Cells/HeaderCell'

class HeaderColumn extends React.Component {
    static propTypes = {
        actions: PropTypes.object,
        cursorLocation: PropTypes.array
    }

    totalViewportRows = () => {
        const viewportRows = this.props.viewportBottom + this.props.viewport[0]
        return Math.min(this.props.totalRows, viewportRows)
    }

    renderHeaderCells = () => {
        let cols = []
        for (let rowIdx = this.props.viewport[0]; rowIdx < this.totalViewportRows(); rowIdx++) {
            cols.push(
                <HeaderCell
                    type={'row'}
                    key={rowIdx}
                    row={rowIdx}
                    isCursor={rowIdx === this.props.cursorLocation[0]}
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
    return {
        totalRows: state.grid.totalRows,
        cursorLocation: state.grid.cursorLocation,
        viewport: state.grid.viewport,
        viewportBottom: state.grid.viewportBottom,
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