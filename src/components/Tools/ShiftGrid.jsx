import React from 'react'

export default ({ gridShifted, actions }) => {
    return (
        <button
            className="grid-shift-button"
            onClick={actions.toggleShiftGrid}
        >
            {gridShifted ? 'unshift' : 'shiftGrid'}
        </button>
    )
}

