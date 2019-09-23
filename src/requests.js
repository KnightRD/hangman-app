"use strict";

// async/await version of promise
// API request and handling of data
const getPuzzle = async (wordCount) => {
    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`, {});
    if (response.status === 200) {
        const data = await response.json();
        // data returned in string format
        return data.puzzle;
    } else {
        // error handling
        throw new Error("Unable to fetch puzzle");
    }
}

// exports
export { getPuzzle as default };