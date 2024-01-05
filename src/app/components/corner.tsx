import React, { useEffect, useState } from 'react'

export default function Corner(props: {
    onChange: (index: number, guess: string) => void
    colors: string[]
    faces: [number, number, number]
}) {
    const [colors, setColors] = useState<string[]>(props.colors)
    const [faces, setFaces] = useState<number[]>(props.faces)

    useEffect(() => {
        setColors(props.colors)
    }, [props.colors])

    useEffect(() => {
        setFaces(props.faces)
    }, [props.faces])

    return (
        <div className="relative w-full h-full">
            {/* Input 1 - left */}
            <input
                onChange={(e) => props.onChange(0, e.currentTarget.value)}
                maxLength={1}
                className="absolute top-[29%] left-[13%] text-white border-[2px] border-white font-medium bg-black/40 h-20 w-20 rounded-md text-center text-[4rem]"
            ></input>
            {/* Input 2 - right */}
            <input
                onChange={(e) => props.onChange(1, e.currentTarget.value)}
                maxLength={1}
                className="absolute top-[29%] right-[13%] text-white border-[2px] border-white font-medium bg-black/40 h-20 w-20 rounded-md text-center text-[4rem]"
            ></input>
            {/* Input 3 - bottom */}
            <input
                onChange={(e) => props.onChange(2, e.currentTarget.value)}
                maxLength={1}
                className="absolute top-[70%] left-[50%] translate-x-[-50%] text-white border-[2px] border-white font-medium bg-black/40 h-20 w-20 rounded-md text-center text-[4rem]"
            ></input>
            {/* SVG Base */}
            <svg viewBox="0 0 359.92 403.29">
                <g>
                    <path
                        d="M4 120.71v161.87c0 6.39 1.7 12.54 4.79 17.89l171.17-98.82V4c-6.18 0-12.35 1.6-17.89 4.79L21.89 89.73A35.772 35.772 0 0 0 4 120.71Z"
                        style={{
                            fill: colors?.at(faces.at(0) ?? 0),
                            stroke: '#fff',
                            strokeWidth: 8,
                        }}
                    />
                    <path
                        d="m21.89 313.56 140.18 80.93a35.787 35.787 0 0 0 35.78 0l140.18-80.93c5.53-3.2 10.01-7.75 13.09-13.09l-171.17-98.82L8.79 300.47c3.09 5.35 7.56 9.9 13.09 13.09Z"
                        style={{
                            fill: colors?.at(faces.at(1) ?? 0),
                            stroke: '#fff',
                            strokeWidth: 8,
                        }}
                    />
                    <path
                        d="M338.03 89.73 197.85 8.79A35.688 35.688 0 0 0 179.96 4v197.65l171.17 98.82c3.09-5.35 4.79-11.5 4.79-17.89V120.71c0-12.78-6.82-24.59-17.89-30.98Z"
                        style={{
                            fill: colors?.at(faces.at(2) ?? 0),
                            stroke: '#fff',
                            strokeWidth: 8,
                        }}
                    />
                </g>
            </svg>
        </div>
    )
}
