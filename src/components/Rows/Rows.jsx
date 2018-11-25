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

    renderRows = () => {
        const rows = []
        for (let rowIdx = 0; rowIdx < this.props.totalRows; rowIdx++) {
            const cursorLocation = this.props.cursorLocation[0] === rowIdx ? this.props.cursorLocation[1] : undefined
            const editingLocation = this.props.editingLocation && this.props.editingLocation.length && this.props.editingLocation[0] === rowIdx ? this.props.editingLocation[1] : undefined
            rows.push(
                <Row
                    key={rowIdx}
                    row={rowIdx}
                    cursorLocation={cursorLocation}
                    editingLocation={editingLocation}
                    values={this.props.values[rowIdx]}
                    startingValue={editingLocation && this.props.startingValue}
                />
            )
        }
        return rows
    }

    render() {
        // console.log('rendering rows')
        return (
            <div className="rows">
                {this.renderRows()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    
    return {
        totalRows: state.grid.totalRows,
        cursorLocation: state.grid.cursorLocation,
        editingLocation: state.grid.editingLocation,
        startingValue: state.grid.startingValue,
        values: state.grid.values,
    }
}

export default connect(
    mapStateToProps,
)(Rows)