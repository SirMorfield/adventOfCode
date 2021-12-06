import fs from 'fs'

const input: string = fs.readFileSync('inputs/6 1.txt').toString()
// const input: string = fs.readFileSync('inputs/test.txt').toString()

const states: number[] = input.split(',').map(n => parseInt(n))
for (let day = 0; day < 80; day++) {
	// console.log(day, JSON.stringify(states).slice(1, -1))
	const len = states.length
	for (let i = 0; i < len; i++) {
		if (states[i] == 0) {
			states[i] = 6
			states.push(8)
		}
		else
			states[i]--
	}
}
console.log(states.length)
