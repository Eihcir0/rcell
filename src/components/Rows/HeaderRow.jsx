import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import HeaderCell from '../Cells/HeaderCell'

class HeaderRow extends React.Component {
    static propTypes = {
        actions: PropTypes.object,
        totalCols: PropTypes.number.isRequired,
    }

    renderHeaderCells = () => {
        let cols = []
        for (let colIdx = 0; colIdx < this.props.totalCols; colIdx++) {
            cols.push(
                <HeaderCell
                    type={'col'}
                    key={colIdx}
                    col={colIdx}
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
    }
}

export default connect(
    mapStateToProps,
)(HeaderRow)