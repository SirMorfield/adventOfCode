import fs from 'fs'

// const [template, insertions] = fs.readFileSync('inputs/test.txt').toString().split('\n\n')
const [template, insertions] = fs.readFileSync('inputs/14.txt').toString().split('\n\n')

const instructions = insertions!.split('\n').map(instruction => {
	const [l, r] = instruction.split(' -> ')
	return { l, r }
})

let templateBlocks: { [k: string]: number } = {}
for (let i = 0; i < template.length - 1; i++)
	templateBlocks[template.substring(i, i + 2)] = 1

const letters: { [k: string]: number } = {}
for (const letter of template) {
	if (!letters[letter])
		letters[letter] = 0
	letters[letter]++
}

for (let i = 0; i < 40; i++) {
	const newPairs: { [k: string]: number } = {}
	for (const block in templateBlocks) {
		const to = instructions.find(instruction => instruction.l === block)!
		const [l, r] = block.split('')

		if (newPairs[l + to.r])
			newPairs[l + to.r] += templateBlocks[block]
		else
			newPairs[l + to.r] = templateBlocks[block]
		if (newPairs[to.r + r])
			newPairs[to.r + r] += templateBlocks[block]
		else
			newPairs[to.r + r] = templateBlocks[block]
		if (letters[to.r])
			letters[to.r] += templateBlocks[block]
		else
			letters[to.r] = templateBlocks[block]
	}
	templateBlocks = newPairs
}

let max = 0
let min = Infinity

for (const key in letters) {
	if (letters[key] > max)
		max = letters[key]
	if (letters[key] < min)
		min = letters[key]
}

console.log(max - min)
console.log(2651311098752)
