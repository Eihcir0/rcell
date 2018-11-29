import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../redux/actions/actions'
import PropTypes from 'prop-types'
import React from 'react'

import HeaderRow from './Rows/HeaderRow'
import HeaderColumn from './HeaderColumn'
import HeaderCorner from './Cells/HeaderCorner'
import Rows from './Rows/Rows'
import KeyBindings from './KeyBindings'


/** 
 * NEXT STEPS:
 * 
 * Add viewport and viewportHeightWidth to redux and use integers for gods sake (not strings)
 * Implement logic on move:
 *  - When you move to or beyond one or two edges of viewport -- if totalCols/Rows is greater than scroll viewport 1 to that direction

 * REFACTOR!!: 
 *  - Divide up redux state, 
 *  - file structure (redux folder)
 * 
 * Add listener to screen height/width to invoke action setViewPortHeight and Width
 *  - on scroll --> do same redux actions
 * Then move on to keyboard commands
 * Then move on to some basic formatting like bold / italic / underline
 * Copy paste
 * Undo
 * 
 * 
 * */


class Viewport extends React.Component {

    static propTypes = {
        actions: PropTypes.object,
    }

    componentWillMount() {
        this.props.actions.refreshViewportDimensions()
    }

    render() {
        return (
            <div className="viewport">
                <KeyBindings/>
                <HeaderCorner/>
                <HeaderRow/>
                <HeaderColumn/>
                <Rows/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
       actions: bindActionCreators(actions, dispatch),

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Viewport)