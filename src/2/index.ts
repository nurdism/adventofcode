import * as fs from 'fs'
import * as path from 'path'

interface Data {
  min: number
  max: number
  char: string
  password: string
}

const data: Data[] = []

// load raw input
const raw = fs.readFileSync(path.resolve(__dirname, 'input.txt'))

// parse input
const regex = /(\d{1,2})-(\d{1,2})\s([a-z]):\s([a-z]*)/i
for (const line of raw.toString().split(/\n/)) {
  const parts = line.match(regex)
  if (parts.length < 4) {
    continue
  }

  data.push({
    min: parseInt(parts[1]),
    max: parseInt(parts[2]),
    char: parts[3],
    password: parts[4],
  })
}

// part a
let part_a = 0
for (const item of data) {
  let count = 0
  for (const char of item.password.split('')) {
    if (char == item.char) {
      count++
    }
  }

  if (count >= item.min && count <= item.max) {
    part_a++
  }
}

// log answer
console.log(`the answer for part a is :${part_a}`)

// part b
let part_b = 0
for (const item of data) {
  const chars = item.password.split('')
  if ((chars[item.min - 1] == item.char) !== (chars[item.max - 1] == item.char)) {
    part_b++
  }
}

// log answer
console.log(`the answer for part b is :${part_b}`)
