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

    renderRows = () => {
        const rows = []
        for (let rowIdx = 0; rowIdx < this.props.totalRows; rowIdx++) {
            
            const {
                cursorLocation,
                editingLocation,
                cellEditorStartingValue,
            } = this.getRowProps(rowIdx)

            rows.push(
                <Row
                    key={rowIdx}
                    row={rowIdx}
                    cursorLocation={cursorLocation}
                    editingLocation={editingLocation}
                    values={this.props.values[rowIdx]}
                    cellEditorStartingValue={cellEditorStartingValue}
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
    }
}

export default connect(
    mapStateToProps,
)(Rows)