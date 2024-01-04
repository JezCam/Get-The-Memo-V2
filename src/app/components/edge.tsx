import React, { useEffect, useState } from 'react'

export default function Edge(props: {
    colors: string[]
    faces: [number, number]
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
        <div className="relative h-full">
            {/* Input 1 - left */}
            <input
                maxLength={1}
                className="absolute top-[33%] left-[13%] text-white border-[2px] border-white font-medium bg-black/40 h-20 w-20 rounded-md text-center text-[4rem]"
            ></input>
            {/* Input 2 - right */}
            <input
                maxLength={1}
                className="absolute top-[33%] right-[13%] text-white border-[2px] border-white font-medium bg-black/40 h-20 w-20 rounded-md text-center text-[4rem]"
            ></input>
            <svg viewBox="0 0 428.62 403.29">
                <g data-name="Layer 2">
                    <path
                        d="M192.93 8.79 25.38 89.73C12.15 96.12 4 107.93 4 120.71v162.06c.06 9.23 5.86 17.77 15.03 22.89l63.99 35.74 109.91 53.09c6.62 3.2 14 4.79 21.38 4.79V4c-7.38 0-14.76 1.6-21.38 4.79Z"
                        style={{
                            fill: colors.at(faces.at(0) ?? 0),
                            stroke: '#fff',
                            strokeWidth: 8,
                        }}
                    />
                    <path
                        d="M403.24 89.73 235.69 8.79c-6.61-3.2-14-4.79-21.38-4.79v395.29c7.38 0 14.77-1.6 21.38-4.79l109.91-53.09 63.99-35.74c9.17-5.12 14.97-13.66 15.03-22.89V120.71c0-12.78-8.15-24.59-21.38-30.98Z"
                        style={{
                            fill: colors.at(faces.at(1) ?? 0),
                            stroke: '#fff',
                            strokeWidth: 8,
                        }}
                    />
                </g>
            </svg>
        </div>
    )
}
