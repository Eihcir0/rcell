import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import HeaderCell from '../Cells/HeaderCell'

class HeaderRow extends React.Component {
    static propTypes = {
        actions: PropTypes.object,
        totalCols: PropTypes.number.isRequired,
    }

    totalDisplayCols = () => {
        return Math.min(this.props.totalCols, this.props.viewportRight)
    }

    renderHeaderCells = () => {
        let cols = []
        for (let colIdx = this.props.viewport[1]; colIdx < this.totalDisplayCols(); colIdx++) {
            cols.push(
                <HeaderCell
                    type={'col'}
                    key={colIdx}
                    col={colIdx}
                    colWidth={this.props.widths[colIdx]}
                    isCursor={colIdx === this.props.cursorLocation[1]}
                />
            )
        }

        return cols
    }

    render() {
        return (
            <div className="header-row">
                {this.renderHeaderCells()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        totalCols: state.grid.totalCols,
        cursorLocation: state.grid.cursorLocation,
        widths: state.grid.widths,
        viewport: state.grid.viewport,
        viewportRight: state.grid.viewportRight,
    }
}

export default connect(
    mapStateToProps,
)(HeaderRow)