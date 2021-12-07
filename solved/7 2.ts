import fs from 'fs'
const input: string = fs.readFileSync('inputs/7.txt').toString()
// const input: string = fs.readFileSync('inputs/test.txt').toString()
const inputNumber: number[] = input.split(',').map(n => parseInt(n))

const fuelUsages: number[] = []
for (let i = 0; i < inputNumber.length; i++) {
	let fuelUsed = 0
	for (const n of inputNumber) {
		for (let sequence = 1; sequence < Math.abs(i - n); sequence++)
			fuelUsed += sequence
		fuelUsed += Math.abs(i - n)
	}
	fuelUsages.push(fuelUsed)
}
console.log(Math.min(...fuelUsages))
