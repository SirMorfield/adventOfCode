import fs from 'fs'

const [template, insertions] = fs.readFileSync('inputs/14.txt').toString().split('\n\n')

const instructions = insertions!.split('\n').map(instruction => {
	const [from, to] = instruction.split(' -> ')
	return { from, to }
})

let t = template as string
for (let i = 0; i < 10; i++) {
	let toReplace = t[0]

	for (let i = 0; i < t.length - 1; i++) {
		const substr = t.substring(i, i + 2)
		const add = instructions.find(instruction => instruction.from === substr)
		toReplace += add!.to! + substr.split('')[1]
	}
	t = toReplace!
}

let max = 0
let min = Infinity

const letters: { [k: string]: number } = {}
for (const letter of t) {
	if (!letters[letter])
		letters[letter] = 0
	letters[letter]++
}

for (const key of Object.keys(letters)) {
	if (letters[key]! > max)
		max = letters[key]!
	if (letters[key]! < min)
		min = letters[key]!
}

console.log(max - min)
