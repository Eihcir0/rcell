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
        // if (this.state.editingPosition) return
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
            // case 13:
            //     e.preventDefault()
            //     console.log('here')
            //     this.setState((prevState) => {
            //         return (
            //             { editingPosition: prevState.cursorPosition }
            //         )
            //     })
            //     break;
            default:
                break;
        }
    }

    moveCursor = (col, row) => {
        const { cursorLocation, actions } = this.props
        const newLocation = [row + cursorLocation[0], col + cursorLocation[1]]
        actions.setCursor(newLocation)

    }

    render() {
        return null
    }
}

function mapStateToProps(state) {
    return {
        cursorLocation: state.grid.cursorLocation,
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