import * as c from 'chalk'
import * as utils from '../utils'

export function part_a(data: Array<string[]>, right: number, down: number): number {
  const height = data.length
  const width = data[0].length
  let x = 0
  let y = 0

  let count = 0
  while (y < height) {
    if (data[y][x % width] === '#') {
      count++
    }
    x = x + right
    y = y + down
  }

  return count
}

export function part_b(data: Array<string[]>): number {
  let value = part_a(data, 1, 1)
  for (const s of [
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]) {
    value = value * part_a(data, s[0], s[1])
  }
  return value
}

utils
  .getInput('3')
  .then((raw) => {
    const data: Array<string[]> = []
    for (const line of raw.toString().split(/\n/)) {
      if (/\.|\#/i.test(line)) {
        data.push(line.split(''))
      }
    }

    console.log(c`{green ╭────────────────────────────╮}`)
    console.log(c`{green │ Day 03                     │}`)
    console.log(c`{green │────────────────────────────│}`)
    console.log(c`{green │}{bgGreen {black   Part A:  }}{green ${utils.leftPad(part_a(data, 3, 1), 16)}} {green │}`)
    console.log(c`{green │}{bgGreen {black   Part B:  }}{green ${utils.leftPad(part_b(data), 16)}} {green │}`)
    console.log(c`{green ╰────────────────────────────╯}`)
  })
  .catch((err) => console.error(err))
