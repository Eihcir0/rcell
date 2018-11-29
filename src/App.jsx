import React, { Component } from 'react';
import ToolBar from './components/Tools/ToolBar'
import Viewport from './components/Viewport/Viewport';
class App extends Component {
    render() {
        return (
            <div className="app">
                <div className="upper section">
                    <div className='menu-bar'>Menus</div>
                    <ToolBar/>
                    <div className='function-bar'>FUNCTION BAR</div>
                </div>
                <Viewport/>
            </div>
        );
    }
}

export default App;