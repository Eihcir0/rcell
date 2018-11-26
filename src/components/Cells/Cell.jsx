import React from 'react'
import CellEditor from './CellEditor'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import PropTypes from 'prop-types'
import * as actions from '../../actions/actions'

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
    
    handleChange = () => {
        this.setState({
            flip: true
        })
        setTimeout(()=>{
            this.setState({flip: false})
        }, 100)
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

        return (
            <div className={this.getContainerClass()} onClick={this.handleClick} onDoubleClick={this.handleDoubleClick}>
                <div className={this.getClass()}>
                    {this.props.isEditing && (
                        <CellEditor
                            value={editorValue}
                            row={this.props.row}
                            col={this.props.col}
                            handleChange={this.handleChange}
                        />
                    )}
                    {!this.props.isEditing && this.props.displayValue}
                </div>
            </div>
        )
    }
}

// function mapStateToProps(state) {
    
//     return {
//         // cursorLocation: state.grid.cursorLocation,
//     }
// }

function mapDispatchToProps(dispatch) {
    return {
       actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(
    null,
    mapDispatchToProps,
)(Cell)