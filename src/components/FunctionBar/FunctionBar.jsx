import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ReactComponent as FunctionIcon } from "./formula-icon.svg"



class FunctionBar extends React.Component {
    static propTypes = {
    }
    render() {
        return (
            <div className='function-bar'>
                <div className="function-icon-container">
                    <FunctionIcon className="function-icon"/>
                </div>
                <div className="function-display">
                    {this.props.displayValue}
                </div>
            </div>

        )
    }
}


function mapStateToProps({ grid }) {
    const { cursorLocation, values} = grid
    return {
        displayValue: values[cursorLocation[0]][cursorLocation[1]].enteredValue || ''
    }
}

export default connect(
    mapStateToProps
)(FunctionBar)