import * as c from 'chalk'
import * as utils from '../utils'

export function part_a(data: string[]): number {
  return 0
}

export function part_b(data: string[]): number {
  return 0
}

utils
  .getInput('{day}')
  .then((raw) => {
    const data: string[] = []
    for (const line of raw.toString().split(/\n/)) {
      data.push(line)
    }

    console.log(c`{green ╭────────────────────────────╮}`)
    console.log(c`{green │ Day 00                     │}`)
    console.log(c`{green │────────────────────────────│}`)
    console.log(c`{green │}{bgGreen {black   Part A:  }}{green ${utils.leftPad(part_a(data), 16)}} {green │}`)
    console.log(c`{green │}{bgGreen {black   Part B:  }}{green ${utils.leftPad(part_b(data), 16)}} {green │}`)
    console.log(c`{green ╰────────────────────────────╯}`)
  })
  .catch((err) => console.error(err))
