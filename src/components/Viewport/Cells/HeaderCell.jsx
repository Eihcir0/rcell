import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../redux/actions/actions'
import { colLetterFromNumber } from '../../../magic/helpers/formulaHelpers'


class HeaderCell extends React.Component {  // wish this could extend cell.jsx
    static propTypes = {
        actions: PropTypes.object,
        row: PropTypes.number,
        col: PropTypes.number,
        type: PropTypes.string.isRequired,
    }
    
    renderLabel = () => {
        const { type, col, row } = this.props
        if (type === 'col') {
            return colLetterFromNumber(col)
        } else if (type === 'row') {
            return row + 1
        }
    }

    getClass = () => {
        let className = `header-cell ${this.props.type}`
        const value = this.props.type === 'col' ? this.props.col : this.props.row
        className += ` color${value % 8}${this.props.type}`
        if (this.props.isCursor) {
            className += ' header-cursor'
        }
        return className

    }

    getStyle = () => {
        return {
            width: `${this.props.colWidth}px`
        }
    }

    render() {
        return (
            <div className={this.getClass()} style={this.getStyle()}>
                {this.renderLabel()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        gridShifted: state.grid.gridShifted,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderCell)  // Instead of making all header cells have to connect, can I make a SelectAll cell which extends HeaderCell?