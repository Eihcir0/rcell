import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Cell from '../Cell'

class Row extends React.Component {
    static propTypes = {
        totalCols: PropTypes.number.isRequired,
        row: PropTypes.number.isRequired,
    }

    renderCells = () => {
        let cols = []
        for (let colIdx = 0; colIdx < this.props.totalCols; colIdx++) {
            cols.push(
                <Cell
                    key={colIdx}
                    col={colIdx}
                    row={this.props.row}
                    isCursor={this.props.cursorLocation === colIdx}
                />
            )
        }
        return cols
    }

    render() {
        // console.log('rendering row')
        return (
            <div className="row">
                {this.renderCells()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        totalCols: state.grid.totalCols,
    }
}

export default connect(
    mapStateToProps,
)(Row)