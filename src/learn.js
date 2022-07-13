import React, { useState, useEffect } from 'react';

function Exam(props) {
    const handeleFreviewAvatar = (e) => {
        const file = e.taarget.files[0]
    }

    return (
        <div>
            <input type="text"
                onChange={handeleFreviewAvatar}
            />
        </div>
    )
}
export default Exam