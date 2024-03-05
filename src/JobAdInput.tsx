import React, { useState } from 'react';

interface JobAdInputProps {
    value: string
    onChange: (s: string) => void
}

const JobAdInput = ({ value, onChange }: JobAdInputProps) => {

    return (
        <div>
            <textarea
                value={value} onChange={e => onChange(e.target.value)}  
                rows={10} cols={100}></textarea>
        </div>
    )
}

export default JobAdInput   