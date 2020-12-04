import * as c from 'chalk'
import * as utils from '../utils'

interface Passport {
  byr: number // (Birth Year)
  iyr: number // (Issue Year)
  eyr: number // (Expiration Year)
  hgt: string // (Height)
  hcl: string // (Hair Color)
  ecl: string // (Eye Color)
  pid: string // (Passport ID)
  cid?: string // (Country ID)
}

const fields = [
  'byr', // (Birth Year)
  'iyr', // (Issue Year)
  'eyr', // (Expiration Year)
  'hgt', // (Height)
  'hcl', // (Hair Color)
  'ecl', // (Eye Color)
  'pid', // (Passport ID)
  'cid', // (Country ID)
]

const numbers = [
  'byr', // (Birth Year)
  'iyr', // (Issue Year)
  'eyr', // (Expiration Year)
]

const required = [
  'byr', // (Birth Year)
  'iyr', // (Issue Year)
  'eyr', // (Expiration Year)
  'hgt', // (Height)
  'hcl', // (Hair Color)
  'ecl', // (Eye Color)
  'pid', // (Passport ID)
]

export function part_a(data: Passport[]): Passport[] {
  const valid: Passport[] = []
  for (const passport of data) {
    let failed = false
    for (const key of required) {
      if (!Object.keys(passport).includes(key)) {
        failed = true
        break
      }
    }

    if (!failed) {
      valid.push(passport)
    }
  }

  return valid
}

function between(x: number, min: number, max: number): boolean {
  return x >= min && x <= max
}

const validators = {
  byr: (value: number): boolean => between(value, 1920, 2002), // byr (Birth Year) - four digits; at least 1920 and at most 2002.
  iyr: (value: number): boolean => between(value, 2010, 2020), // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  eyr: (value: number): boolean => between(value, 2020, 2030), // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  hgt: (value: string): boolean => {
    const matches = value.match(/(\d{1,4})(cm|in)/i)
    if (!matches) {
      return false
    }
    const num = parseInt(matches[1])
    switch (matches[2]) {
      case 'cm':
        return between(num, 150, 193)
      case 'in':
        return between(num, 59, 76)
      default:
        return false
    }
  },
  // hgt (Height) - a number followed by either cm or in:
  //    If cm, the number must be at least 150 and at most 193.
  //    If in, the number must be at least 59 and at most 76.
  hcl: (value: string): boolean => /#[0-9a-f]{6}/i.test(value), // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  ecl: (value: string): boolean => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value), // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  pid: (value: string): boolean => /[0-9]{9}/i.test(value), // pid (Passport ID) - a nine-digit number, including leading zeroes.
  cid: (): boolean => true, // cid (Country ID) - ignored, missing or not.
}

// failed no clue wtf is wrong
export function part_b(data: Passport[]): Passport[] {
  const valid: Passport[] = []

  for (const passport of data) {
    let failed = false
    for (const key of Object.keys(passport)) {
      if (!validators[key](passport[key])) {
        failed = true
        break
      }
    }

    if (!failed) {
      valid.push(passport)
    }
  }

  return valid
}

utils
  .getInput('4')
  .then((raw) => {
    const data: Passport[] = []

    let temp = ''
    for (const line of raw.split(/\n/)) {
      if (line !== '') {
        temp += ` ${line}`
        continue
      }

      const obj = {}
      for (const item of temp.split(/\s/)) {
        const parts = item.split(/:/)
        if (fields.includes(parts[0])) {
          obj[parts[0]] = numbers.includes(parts[0]) ? parseInt(parts[1].trim()) : parts[1].trim()
        }
      }
      data.push(obj as Passport)
      temp = ''
    }

    console.log(c`{green ╭────────────────────────────╮}`)
    console.log(c`{green │ Day 00                     │}`)
    console.log(c`{green │────────────────────────────│}`)
    console.log(c`{green │}{bgGreen {black   Part A:  }}{green ${utils.leftPad(part_a(data).length, 16)}} {green │}`)
    console.log(c`{green │}{bgGreen {black   Part B:  }}{green ${utils.leftPad(part_b(part_a(data)).length, 16)}} {green │}`)
    console.log(c`{green ╰────────────────────────────╯}`)
  })
  .catch((err) => console.error(err))
