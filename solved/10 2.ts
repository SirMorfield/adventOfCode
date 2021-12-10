import fs from 'fs'
// < 28114838
// const file: string = fs.readFileSync('inputs/test.txt').toString()
const file: string = fs.readFileSync('inputs/9.txt').toString()
const input: string[] = file.split('\n')

const openings: { [key: string]: number } = {
	'(': 1,
	'[': 2,
	'{': 3,
	'<': 4,
}

function isCorrupted(line) {
	for (const c of line)
		if ([')', ']', '}', '>'].includes(c))
			return true
	return false
}

const r = /\[\]|\{\}|\<\>|\(\)/
const scores: number[] = []
for (let line of input) {
	while (line.match(r))
		line = line.replace(r, '')
	if (isCorrupted(line))
		continue
	let acc = 0
	for (let i = line.length - 1; i >= 0; i--)
		acc = acc * 5 + openings[line[i]!]!
	scores.push(acc)
}
scores.sort((a, b) => a - b)
console.log(scores[Math.floor(scores.length / 2)])
