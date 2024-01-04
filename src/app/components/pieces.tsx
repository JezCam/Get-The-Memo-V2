'use client'

import React, { useState } from 'react'
import ConfigureScheme from './configureScheme'
import Corner from './corner'
import Edge from './edge'

// Initial scheme state
// 6 different colours with 8 letters
// # is a dummy because there's a center piece
const INITIAL_LETTERS_STATE = [
    ['A', 'A', 'B', 'D', '#', 'B', 'D', 'C', 'C'],
    ['E', 'E', 'F', 'H', '#', 'F', 'H', 'G', 'G'],
    ['I', 'I', 'J', 'L', '#', 'J', 'L', 'K', 'K'],
    ['M', 'M', 'N', 'P', '#', 'N', 'P', 'O', 'O'],
    ['Q', 'Q', 'R', 'T', '#', 'R', 'T', 'S', 'S'],
    ['U', 'U', 'V', 'X', '#', 'V', 'X', 'W', 'W'],
]

const INITIAL_COLORS_STATE = [
    '#ffffff',
    '#f9a12a',
    '#70c059',
    '#ef402f',
    '#077cfc',
    '#e5e537',
]

const NEIGHBOURS = [
    [4, 1, 2, 3, 4],
    [0, 4, 5, 2, 0],
    [0, 1, 5, 3, 0],
    [0, 2, 5, 4, 0],
    [0, 3, 5, 1, 0],
    [2, 1, 4, 3, 2],
]

const EDGE_LETTERS = [
    [1, 1, 1, 1],
    [3, 5, 3, 3],
    [7, 5, 1, 3],
    [5, 5, 5, 3],
    [1, 5, 7, 3],
    [7, 7, 7, 7],
]

const CORNERS_LETTERS = [
    [
        [2, 0],
        [2, 0],
        [2, 0],
        [2, 0],
    ],
    [
        [0, 2],
        [8, 6],
        [0, 6],
        [0, 6],
    ],
    [
        [6, 2],
        [8, 0],
        [2, 6],
        [0, 8],
    ],
    [
        [6, 2],
        [8, 2],
        [8, 6],
        [0, 2],
    ],
    [
        [2, 2],
        [8, 8],
        [6, 6],
        [0, 0],
    ],
    [
        [6, 8],
        [6, 8],
        [6, 8],
        [6, 8],
    ],
]

const EDGES = []

enum GAME_STATE {
    Guessing,
    Incorrect,
    Correct,
}

// This component manages the pieces gamemode
export default function Pieces() {
    // Game State Variables
    const [state, setState] = useState<GAME_STATE>(GAME_STATE.Guessing)

    // Score & Config Variables
    const [score, setScore] = useState<number>(0)
    const [best, setBest] = useState<number>(0)

    const [allowCorners, setAllowCorners] = useState<boolean>(true)
    const [allowEdges, setAllowEdges] = useState<boolean>(true)

    // Piece Variables
    // true = Edge, false = Corner
    const [pieceType, setPieceType] = useState<boolean>(false)
    const [guessLetters, setGuessLetters] = useState<string[]>([])
    const [cornerFacesBaseIndex, setCornerFacesBaseIndex] = useState<number>(0)
    const [cornerFacesPairIndex, setCornerFacesPairIndex] = useState<number>(0)
    const [cornerFaces, setCornerFaces] = useState<[number, number, number]>([
        0, 4, 1,
    ])

    const [edgeFacesBaseIndex, setEdgeFacesBaseIndex] = useState<number>(0)
    const [edgeFacesPairIndex, setEdgeFacesPairIndex] = useState<number>(0)
    const [edgeFaces, setEdgeFaces] = useState<[number, number]>([0, 4])

    // Letter & Colour Config Variables
    const [lettersState, setLettersState] = useState<string[][]>(
        INITIAL_LETTERS_STATE
    )
    const [colorsState, setColorsState] =
        useState<string[]>(INITIAL_COLORS_STATE)

    const changePiece = () => {
        // update piece type
        const options: boolean[] = []
        if (allowCorners) options.push(false)
        if (allowEdges) options.push(true)
        const _index = Math.floor(Math.random() * options.length)
        const _pieceType: boolean = options.at(_index) ?? true

        setPieceType(_pieceType)

        // update piece
        if (_pieceType) {
            changeEdge()
        } else {
            changeCorner()
        }
    }

    const changeCorner = () => {
        const randA = Math.floor(Math.random() * 6) // for random base; from 0 to 5
        const randB = Math.floor(Math.random() * 4) // for random following pair; from 0 to 3

        const randomPair = NEIGHBOURS.at(randA)?.slice(randB, randB + 2) as [
            number,
            number
        ]
        if (randomPair) {
            const _cornerFaces = [randA].concat(randomPair) as [
                number,
                number,
                number
            ]

            if (_cornerFaces === cornerFaces) {
                changeCorner()
            } else {
                setCornerFaces(_cornerFaces)
                setCornerFacesBaseIndex(randA)
                setCornerFacesPairIndex(randB)
            }
        }
    }

    const changeEdge = () => {
        const randA = Math.floor(Math.random() * 6) // for random base; from 0 to 5
        const randB = Math.floor(Math.random() * 4) // for random following face; from 0 to 3

        const _edgeFaces = [randA, NEIGHBOURS.at(randA)?.at(randB)] as [
            number,
            number
        ]

        if (_edgeFaces === edgeFaces) {
            changeEdge()
        } else {
            setEdgeFaces(_edgeFaces)
            setEdgeFacesBaseIndex(randA)
            setEdgeFacesPairIndex(randB)
        }
    }

    const getCorrectGuess = () => {
        if (pieceType) {
            // Edge
            // default white, blue
            const baseLetterIndex = [1, 3, 7, 5].at(edgeFacesPairIndex) // e.g. 0
            const pairLetterIndex =
                EDGE_LETTERS.at(edgeFacesBaseIndex)?.at(edgeFacesPairIndex) // e.g. 1
            const letterIndices = [baseLetterIndex, pairLetterIndex]

            const letters = letterIndices.map((letterIndex, i) =>
                lettersState.at(edgeFaces.at(i) ?? 0)?.at(letterIndex ?? 0)
            )

            console.log(letters)
        } else {
            // Corner
            // default white, blue, orange corner as e.g.
            const baseLetterIndex = [0, 6, 8, 2].at(cornerFacesPairIndex) // e.g. 0
            const pairLetterIndices =
                CORNERS_LETTERS.at(cornerFacesBaseIndex)?.at(
                    cornerFacesPairIndex
                ) // e.g. [2, 0]
            const letterIndices = [baseLetterIndex].concat(pairLetterIndices) // e.g. [0, 2, 0]

            const letters = letterIndices.map((letterIndex, i) =>
                lettersState.at(cornerFaces.at(i) ?? 0)?.at(letterIndex ?? 0)
            )

            console.log(letters)
        }
    }

    return (
        <div className="flex flex-row gap-8">
            <div className="flex flex-col gap-8">
                {/* Score & Config */}
                <div className="bg-[#222738] h-60 p-10 px-12 rounded-[2rem] flex gap-12">
                    <div className="w-full flex flex-col justify-between">
                        <div className="flex  items-center justify-between text-white font-semibold text-[2rem]">
                            <div>Streak:</div>
                            <div className="bg-black/40 p-2 px-4 rounded-md">
                                {score}
                            </div>
                        </div>
                        <div className="flex  items-center justify-between text-white font-semibold text-[2rem]">
                            <div>Best:</div>
                            <div className="bg-black/40 p-2 px-4 rounded-md">
                                {best}
                            </div>
                        </div>
                    </div>
                    <div className="w-1 bg-white"></div>
                    <div className="w-full flex flex-col justify-between">
                        <div className="flex gap-6 items-center">
                            {/* Corners Config Option */}
                            <input
                                onChange={(e) => {
                                    const checked = e.currentTarget.checked
                                    if (!checked && !allowEdges) {
                                        e.preventDefault()
                                        return
                                    }
                                    setAllowCorners(e.currentTarget.checked)
                                }}
                                checked={allowCorners}
                                type="checkbox"
                                className="mx-4 scale-[3]"
                            />
                            <div className="text-white font-semibold text-[2rem]">
                                Corners
                            </div>
                        </div>
                        <div className="flex gap-6 items-center">
                            {/* Edges Config Option */}
                            <input
                                onChange={(e) => {
                                    const checked = e.currentTarget.checked
                                    if (!checked && !allowCorners) {
                                        e.preventDefault()
                                        return
                                    }
                                    setAllowEdges(e.currentTarget.checked)
                                }}
                                checked={allowEdges}
                                type="checkbox"
                                className="mx-4 scale-[3]"
                            />
                            <div className="text-white font-semibold text-[2rem]">
                                Edges
                            </div>
                        </div>
                    </div>
                </div>
                {/* Piece */}
                <div className="bg-[#222738] flex flex-col p-10 rounded-[2rem]">
                    <div className="text-white font-semibold text-[3rem]">
                        Guess the letters!
                    </div>
                    <div className="flex w-[40rem] items-center justify-center py-20 relative">
                        <div className="w-80 h-80">
                            {pieceType ? (
                                <Edge colors={colorsState} faces={edgeFaces} />
                            ) : (
                                <Corner
                                    colors={colorsState}
                                    faces={cornerFaces}
                                />
                            )}
                        </div>
                        {/* Correct */}
                        <div className="absolute p-10 py-2 rounded-[2rem] bg-black/80 text-lime-400 text-[6rem]">
                            Correct!
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                {/* Letter & Colour Config */}
                <div className="bg-[#222738] p-10 px-12 rounded-[2rem] h-min">
                    <ConfigureScheme
                        initialLettersState={INITIAL_LETTERS_STATE}
                        initialColorsState={INITIAL_COLORS_STATE}
                        onLetterChange={(newLettersState: string[][]) => {
                            console.log(newLettersState)
                            setLettersState(newLettersState)
                        }}
                        onColorChange={(newColorsState: string[]) =>
                            setColorsState(newColorsState)
                        }
                        onLettersReset={() =>
                            setLettersState(INITIAL_LETTERS_STATE)
                        }
                        onColorsReset={() =>
                            setColorsState([...INITIAL_COLORS_STATE])
                        }
                    />
                </div>
                {/* Submit & Reveal */}
                <div className="bg-[#222738] flex flex-col gap-6 h-full p-10 px-12 rounded-[2rem]">
                    {state == GAME_STATE.Guessing && (
                        <>
                            <button
                                onClick={() => changePiece()}
                                className="hover:scale-105 transition-transform h-full border-[5px] rounded-[1rem] p-2 font-semibold text-white text-[2rem] border-white bg-[#077cfc]"
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => getCorrectGuess()}
                                className="hover:scale-105 transition-transform h-full border-[5px] rounded-[1rem] p-2 font-semibold text-white text-[2rem] border-white bg-[#ef402f]"
                            >
                                Reveal
                            </button>
                        </>
                    )}
                    {state == GAME_STATE.Incorrect && (
                        <>
                            <button
                                onClick={() => setState(GAME_STATE.Guessing)}
                                className="hover:scale-105 transition-transform h-full border-[5px] rounded-[1rem] p-2 font-semibold text-white text-[2rem] border-white bg-[#077cfc]"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => changePiece()}
                                className="hover:scale-105 transition-transform h-full border-[5px] rounded-[1rem] p-2 font-semibold text-white text-[2rem] border-white bg-[#ef402f]"
                            >
                                Next
                            </button>
                        </>
                    )}
                    {state == GAME_STATE.Incorrect && (
                        <>
                            <button
                                onClick={() => changePiece()}
                                className="hover:scale-105 transition-transform h-full border-[5px] rounded-[1rem] p-2 font-semibold text-white text-[2rem] border-white bg-[#ef402f]"
                            >
                                Next
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
