import * as c from 'chalk'
import * as utils from '../utils'

export function part_a(data: number[]): number {
  for (const a of data) {
    for (const b of data) {
      if (a + b === 2020) {
        return a * b
      }
    }
  }
}

export function part_b(data: number[]): number {
  for (const a of data) {
    for (const b of data) {
      for (const c of data) {
        if (a + b + c === 2020) {
          return a * b * c
        }
      }
    }
  }
}

utils
  .getInput('1')
  .then((raw) => {
    const data: number[] = []
    for (const line of raw.split(/\n/)) {
      if (/^\d+$/.test(line)) {
        data.push(parseInt(line))
      }
    }

    console.log(c`{green ╭────────────────────────────╮}`)
    console.log(c`{green │ Day 01                     │}`)
    console.log(c`{green │────────────────────────────│}`)
    console.log(c`{green │}{bgGreen {black   Part A:  }}{green ${utils.leftPad(part_a(data), 16)}} {green │}`)
    console.log(c`{green │}{bgGreen {black   Part B:  }}{green ${utils.leftPad(part_b(data), 16)}} {green │}`)
    console.log(c`{green ╰────────────────────────────╯}`)
  })
  .catch((err) => console.error(err))
