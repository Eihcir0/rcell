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
            rows.push(
                <Row
                    key={rowIdx}
                    row={rowIdx}
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
    }
}

export default connect(
    mapStateToProps,
)(Rows)