import React, { useState } from 'react';

interface BiasProps {
    masculineWordCount: number
    femenineWordCount: number
}

const Bias = (props: BiasProps) => {
    const { masculineWordCount, femenineWordCount } = props

    return (
        <div>
            <div>Bias placehoder</div>
            <div>Femenine word count: {femenineWordCount}</div>
            <div>Masculine word count: {masculineWordCount}</div>
        </div>
    )
}

export default Bias