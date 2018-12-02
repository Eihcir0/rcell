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
 * NEEDS REFACTOR!!: 
 *  - Divide up redux state, 
 *  = handlers for key input
 * NEEDS TESTS!
 * UPDATE PROPTYPES (and default props!)
 * 
 * 
 * 
 * keyboard commands - jump left right, copy paste, bold / italic / strikethrough
 * Add listener to screen height/width to invoke action setViewportBottom and Width
 * Then move on to some basic formatting like bold / italic / underline
 * Copy paste
 * Undo
 * 
 * KNOWN BUGS:
 * scroll thing, scrolling down also goes right
 * some weirdness at the far right side
 * Clicking off cell enters value -- on blur?
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

    componentDidMount() {
        window.scroll(0, 0)
        console.log(window.scrollX)
        console.log(window.scrollY)
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