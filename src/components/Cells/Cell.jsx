import React from 'react'
import CellEditor from './CellEditor'
// import {bindActionCreators} from 'redux'
// import {connect} from 'react-redux'

import PropTypes from 'prop-types'
// import * as actions from '../../actions/actions'

export default class Cell extends React.Component {
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
        }, 300)
    }

    render() {
        // console.log('cellrender' + this.props.col + ' ' + this.props.row);
        // console.log(new Date())
        const value = this.props.startingValue === undefined ? this.props.value : this.props.startingValue
        return (
            <div className={this.getContainerClass()}>
                <div className={this.getClass()}>
                    {this.props.isEditing && (
                        <CellEditor
                            value={value}
                            row={this.props.row}
                            col={this.props.col}
                            handleChange={this.handleChange}
                        />
                    )}
                    {!this.props.isEditing && this.props.value}
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

// function mapDispatchToProps(dispatch) {
//     return {
//        actions: bindActionCreators(actions, dispatch)
//     }
// }

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
// )(Cell)