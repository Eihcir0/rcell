import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../redux/actions/actions'
import PropTypes from 'prop-types'
import React from 'react'
import _debounce from 'lodash.debounce'

const doSomething = (scroll_posX, scroll_posY) => {
    console.log(scroll_posX, scroll_posY)
}


class KeyBindings extends React.Component {
    static propTypes = {
        actions: PropTypes.object,
    }


    
    last_known_scrollY_position = 0
    last_known_scrollX_position = 0
    ticking = false
    
    componentDidMount() {
        window.addEventListener('keydown', this.keydown.bind(this))
        
        
        window.addEventListener('scroll', function (e) {
            
            this.last_known_scrollY_position = window.scrollY;
            this.last_known_scrollX_position = window.scrollX;
            
            if (!this.ticking) {
                
                window.requestAnimationFrame(() => {
                    doSomething(this.last_known_scrollY_position, this.last_known_scrollX_position);
                    this.ticking = false;
                });
                
                this.ticking = true;
                
            }
            
        })
    
    }
    
    keydown = (e) => {
        if (this.props.editingLocation && this.props.editingLocation.length) return
        switch (e.keyCode) {
            case 37:
            e.preventDefault()
            this.moveCursor(-1, 0)
            break;
            case 38:
            e.preventDefault()
            this.moveCursor(0, -1)
                break;
            case 39:
                e.preventDefault()
                this.moveCursor(1, 0)
                break;
            case 40:
                e.preventDefault()
                this.moveCursor(0, 1)
                break;
            case 9: //Tab
                e.preventDefault()
                this.moveCursor(1, 0)
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

    moveCursor = _debounce(
        (row,col) => {
            this._moveCursor(row,col)
        },
        1,
    ).bind(this)

    _moveCursor = (col, row) => {
        const { cursorLocation, actions } = this.props
        const newLocation = [row + cursorLocation[0], col + cursorLocation[1]]
        actions.setCursor(...newLocation)
    }

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