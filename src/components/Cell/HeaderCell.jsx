import React from 'react'
import PropTypes from 'prop-types'


const ABCS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const getColLabel = (num) => {
    //this needs tlc
    if (!Number.isInteger(num)) return
    if (num <= 25) return ABCS[(num + 1)]
    const base26 = `${parseInt(String(num)).toString(26)}`.split('')
    base26[0] -= 1
    console.log(base26)
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

    render() {
        console.log('rendering headerCell')
        return (
            <div className={`header-cell header-cell-${this.props.type}`}>
                {this.renderLabel()}
            </div>
        )
    }
}
