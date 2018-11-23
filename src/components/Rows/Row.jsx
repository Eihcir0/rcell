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
        console.log(this.props.totalCols)
        let cols = []
        for (let colIdx = 0; colIdx < this.props.totalCols; colIdx++) {
            cols.push(
                <Cell
                    key={colIdx}
                    col={colIdx}
                    row={this.props.row}
                />
            )
        }
        return cols
    }

    render() {
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