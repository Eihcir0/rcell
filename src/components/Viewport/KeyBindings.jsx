import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../redux/actions/actions'
import PropTypes from 'prop-types'
import React from 'react'
import _debounce from 'lodash.debounce'

const debounced = (fn, wait=0) => {
    return _debounce((...args) => {
        fn(...args)
    }, wait)
}


class KeyBindings extends React.Component {
    static propTypes = {
        actions: PropTypes.object,
    }


    
    last_known_scrollY_position = 0
    last_known_scrollX_position = 0
    ticking = false

    keyMap = {}
    
    componentDidMount() {
        window.addEventListener('keydown', this.keyDown.bind(this))
        window.addEventListener('keyup', this.keyUp.bind(this))
        window.addEventListener('wheel', this.wheel.bind(this))
    }

    wheel = (e) => {
        e.preventDefault()
        if (e.deltaX > 5) this.scrollRight()
        if (e.deltaX < -5) this.scrollLeft()
        if (e.deltaY > 5) this.scrollDown()
        if (e.deltaY < -5) this.scrollUp()
        
    }

    keyUp = (e) => {
        this.removeKey(e.keyCode)
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
                    this.scrollLeft()
                } else if (this.keyMap[91]) {
                    this.jump('left')
                } else {
                    this.moveCursor(-1, 0)
                }
            break;
            case 38: // up
                e.preventDefault()
                if (this.keyMap[18]) {
                    this.scrollUp()
                } else if (this.keyMap[91]) {
                    this.jump('up')
                } else {
                    this.moveCursor(0, -1)
                }
                break;
            case 39: //right
                e.preventDefault()
                if (this.keyMap[18]) {
                    this.scrollRight()
                } else if (this.keyMap[91]) {
                    this.jump('right')
                } else {
                    this.moveCursor(1, 0)
                }
                break;
            case 40: // down
                e.preventDefault()
                if (this.keyMap[18]) {
                    this.scrollDown()
                } else if (this.keyMap[91]) {
                    this.jump('down')
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
        console.log(direction)
    }

    
    _moveCursor = (col, row) => {
        const { cursorLocation, actions } = this.props
        const newLocation = [row + cursorLocation[0], col + cursorLocation[1]]
        actions.setCursor(...newLocation)
    }
    
    _scrollRight = (col, row) => {
        this.props.actions.scrollRight()
    }
    
    _scrollLeft = (col, row) => {
        this.props.actions.scrollLeft()
    }
    
    _scrollDown = (col, row) => {
        this.props.actions.scrollDown()
    }
    
    _scrollUp = (col, row) => {
        this.props.actions.scrollUp()
    }

    scrollRight = debounced(this._scrollRight).bind(this)
    scrollLeft = debounced(this._scrollLeft).bind(this)
    scrollDown = debounced(this._scrollDown).bind(this)
    scrollUp = debounced(this._scrollUp).bind(this)
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