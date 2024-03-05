import React, { useState } from 'react';

interface JobAdFeedbackProps {
    value: string
}

const JobAdFeedback = ({ value }: JobAdFeedbackProps) => {

    return (
        <div>
            <textarea value={value} readOnly={true}></textarea>
        </div>
    )
}

export default JobAdFeedback