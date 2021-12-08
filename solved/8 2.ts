import fs from 'fs'
const file: string[] = fs.readFileSync('inputs/8.txt').toString().split('\n')
// const file: string[] = fs.readFileSync('inputs/test.txt').toString().split('\n')

const tests: { in: string[], out: string[] }[] = file.map(line => {
	const s = line.split(' | ')
	return {
		in: s[0]!.split(' ').map(x => x.split('').sort().join('')),
		out: s[1]!.split(' ').map(x => x.split('').sort().join(''))
	}
})

function countMatches(s1: string, s2: string): number {
	let matches = 0
	for (const c of s1)
		matches += s2.includes(c) ? 1 : 0
	return matches
}

let totalSum = 0
for (const test of tests) {
	const dictionary: { [key: string]: number } = {}
	const input069: string[] = []
	const input235: string[] = []
	let str4: string
	let str1: string

	for (const input of test.in) {
		switch (input.length) {
			case 2: dictionary[input] = 1; str1 = input; break
			case 4: dictionary[input] = 4; str4 = input; break
			case 3: dictionary[input] = 7; break
			case 7: dictionary[input] = 8; break
			case 5: input235.push(input); break
			case 6: input069.push(input); break
		}
	}

	for (const input of input235) {
		if (countMatches(input, str4!) == 2)
			dictionary[input] = 2
		else if (countMatches(input, str1!) == 2)
			dictionary[input] = 3
		else
			dictionary[input] = 5
	}

	for (const input of input069) {
		if (countMatches(input, str4!) == 4)
			dictionary[input] = 9
		else if (countMatches(input, str1!) == 1)
			dictionary[input] = 6
		else
			dictionary[input] = 0
	}
	totalSum += test.out.reduce((acc, num) => acc * 10 + dictionary[num]!, 0)
}
console.log(totalSum)
