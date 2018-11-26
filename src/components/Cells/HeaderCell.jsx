import React from 'react'
import PropTypes from 'prop-types'


const ABCS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const getColLabel = (num) => {
    //this needs tlc
    if (!Number.isInteger(num)) return
    if (num <= 25) return ABCS[(num + 1)]
    const base26 = `${parseInt(String(num)).toString(26)}`.split('')
    base26[0] -= 1
    const letters = []
    for (let number of base26) {
        letters.push(ABCS[(parseInt(number, 26) + 1)])
    }
    return letters.join('')
}

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
            return getColLabel(col)
        } else if (type === 'row') {
            return row + 1
        } else if (type === 'selectAll') {
            return null
        }
    }

    getClass = () => {
        let className = `header-cell header-cell-${this.props.type}`
        const value = this.props.type === 'col' ? this.props.col : this.props.row
        className += ` color${value % 8}${this.props.type}`
        return className

    }

    render() {
        return (
            <div className={this.getClass()}>
                {this.renderLabel()}
            </div>
        )
    }
}
