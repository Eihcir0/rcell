import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions/actions'
import PropTypes from 'prop-types'
import React from 'react'


class KeyBindings extends React.Component {
    static propTypes = {
        actions: PropTypes.object,
    }

    componentDidMount() {
        window.addEventListener('keydown', this.keydown.bind(this))
    }

    keydown = (e) => {
        console.log(e.keyCode)
        // console.log(this.props.editingLocation);
        
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
        // console.log('here')
        this.props.actions.setEditing({
            row: this.props.cursorLocation[0],
            col: this.props.cursorLocation[1],
            value
        })
    }
    moveCursor = (col, row) => { //extract this same logic used in cellEditor
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