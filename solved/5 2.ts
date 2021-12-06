import fs from 'fs'

const input: string = fs.readFileSync('inputs/5 1.txt').toString()
const coords = input.split('\n').map((line) => line.split(' -> ').map(coord => {
	const coords = coord.split(',')
	return {
		x: parseInt(coords[0]!),
		y: parseInt(coords[1]!),

	}
})) as [{ x, y }, { x, y }][]

const arr: number[][] = []
const gridSize = 1001
for (let y = 0; y < gridSize; y++) {
	arr[y] = []
	for (let x = 0; x < gridSize; x++) {
		arr[y]![x] = 0
	}
}

const straight = coords.filter(coord => coord[0].x == coord[1].x || coord[0].y == coord[1].y)
const diagonal = coords.filter(coord => !(coord[0].x == coord[1].x || coord[0].y == coord[1].y))

for (const line of straight) {
	const minY = Math.min(line[0].y, line[1].y)
	const maxY = Math.max(line[0].y, line[1].y)
	for (let y = minY; y <= maxY; y++) {
		const minX = Math.min(line[0].x, line[1].x)
		const maxX = Math.max(line[0].x, line[1].x)
		for (let x = minX; x <= maxX; x++) {
			arr[y]![x]++
		}
	}
}

for (const line of diagonal) {
	const minY = Math.min(line[0].y, line[1].y)
	const maxY = Math.max(line[0].y, line[1].y)
	const length = maxY - minY
	const xChange = line[0].x < line[1].x ? 1 : -1
	const yChange = line[0].y < line[1].y ? 1 : -1

	for (let i = 0; i <= length; i++) {
		arr[line[0].y + i * yChange]![line[0].x + i * xChange]++
	}
}

let overlaps = 0
for (let y = 0; y < gridSize; y++) {
	for (let x = 0; x < gridSize; x++) {
		if (arr[y]![x]! >= 2)
			overlaps++
	}
}

console.log(overlaps)
