import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import PropTypes from 'prop-types'
import * as actions from '../../../redux/actions/actions'

class CellEditor extends React.PureComponent {
    static propTypes = {
        actions: PropTypes.object,
        isEditing: PropTypes.bool,
        value: PropTypes.string,
        row: PropTypes.number,
        col: PropTypes.number,
    }

    ref = React.createRef()

    state = {
        value: this.props.value,
    }

    handleChange =  (e) => {
        this.cursor = e.target.selectionStart;
        this.setState({ value: e.target.value });
    }

    handleEnter = ()=> {
        const { row, col, } = this.props
        const { value } = this.state
        this.props.actions.setEditing({ off: true })
        this.props.actions.setValue({ value, row, col }) // make it a promise here?
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

    handleArrow = (e) => {
        const { row, col, } = this.props
        const { value } = this.state
        this.props.actions.setValue({ value, row, col })
        this.props.actions.setEditing({off: true})
        this.props.handleChange()
    }

    handleKeyPress = (e) => {
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
        switch (e.key) {
            case 'Tab':
            e.preventDefault()
                this.handleTab()
                break;

            case 'ArrowDown':
            e.preventDefault()
                this.handleArrow()
                break;

            case 'ArrowLeft':
                if (this.ref.current.selectionStart == 0) {
                    e.preventDefault()
                    this.handleArrow()
                }
                break;

            case 'ArrowUp':
            e.preventDefault()
                this.handleArrow()
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
        console.log(this.state, this.state.value)
        return (
            <div className={this.getClass()}>
                <input
                    ref={this.ref}
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

function mapDispatchToProps(dispatch) {
    return {
       actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(
    null,
    mapDispatchToProps,
)(CellEditor)