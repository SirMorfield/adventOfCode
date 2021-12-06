import fs from 'fs'

const input: string = fs.readFileSync('inputs/6 1.txt').toString()
// const input: string = fs.readFileSync('inputs/test.txt').toString()
const inputNumber: number[] = input.split(',').map(n => parseInt(n))
const maxAge = 8

let countdown: number[] = Array(maxAge + 1).fill(0)
for (const n of inputNumber)
	countdown[n]++

for (let day = 0; day < 256; day++) {
	const countdownCopy = Array(maxAge + 1).fill(0)
	for (let i = 0; i < countdown.length; i++) {
		if (i == 0) {
			countdownCopy[8] += countdown[i]
			countdownCopy[6] = countdown[i]
		}
		else
			countdownCopy[i - 1] += countdown[i]
	}
	countdown = [...countdownCopy]
}

console.log(countdown.reduce((accumulator, current) => accumulator + current))
