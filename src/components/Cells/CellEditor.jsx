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

    handleChange =  (e) => {
        console.log('handlechange', e.target.value)
        this.cursor = e.target.selectionStart;
        this.setState({ value: e.target.value });
    }

    handleEnter = ()=> {
        const { row, col, } = this.props
        const { value } = this.state
        this.props.actions.setValue({ value, row, col }) // make it a promise here?
        this.props.actions.setEditing(false)
    }
    
    handleKeyPress = (e) => {
        console.log('charcode', e.charCode)
        switch (e.charCode) {
            case 13:
                this.handleEnter()
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
                    type="text" 
                    value={this.state.value}
                    onChange={this.handleChange} 
                    onKeyPress={this.handleKeyPress}
                    autoFocus
                    // onChange={this.handleChange}
                    onFocus={this.onFocus}
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