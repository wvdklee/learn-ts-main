import { readInput } from "../utils"
import * as _ from "lodash"

function allChrsDifferent(chrs: string[]): boolean {
  return chrs.length == new Set<string>(chrs).size
}

function part1(markerLen: number, input: string): number {
  let pos = 0
  let buf: string[] = []
  let finished = false
  while (pos < input.length && !finished) {
    const chr = input.charAt(pos)
    buf.push(chr)
    if (buf.length >= markerLen) {
      buf = buf.slice(-markerLen)
      if (allChrsDifferent(buf)) finished = true
    }
    pos++
  }
  return pos
}

describe("Tuning Trouble", () => {
  test("Part 1: Example input", () => {
    expect(part1(4, "mjqjpqmgbljsphdztnvjfqwrcgsmlb")).toBe(7)
    expect(part1(4, "bvwbjplbgvbhsrlpgdmjqwftvncz")).toBe(5)
    expect(part1(4, "nppdvjthqldpwncqszvftbrmjlhg")).toBe(6)
    expect(part1(4, "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toBe(10)
    expect(part1(4, "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toBe(11)
  })
  test("Part 1: Real input", () => {
    const input = readInput({ day: 6 })[0]
    expect(part1(4, input)).toBe(1804)
  })
  test("Part 2: Example input", () => {
    expect(part1(14, "mjqjpqmgbljsphdztnvjfqwrcgsmlb")).toBe(19)
    expect(part1(14, "bvwbjplbgvbhsrlpgdmjqwftvncz")).toBe(23)
    expect(part1(14, "nppdvjthqldpwncqszvftbrmjlhg")).toBe(23)
    expect(part1(14, "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toBe(29)
    expect(part1(14, "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toBe(26)
  })
  test("Part 2: Real input", () => {
    const input = readInput({ day: 6 })[0]
    expect(part1(14, input)).toBe(2508)
  })
})
