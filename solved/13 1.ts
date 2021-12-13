import fs from 'fs'
// const file: string = fs.readFileSync('inputs/test.txt').toString()
const file: string = fs.readFileSync('inputs/13.txt').toString()
const points: number[][] = file.split('\n\n')[0]!.split('\n').map(l => l.split(',').map(n => Number(n)))
const folds: number[][] = file.split('\n\n')[1]!.split('\n').map(l => l.replace('fold along ', '').split('=')).map(s => s[0] == 'y' ? [Infinity, parseInt(s[1]!)] : [parseInt(s[1]!), Infinity])

for (const fold of folds) {
	for (const point of points) {
		if (point[0]! > fold[0]!)
			point[0] -= (point[0]! - fold[0]!) * 2
		if (point[1]! > fold[1]!)
			point[1] -= (point[1]! - fold[1]!) * 2
	}
	break
}

const unique: number[][] = []
for (const point of points)
	if (unique.find(u => u[0] == point[0] && u[1] == point[1]) === undefined)
		unique.push(point)
console.log(unique.length)
