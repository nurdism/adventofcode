import * as utils from '../utils'
import * as c from 'chalk'

interface Data {
  min: number
  max: number
  char: string
  password: string
}

export function part_a(data: Data[]): number {
  let count = 0
  for (const item of data) {
    let chars = 0
    for (const char of item.password.split('')) {
      if (char == item.char) {
        chars++
      }
    }

    if (chars >= item.min && chars <= item.max) {
      count++
    }
  }

  return count
}

export function part_b(data: Data[]): number {
  let count = 0
  for (const item of data) {
    const chars = item.password.split('')
    if ((chars[item.min - 1] == item.char) !== (chars[item.max - 1] == item.char)) {
      count++
    }
  }

  return count
}

utils
  .getInput('2')
  .then((raw) => {
    const data: Data[] = []
    const regex = /(\d{1,2})-(\d{1,2})\s([a-z]):\s([a-z]*)/i
    for (const line of raw.split(/\n/)) {
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

    console.log(c`{green ╭────────────────────────────╮}`)
    console.log(c`{green │ Day 02                     │}`)
    console.log(c`{green │────────────────────────────│}`)
    console.log(c`{green │}{bgGreen {black   Part A:  }}{green ${utils.leftPad(part_a(data), 16)}} {green │}`)
    console.log(c`{green │}{bgGreen {black   Part B:  }}{green ${utils.leftPad(part_b(data), 16)}} {green │}`)
    console.log(c`{green ╰────────────────────────────╯}`)
  })
  .catch((err) => console.error(err))
