import * as fs from 'fs'
import * as http from 'https'
import * as path from 'path'

const cache = ['', ' ', '  ', '   ', '    ', '     ', '      ', '       ', '        ', '         ']

export function leftPad(str: string | number, len: number, ch?: string | number): string {
  str = str + ''
  len = len - str.length
  if (len <= 0) return str
  if (!ch && ch !== 0) ch = ' '
  ch = ch + ''
  if (ch === ' ' && len < 10) return cache[len] + str
  let pad = ''
  while (true) {
    if (len & 1) pad += ch
    len >>= 1
    if (len) ch += ch
    else break
  }
  return pad + str
}

export async function getInput(day: number | string, session?: string): Promise<string> {
  let raw = ''

  const file = path.resolve(__dirname, `../input/day-${day}.txt`)
  fs.mkdirSync(path.resolve(__dirname, `../input`), { recursive: true })

  if (fs.existsSync(file)) {
    raw = fs.readFileSync(file).toString()
  } else {
    raw = await new Promise((resolve, reject) => {
      http.get(
        {
          host: 'adventofcode.com',
          path: `/2020/day/${day}/input`,
          port: 443,
          method: 'GET',
          headers: { cookie: `session=${session || process.env.SESSION_TOKEN}` },
        },
        (res) => {
          let str = ''
          res.on('data', (chunk: Buffer) => {
            str += chunk.toString()
          })

          res.on('end', () => {
            if (res.statusCode !== 200) {
              reject(new Error('not authorised'))
            } else {
              resolve(str)
            }
          })
        },
      )
    })
    fs.writeFileSync(file, raw)
  }

  return raw
}
