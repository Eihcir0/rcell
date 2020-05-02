import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../redux/actions/actions'
import PropTypes from 'prop-types'
import React from 'react'
import debounce from 'lodash/debounce'


import {
    UP,
    DOWN,
    LEFT,
    RIGHT,
} from '../../redux/actions/constants';

const debounced = (fn, wait=0) => {
    return debounce((...args) => {
        fn(...args)
    }, wait)
}


class KeyBindings extends React.Component {
    static propTypes = {
        actions: PropTypes.object,
    }

    keyMap = {}
    
    componentDidMount() {
        window.addEventListener('keydown', this.keyDown.bind(this))
        window.addEventListener('keyup', this.keyUp.bind(this))
        window.addEventListener('wheel', this.wheel.bind(this))
    }

    wheel = (e) => {
        e.preventDefault()
        if (e.deltaX > 10) this.scroll(RIGHT)
        if (e.deltaX < -10) this.scroll(LEFT)
        if (e.deltaY > 10) this.scroll(DOWN)
        if (e.deltaY < -10) this.scroll(UP)
        
    }

    keyUp = (e) => {
        this.removeKey(e.keyCode)
    }

    isCommandKeyPressed = () => {
        return this.keyMap[91] || this.keyMap[93]
    }

    addKey = (key) => {
        this.keyMap[key] = true
    }

    removeKey = (key) => {
        this.keyMap[key] = false
    }
    
    keyDown = (e) => {
        this.addKey(e.keyCode)
        if (this.props.editingLocation && this.props.editingLocation.length) return
        console.log(e.keyCode)
        switch (e.keyCode) {
            case 37: //left
            e.preventDefault()
                if (this.keyMap[18]) {
                    this.scroll(LEFT)
                } else if (this.isCommandKeyPressed()) {
                    this.jump(LEFT)
                } else {
                    this.moveCursor(-1, 0)
                }
            break;
            case 38: // up
                e.preventDefault()
                if (this.keyMap[18]) {
                    this.scroll(UP)
                } else if (this.isCommandKeyPressed()) {
                    this.jump(UP)
                } else {
                    this.moveCursor(0, -1)
                }
                break;
            case 39: //right
                e.preventDefault()
                if (this.keyMap[18]) {
                    this.scroll(RIGHT)
                } else if (this.isCommandKeyPressed()) {
                    this.jump(RIGHT)
                } else {
                    this.moveCursor(1, 0)
                }
                break;
            case 40: // down
                e.preventDefault()
                if (this.keyMap[18]) {
                    this.scroll(DOWN)
                } else if (this.isCommandKeyPressed()) {
                    this.jump(DOWN)
                } else {
                    this.moveCursor(0, 1)
                }
                break;
            case 9: //Tab
                e.preventDefault()
                if (this.keyMap[16]) {
                    this.moveCursor(-1, 0)
                } else {
                    this.moveCursor(1, 0)
                }
                break;
            case 8: //Backspace
                e.preventDefault()
                this.handleBackspace()
                break;
            case 13:
                e.preventDefault()
                this.enterEdit()
                break;
            default:
                break;
        }
    }

    handleBackspace = () => {
        this.enterEdit('')
    }

    enterEdit = (value=undefined) => {
        this.props.actions.setEditing({
            row: this.props.cursorLocation[0],
            col: this.props.cursorLocation[1],
            value
        })
    }

    jump = (direction) => {
        this.props.actions.jump(direction)
    }

    
    _moveCursor = (col, row) => {
        const { cursorLocation, actions } = this.props
        const newLocation = [row + cursorLocation[0], col + cursorLocation[1]]
        actions.setCursor(...newLocation)
    }
    
    _scroll = (direction) => {
        this.props.actions.scroll(direction)
    }

    scroll = debounced(this._scroll).bind(this)
    moveCursor = debounced(this._moveCursor).bind(this)

    render() {
        return null
    }
}

function mapStateToProps(state) {
    return {
        cursorLocation: state.grid.cursorLocation,
        editingLocation: state.grid.editingLocation,
    }
}

function mapDispatchToProps(dispatch) {
    return {
       actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KeyBindings)