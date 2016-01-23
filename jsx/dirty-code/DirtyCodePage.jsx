import React from 'react'
import dirtyCode from './dirtyCode.jsx'

export default class DirtyCodePage extends React.Component {
    render() {
        return (
            <div className="page">
                <h2>Dirty Code</h2>
                <canvas
                    ref='canvas'
                    width={800}
                    height={400}
                    />
            </div>
        );
    }

    componentDidMount() {
        dirtyCode(this.refs.canvas)
    }
}
