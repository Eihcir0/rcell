import React from 'react'
import CellEditor from './CellEditor'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import PropTypes from 'prop-types'
import * as actions from '../../../redux/actions/actions'

class Cell extends React.Component {
    static propTypes = {
        actions: PropTypes.object,
        isCursor: PropTypes.bool,
        isEditing: PropTypes.bool,
        row: PropTypes.number.isRequired,
        col: PropTypes.number.isRequired,
    }

    state = {
        flip: false,
    }

    getClass = () => {
        let className = this.props.isCursor ? 'cell cursor' : 'cell'
        return className
        
    }
    
    getContainerClass = () => {
        let className = 'cell-container'
        if (this.state.flip) className += ' flip'
        return className    
    }

    setFlip = () => {
        this.setState({
            flip: true
        })
        setTimeout(()=>{
            this.setState({flip: false})
        }, 1000)
    }
    
    handleChange = () => {
        this.setFlip()
    }

    handleClick = () => {
        const { row, col, actions, isCursor } = this.props
        if (!isCursor) actions.setCursor(row, col)
    }
    
    handleDoubleClick = () => {
        const { row, col, actions, isEditing } = this.props
        if (!isEditing) {
            actions.setCursor(row, col)
            actions.setEditing({ row, col })
        }
    }

    render() {
        const editorValue = [undefined].includes(this.props.cellEditorStartingValue) ? this.props.enteredValue : this.props.cellEditorStartingValue
        const style = {
            width: `${this.props.colWidth}px`
        }
        return (
            <div className={this.getContainerClass()} onClick={this.handleClick} onDoubleClick={this.handleDoubleClick} style={style}>
                <div className={this.getClass()}>
                    {this.props.isEditing && (
                        <CellEditor
                            value={editorValue}
                            row={this.props.row}
                            col={this.props.col}
                            handleChange={this.handleChange}
                        />
                    )}
                    {!this.props.isEditing && (
                        <div className="cell-display">
                            {this.props.displayValue}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
       actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(
    null,
    mapDispatchToProps,
)(Cell)