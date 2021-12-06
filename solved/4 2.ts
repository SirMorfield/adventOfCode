import fs from 'fs'

const input: string[] = fs.readFileSync('inputs/4 1.txt').toString().split('\n\n')
const CROSSED = 0
const inputNumbers = input[0]!.split(',').map((n) => parseInt(n))


let boards: number[][] = input.slice(1).map((board) => {
	const split = board.split(/[\ \n]+/).map((n) => parseInt(n)).filter((n) => !isNaN(n))
	if (split.length != 25)
		console.log('err')
	return split
})

function getBingoBoardIndex(boards): number {
	for (const [boardIndex, board] of boards.entries()) {
		for (let offset = 0; offset < 5; offset++) {
			let verticalCrossed = 0
			for (let i = offset; i < board.length; i += 5) {
				if (board[i] == CROSSED)
					verticalCrossed++
			}
			if (verticalCrossed == 5)
				return boardIndex
		}
		for (let offset = 0; offset < board.length; offset += 5) {
			let horizontalCrossed = 0
			for (let i = 0; i < 5; i++) {
				if (board[i + offset] == CROSSED)
					horizontalCrossed++
			}
			if (horizontalCrossed == 5)
				return boardIndex
		}
	}
	return -1
}

function getScore(board: number[], lastInput: number): number {
	const sum = board.reduce((prev, current) => prev + current)
	return sum * lastInput
}

let lastBoardThatWon
let lastN
for (const inputNumber of inputNumbers) {
	for (let i = 0; i < boards.length; i++) {
		boards[i] = boards[i]!.map((n) => n == inputNumber ? CROSSED : n)
	}
	let bi
	do {
		bi = getBingoBoardIndex(boards)
		if (bi != -1) {
			lastBoardThatWon = boards.splice(bi, 1)[0]
			lastN = inputNumber
		}
	} while (bi != -1)
}
console.log(lastBoardThatWon)
console.log(getScore(lastBoardThatWon, lastN))
