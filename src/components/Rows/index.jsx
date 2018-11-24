import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Row from './Row'


class Rows extends React.Component {
    static propTypes = {
        actions: PropTypes.object,
        totalRows: PropTypes.number.isRequired,
    }

    renderRows = () => {
        let rows = []
        for (let rowIdx = 0; rowIdx < this.props.totalRows; rowIdx++) {
            let cursorLocation = this.props.cursorLocation[0] === rowIdx ? this.props.cursorLocation[1] : undefined
            rows.push(
                <Row
                    key={rowIdx}
                    row={rowIdx}
                    cursorLocation={cursorLocation}
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
    return {
        totalRows: state.grid.totalRows,
        cursorLocation: state.grid.cursorLocation,
    }
}

export default connect(
    mapStateToProps,
)(Rows)