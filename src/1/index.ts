import * as fs from 'fs'
import * as path from 'path'

const data: number[] = []

// load raw input
const raw = fs.readFileSync(path.resolve(__dirname, 'input.txt'))

// parse input
for (const line of raw.toString().split(/\n/)) {
  if (line.match(/\d/)) {
    data.push(parseInt(line))
  }
}

// part a
loop: for (const a of data) {
  for (const b of data) {
    if (a + b === 2020) {
      // log answer
      console.log(`the answer for part a is :${a * b}`)
      break loop
    }
  }
}

// part b
loop: for (const a of data) {
  for (const b of data) {
    for (const c of data) {
      if (a + b + c === 2020) {
        // log answer
        console.log(`the answer for part a is :${a * b * c}`)
        break loop
      }
    }
  }
}
