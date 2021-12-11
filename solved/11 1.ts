import fs from 'fs'
// const file: string = fs.readFileSync('inputs/test.txt').toString()
const file: string = fs.readFileSync('inputs/11.txt').toString()
const map: number[][] = file.split('\n').map(l => l.split('').map(x => parseInt(x)))
const grid = { map, width: map[0]!.length, height: map.length }

function flash(x: number, y: number): number {
	if (grid.map[y]![x]! <= 9)
		return 0

	let flashCount = 1
	grid.map[y]![x]! = -Infinity
	forEachNeighbor(x, y, (nx, ny) => {
		grid.map[ny]![nx]++
		if (grid.map[ny]![nx]! > 9)
			flashCount += flash(nx, ny)
	})

	return flashCount
}

function forEachPoint(fn: (x: number, y: number) => void) {
	for (let y = 0; y < grid.height; y++)
		for (let x = 0; x < grid.width; x++)
			fn(x, y)
}

function forEachNeighbor(x: number, y: number, fn: (x: number, y: number) => void) {
	const startX = Math.max(0, x - 1)
	const endX = Math.min(grid.width - 1, x + 1)
	const startY = Math.max(0, y - 1)
	const endY = Math.min(grid.height - 1, y + 1)

	for (let yy = startY; yy <= endY; yy++) {
		for (let xx = startX; xx <= endX; xx++) {
			if (xx == x && yy == y)
				continue
			fn(xx, yy)
		}
	}
}


let flashCount = 0
for (let i = 0; i < 100; i++) {
	forEachPoint((x, y) => grid.map[y]![x]!++)
	forEachPoint((x, y) => flashCount += flash(x, y))
	forEachPoint((x, y) => grid.map[y]![x]! = Math.max(0, grid.map[y]![x]!))
}
console.log(flashCount)
