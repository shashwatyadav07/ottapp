import React from 'react';

const Head = () => {
    return (
        <div className="container-fluid sticky-top head mb-2 position-absolute demo">
            <div className="header text-center">
                <h1 onClick={() => window.scroll(0, 0)} style={{ fontWeight: "600" }}>MovieZone</h1>
            </div>
        </div>
    );
}

export default Head; 