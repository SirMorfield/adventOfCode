import fs from 'fs'
const file: string[] = fs.readFileSync('inputs/8.txt').toString().split('\n')
// const file: string[] = fs.readFileSync('inputs/test.txt').toString().split('\n')

const outputs: string[][] = file.map(line => line.split(' | ')[1]!.split(' '))
console.log(outputs)
const occurences = Array(10).fill(0)
for (const output of outputs)
	for (const segment of output)
		occurences[segment.length]++

console.log(occurences[2] + occurences[4] + occurences[3] + occurences[7])
// console.log(occurences[1] + occurences[4] + occurences[7] + occurences[8])
