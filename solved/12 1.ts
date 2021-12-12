import fs from 'fs'
// const file: string = fs.readFileSync('inputs/12_226').toString()
const file: string = fs.readFileSync('inputs/12.txt').toString()
const pairs: string[][] = file.split('\n').map(l => l.split('-'))

function getOut(inp: string, pair: string[]): string | null {
	if (pair[0] == inp) return pair[1]!
	if (pair[1] == inp) return pair[0]!
	return null
}

let acc = 0
function get(inp: string, ignores: string[]) {
	for (let i = 0; i < pairs.length; i++) {
		let out = getOut(inp, pairs[i]!)
		if (out == 'end')
			acc++
		else if (out && out != 'start' && !ignores.includes(out) && inp != out) {
			const cp = [...ignores]
			if (inp.toLowerCase() == inp)
				cp.push(inp)
			get(out, cp)
		}
	}
}
get('start', [])
console.error(acc)
