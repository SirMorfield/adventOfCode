import fs from 'fs'
// const file: string = fs.readFileSync('inputs/test.txt').toString()
const file: string = fs.readFileSync('inputs/9.txt').toString()
const input: string[] = file.split('\n')

const closings: { [key: string]: number } = {
	')': 3,
	']': 57,
	'}': 1197,
	'>': 25137,
}

const r = /\[\]|\{\}|\<\>|\(\)/
let acc = 0
for (let line of input) {
	while (line.match(r))
		line = line.replace(r, '')

	for (const c of line) {
		if (closings[c] != undefined) {
			acc += closings[c]!
			break;
		}
	}
}
console.log(acc)
