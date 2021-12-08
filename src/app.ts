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


//  0
// 1  2
//  3
// 4  5
//  6

// number segments
// 0 6
// 1 2
// 2 5
// 3 5
// 4 4
// 5 5
// 6 6
// 7 3
// 8 7
// 9 6
function discard(segments, input: string, discards: number[]) {
	for (const discard of discards)
		segments[discard] = segments[discard].filter(s => !input.includes(s))
}
let totalSum = 0
for (const test of tests) {
	const numberOfSegments: string[][] = [...Array(8)].map(x => Array(0))
	for (const input of test.in)
		numberOfSegments[input.length]!.push(input)
	// console.log(numberOfSegments)
	const segments: string[][] = Array(7).fill(['a', 'b', 'c', 'd', 'e', 'f', 'g'])

	for (const input of test.in) {
		if (input.length == 2)  // 1
			discard(segments, input, [0, 1, 3, 4, 6])
		if (input.length == 4)  // 4
			discard(segments, input, [0, 4, 6])
		if (input.length == 3)  // 7
			discard(segments, input, [1, 3, 4, 6])
	}

	// 0 6 9
	for (const c of ['a', 'b', 'c', 'd', 'e', 'f', 'g']) {
		let occurrences = 0
		for (const numberOfSegment of numberOfSegments[6]!)
			occurrences += numberOfSegment.includes(c) ? 1 : 0

		if (occurrences == 3)
			discard(segments, c, [2, 3, 4])
		if (occurrences == 2)
			discard(segments, c, [0, 1, 5, 6])
	}

	// 2 3 5
	for (const c of ['a', 'b', 'c', 'd', 'e', 'f', 'g']) {
		let occurrences = 0
		for (const numberOfSegment of numberOfSegments[5]!)
			occurrences += numberOfSegment.includes(c) ? 1 : 0

		if (occurrences == 3)
			discard(segments, c, [1, 2, 4, 5])
		if (occurrences == 2)
			discard(segments, c, [0, 1, 3, 4, 6])
		if (occurrences == 1)
			discard(segments, c, [0, 2, 3, 5, 6])
	}
	for (let i = 1; i < segments.length; i++)
		segments[0] = segments[0]!.filter(x => !segments[i]!.includes(x))

	const dictionary: { [key: string]: number } = {}
	for (const input of test.in) {
		if (input.length == 2)  // 1
			dictionary[input] = 1
		if (input.length == 4)  // 4
			dictionary[input] = 4
		if (input.length == 3)  // 7
			dictionary[input] = 7
		if (input.length == 7)  // 8
			dictionary[input] = 8
		const n0: string = segments[0]![0]! + segments[1]![0]! + segments[2]![0]! + segments[4]![0]! + segments[5]![0]! + segments[6]![0]!
		dictionary[n0.split('').sort().join('')] = 0
		const n2: string = segments[0]![0]! + segments[2]![0]! + segments[3]![0]! + segments[4]![0]! + segments[6]![0]!
		dictionary[n2.split('').sort().join('')] = 2
		const n3: string = segments[0]![0]! + segments[2]![0]! + segments[3]![0]! + segments[5]![0]! + segments[6]![0]!
		dictionary[n3.split('').sort().join('')] = 3
		const n5: string = segments[0]![0]! + segments[1]![0]! + segments[3]![0]! + segments[5]![0]! + segments[6]![0]!
		dictionary[n5.split('').sort().join('')] = 5
		const n6: string = segments[0]![0]! + segments[1]![0]! + segments[3]![0]! + segments[4]![0]! + segments[5]![0]! + segments[6]![0]!
		dictionary[n6.split('').sort().join('')] = 6
		const n9: string = segments[0]![0]! + segments[1]![0]! + segments[2]![0]! + segments[3]![0]! + segments[5]![0]! + segments[6]![0]!
		dictionary[n9.split('').sort().join('')] = 9
	}
	let acc = 0
	for (let i = test.out.length - 1; i >= 0; i--) {
		console.log(dictionary[test.out[i]!])
		acc = acc * 10 + dictionary[test.out[i]!]!
	}
	totalSum += acc
	// for (const [i, segment] of segments.entries())
	// 	console.log(i, segment.join(','))

	console.log()
}
console.log(totalSum)
// console.log(occurences[1] + occurences[4] + occurences[7] + occurences[8])
