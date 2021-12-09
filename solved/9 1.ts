import fs from 'fs'
// const file: string = fs.readFileSync('inputs/test.txt').toString()
const file: string = fs.readFileSync('inputs/9.txt').toString()
const input: number[][] = file.split('\n').map(line => line.split('').map(d => parseInt(d)))

function getAdjecent(x: number, y: number): number[] {
	const res: number[] = []
	if (y > 0)
		res.push(input[y - 1]![x]!) // top
	if (x > 0)
		res.push(input[y]![x - 1]!) // left
	if (x + 1 < input[0]!.length)
		res.push(input[y]![x + 1]!) // right
	if (y + 1 < input.length)
		res.push(input[y + 1]![x]!) // bottom
	return res
}

let riskLevelSum = 0
for (let y = 0; y < input.length; y++) {
	for (let x = 0; x < input[0]!.length; x++) {
		const val = input[y]![x]!
		if (val < Math.min(...getAdjecent(x, y)))
			riskLevelSum += val + 1
	}
}
console.log(riskLevelSum)
