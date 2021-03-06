import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Row from './Row'


class Rows extends React.Component {
    static propTypes = {
        actions: PropTypes.object,
        totalRows: PropTypes.number.isRequired,
        cursorLocation: PropTypes.array,
        editingLocation: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.bool,
        ]),
        values: PropTypes.array,
    }

    isEditing = (rowIdx) => {
        return this.props.editingLocation && this.props.editingLocation.length && this.props.editingLocation[0] === rowIdx
    }

    getRowProps = (rowIdx) => {
        const cursorLocation = this.props.cursorLocation[0] === rowIdx ? this.props.cursorLocation[1] : undefined
        let editingLocation
        let cellEditorStartingValue
        if (this.isEditing(rowIdx)) {
            editingLocation = this.props.editingLocation[1]
            cellEditorStartingValue = this.props.cellEditorStartingValue
        }
        return {
            cursorLocation,
            editingLocation,
            cellEditorStartingValue,
        }
    }

    totalViewportRows = () => {
        const viewportRows = this.props.viewportBottom + this.props.viewport[0]
        return Math.min(this.props.totalRows, viewportRows)
    }

    renderRows = () => {
        const rows = []
        for (let rowIdx = this.props.viewport[0]; rowIdx < this.totalViewportRows(); rowIdx++) {
            const {
                cursorLocation,
                editingLocation,
                cellEditorStartingValue,
            } = this.getRowProps(rowIdx)

            rows.push(
                <Row
                    key={rowIdx}
                    row={rowIdx}
                    editingLocation={editingLocation}
                    cursorLocation={cursorLocation}
                    values={this.props.values[rowIdx]}
                    cellEditorStartingValue={cellEditorStartingValue}
                    viewport={this.props.viewport[1]}
                    viewportRight={this.props.viewportRight}
                />
            )
        }
        return rows
    }

    render() {
        return (
            <div className="rows">
                {this.renderRows()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    
    return {
        totalRows: state.grid.totalRows,
        cursorLocation: state.grid.cursorLocation,
        editingLocation: state.grid.editingLocation,
        cellEditorStartingValue: state.grid.cellEditorStartingValue,
        values: state.grid.values,
        viewport: state.grid.viewport,
        heights: state.grid.heights,
        viewportBottom: state.grid.viewportBottom,
        viewportRight: state.grid.viewportRight,
    }
}

export default connect(
    mapStateToProps,
)(Rows)