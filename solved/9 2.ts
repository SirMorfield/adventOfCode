import fs from 'fs'
// const file: string = fs.readFileSync('inputs/test.txt').toString()
const file: string = fs.readFileSync('inputs/9.txt').toString()
const input: number[][] = file.split('\n').map(line => line.split('').map(d => parseInt(d)))
interface BasinPoint { x: number, y: number, val: number }

function getAdjacent(x: number, y: number): BasinPoint[] {
	const res: BasinPoint[] = []
	if (y > 0)
		res.push({ x: x, y: y - 1, val: input[y - 1]![x]! }) // top
	if (x > 0)
		res.push({ x: x - 1, y: y, val: input[y]![x - 1]! }) // left
	if (x + 1 < input[0]!.length)
		res.push({ x: x + 1, y: y, val: input[y]![x + 1]! }) // right
	if (y + 1 < input.length)
		res.push({ x: x, y: y + 1, val: input[y + 1]![x]! }) // bottom
	return res
}

const basinSizes: number[] = []
for (let y = 0; y < input.length; y++) {
	for (let x = 0; x < input[0]!.length; x++) {
		let basinAcc: BasinPoint[] = [{ x, y, val: input[y]![x]! }]
		let basinAdd: BasinPoint[] = [{ x, y, val: input[y]![x]! }]

		while (true) {
			let newBasinAdd: BasinPoint[] = []
			for (const p of basinAdd) {
				const adjacent = getAdjacent(p.x, p.y).filter(adj => adj.val > p.val && adj.val != 9)
				for (const p of adjacent) {
					if (!basinAcc.find(acc => acc.x == p.x && acc.y == p.y)) {
						basinAcc.push(p)
						newBasinAdd.push(p)
					}
				}
			}
			if (newBasinAdd.length == 0) break
			basinAdd = newBasinAdd
		}
		basinSizes.push(basinAcc.length)
	}
}

basinSizes.sort((a, b) => b - a)
console.log(basinSizes[0], basinSizes[1], basinSizes[2])
console.log(basinSizes[0]! * basinSizes[1]! * basinSizes[2]!)
