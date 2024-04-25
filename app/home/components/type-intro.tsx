'use client';

import React from 'react';
import { TypeAnimation } from 'react-type-animation';

export const TypeIntro = () => {
    return (
        <TypeAnimation
            className="text-3xl tracking-widest font-mono"
            sequence={[
                500,
                'A budding front-end developer...',
                1000,
                'Searching for an internship to kickstart my journey! .',
                1000,
            ]}
            speed={10}
            repeat={Infinity}
        />
    );
};
