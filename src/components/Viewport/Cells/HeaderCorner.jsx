import React from 'react'
import PropTypes from 'prop-types'

import HeaderCell from './HeaderCell'

export default class HeaderCorner extends HeaderCell {
    static propTypes = {
        actions: PropTypes.object,
    }


    render() {
        return (
            <div className="header-cell corner">
            </div>
        )
    }
}
