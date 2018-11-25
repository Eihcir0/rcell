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

    getClass = () => {
        return this.props.isCursor ? 'cell cursor' : 'cell'

    }

    render() {
        // console.log('cellrender' + this.props.col + ' ' + this.props.row);
        // console.log(new Date())
        const value = this.props.startingValue === undefined ? this.props.value : this.props.startingValue
        return (
            <div className={this.getClass()}>
                {this.props.isEditing && (
                    <CellEditor
                        value={value}
                        row={this.props.row}
                        col={this.props.col}
                    />
                )}
                {!this.props.isEditing && this.props.value}

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