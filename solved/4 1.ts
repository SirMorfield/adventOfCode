import fs from 'fs'

const input: string[] = fs.readFileSync('inputs/4 1.txt').toString().split('\n\n')
const CROSSED = 0
const inputNumbers = input[0]!.split(',').map((n) => parseInt(n))


const boards: number[][] = input.slice(1).map((board) => {
	const split = board.split(/[\ \n]+/).map((n) => parseInt(n)).filter((n) => !isNaN(n))
	if (split.length != 25)
		console.log('err')
	return split
})

function getBingoBoard(boards): number[] | null {
	for (const board of boards) {
		for (let offset = 0; offset < 5; offset++) {
			let verticalCrossed = 0
			for (let i = offset; i < board.length; i += 5) {
				if (board[i] == CROSSED)
					verticalCrossed++
			}
			if (verticalCrossed == 5)
				return board
		}
		for (let offset = 0; offset < board.length; offset += 5) {
			let horizontalCrossed = 0
			for (let i = 0; i < 5; i++) {
				if (board[i + offset] == CROSSED)
					horizontalCrossed++
			}
			if (horizontalCrossed == 5)
				return board
		}
	}
	return null
}

function getScore(board: number[], lastInput: number): number {
	const sum = board.reduce((prev, current) => prev + current)
	return sum * lastInput
}

for (const inputNumber of inputNumbers) {
	for (let i = 0; i < boards.length; i++) {
		boards[i] = boards[i]!.map((n) => n == inputNumber ? CROSSED : n)
	}
	const bingoBoard = getBingoBoard(boards)
	if (bingoBoard) {
		console.log(bingoBoard)
		console.log(getScore(bingoBoard, inputNumber))
		break
	}
}



function isBingo(board: number[]): boolean {
	for (let offset = 0; offset < 5; offset++) {
		let verticalCrossed = 0
		for (let i = offset; i < board.length; i += 5) {
			if (board[i] == CROSSED)
				verticalCrossed++
		}
		if (verticalCrossed == 5)
			return true
	}

	for (let offset = 0; offset < board.length; offset += 5) {
		let horizontalCrossed = 0
		for (let i = 0; i < 5; i++) {
			if (board[i + offset] == CROSSED)
				horizontalCrossed++
		}
		if (horizontalCrossed == 5)
			return true
	}
	return false
}
