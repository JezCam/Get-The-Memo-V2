import React, { useEffect, useState } from 'react'

import { HexColorPicker } from 'react-colorful'

import { TbReload } from 'react-icons/tb'
import { IconContext } from 'react-icons'

export default function ConfigureScheme(props: {
    initialLettersState: string[][]
    initialColorsState: string[]
    onLetterChange: (newLettersState: string[][]) => void
    onColorChange: (newColorsState: string[]) => void
    onLettersReset: () => void
    onColorsReset: () => void
}) {
    const [lettersState, setLettersState] = useState<string[][]>(
        props.initialLettersState
    )
    const [colorsState, setColorsState] = useState<string[]>(
        props.initialColorsState
    )
    const [selectedFaceIndex, setSelectedFaceIndex] = useState<number>(0)

    // Letters state transformation
    const onLetterChange = (
        selectedFaceIndex: number,
        letterIndex: number,
        newLetter: string
    ) => {
        const _lettersState = lettersState.map((face, f) =>
            f === selectedFaceIndex
                ? face.map((letter, l) =>
                      l === letterIndex ? newLetter : letter
                  )
                : face
        )
        setLettersState(_lettersState)
        props.onLetterChange(_lettersState)
    }

    // Colors state transformation
    const onColorsChange = (colorIndex: number, newColor: string) => {
        setColorsState((colorsState) =>
            colorsState.map((color, index) =>
                index === colorIndex ? newColor : color
            )
        )

        props.onColorChange(colorsState)
    }

    // Letters reset
    const onLettersReset = () => {
        setLettersState(props.initialLettersState)

        props.onLettersReset()
    }

    // Colors reset
    const onColorsReset = () => {
        setColorsState(props.initialColorsState)

        props.onColorsReset()
    }

    return (
        <div className="flex flex-col gap-10 w-min">
            {/* Title */}
            <div className="text-white text-[2rem] font-semibold">
                Configure you letter scheme
            </div>
            {/* Colour change */}
            <div className="flex w-full justify-between gap-3 relative">
                {Array.from(Array(6)).map((_, index) => (
                    <div
                        key={index}
                        style={{ backgroundColor: colorsState.at(index) }}
                        onClick={() => setSelectedFaceIndex(index)}
                        className="group hover:scale-110 transition-transform hover:cursor-pointer w-full aspect-square border-white border-[4px] rounded-md"
                    >
                        <div className="w-10 group-hover:block hover:block absolute hidden bottom-0">
                            <div className="mb-10">
                                <HexColorPicker
                                    onMouseDown={() =>
                                        setSelectedFaceIndex(index)
                                    }
                                    color={colorsState.at(index)}
                                    onChange={(color) =>
                                        onColorsChange(index, color)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <div
                    onClick={onColorsReset}
                    className={`group flex items-center justify-center hover:scale-110 transition-transform hover:cursor-pointer w-full border-white border-[4px] aspect-square bg-white rounded-md`}
                >
                    <IconContext.Provider
                        value={{
                            size: '1.5rem',
                        }}
                    >
                        <div className=" group-hover:rotate-12 transition-transform">
                            <TbReload />
                        </div>
                    </IconContext.Provider>
                </div>
            </div>
            {/* Scheme change input */}
            <div className="grid grid-cols-3 w-max gap-4">
                {lettersState.at(selectedFaceIndex)?.map((letter, index) =>
                    index === 4 ? (
                        // Reset Letters
                        <div
                            key={index}
                            style={{
                                backgroundColor:
                                    colorsState.at(selectedFaceIndex),
                            }}
                            onClick={onLettersReset}
                            className="w-[6rem] p-2 rounded-lg"
                        >
                            <IconContext.Provider
                                value={{
                                    color: 'white',
                                    size: '3rem',
                                    className:
                                        'hover:scale-110 hover:rotate-12 transition-transform',
                                }}
                            >
                                <div className="rounded-md bg-black/40 flex items-center justify-center w-full h-full hover:cursor-pointer">
                                    <TbReload />
                                </div>
                            </IconContext.Provider>
                        </div>
                    ) : (
                        <div
                            key={index}
                            style={{
                                backgroundColor:
                                    colorsState.at(selectedFaceIndex),
                            }}
                            className="flex p-2 rounded-lg w-[6rem]"
                        >
                            <input
                                maxLength={1}
                                onChange={(e) =>
                                    onLetterChange(
                                        selectedFaceIndex,
                                        index,
                                        e.currentTarget.value
                                    )
                                }
                                value={lettersState
                                    .at(selectedFaceIndex)
                                    ?.at(index)}
                                className="text-white font-medium bg-black/40 h-20 rounded-md aspect-square text-center text-[4rem]"
                            ></input>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}
