import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import PropTypes from 'prop-types'
import * as actions from '../../actions/actions'

class CellEditor extends React.PureComponent {
    static propTypes = {
        actions: PropTypes.object,
        isEditing: PropTypes.bool,
        value: PropTypes.string,
        row: PropTypes.number,
        col: PropTypes.number,
    }

    state = {
        value: this.props.value,
    }

    componentDidMount() {
        this.props.actions.resetStartingValue()
    }

    handleChange =  (e) => {
        console.log('handlechange', e.target.value)
        this.cursor = e.target.selectionStart;
        this.setState({ value: e.target.value });
    }
    
    handleEnter = ()=> {
        const { row, col, } = this.props
        const { value } = this.state
        this.props.actions.setValue({ value, row, col }) // make it a promise here?
        this.props.actions.setEditing({ off: true })
        this.props.handleChange()
    }
    
    handleEsc = (e) => {
        this.props.actions.setEditing({off: true})
    }
    
    handleTab = (e) => {
        const { row, col, } = this.props
        const { value } = this.state
        this.props.actions.setValue({ value, row, col })
        this.props.actions.setEditing({off: true})
        this.props.handleChange()
    }
    
    handleKeyPress = (e) => {
        console.log('handling keypress')
        console.log('charcode', e.charCode)
        console.log('keycode', e.keyCode)
        console.log('key', e.key)
        switch (e.charCode) {
            case 13:
            e.preventDefault()
            this.handleEnter()
            break;
            
            default:
            break;
        }
    }
    
    handleKeyDown = (e) => {
        //change to using descriptive `key` not keycode
        console.log('handling keydown')
        console.log('charcode', e.charCode)
        console.log('keycode', e.keyCode)
        console.log('key', e.key)
        switch (e.key) {
            case 'Tab':
            e.preventDefault()
                this.handleTab()
                break;
        
            case 'Escape':
            e.preventDefault()
                this.handleEsc()
                break;
        
            default:
                break;
        }
    }

    getClass = () => {
        return ''

    }

    render() {
        // console.log('cellrender' + this.props.col + ' ' + this.props.row);
        // console.log(new Date())
        
        return (
            <div className={this.getClass()}>
                <input 
                    className="cell-editor-input"
                    type="text" 
                    value={this.state.value}
                    onChange={this.handleChange} 
                    onKeyPress={this.handleKeyPress}
                    onKeyDown={this.handleKeyDown}
                    autoFocus
                    // onChange={this.handleChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    
    return {
        // cursorLocation: state.grid.cursorLocation,
    }
}

function mapDispatchToProps(dispatch) {
    return {
       actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CellEditor)