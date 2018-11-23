import React from 'react'
import PropTypes from 'prop-types'


const ABCS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default class HeaderCell extends React.Component {
    static propTypes = {
        actions: PropTypes.object,
        row: PropTypes.number,
        col: PropTypes.number,
        type: PropTypes.string.isRequired,
    }
    
    renderLabel = () => {
        const { type, col, row } = this.props
        if (type === 'col') {
            return ABCS[col]
        } else if (type === 'row') {
            return row + 1
        } else if (type === 'selectAll') {
            return null
        }
    }

    render() {
        console.log('rendering headerCell')
        return (
            <div className={`header-cell header-cell-${this.props.type}`}>
                {this.renderLabel()}
            </div>
        )
    }
}
