import * as fs from "fs"
import nReadlines from "n-readlines"
import { range } from "lodash"

/*
 * Arrays
 */

export function createEmptyArrays<T>(n: number): Array<T>[] {
  return range(0, n).map((_) => new Array<T>())
}

export function takeHead<T>(items: T[]): [T, T[]] {
  return [items[0], items.slice(1)]
}

export function prepend<T>(item: T, items: T[]): T[] {
  return [item, ...items]
}

export function removeHeadMutable<T>(items: T[]): T {
  return items.splice(0, 1)[0]
}
export function prependItemMutable<T>(item: T, items: T[]): void {
  items.unshift(item)
}

export function removeItemsMutable<T>(items: T[], n: number): T[] {
  return items.splice(0, n)
}
export function prependItemsMutable<T>(newItems: T[], items: T[]): void {
  newItems.reverse().forEach((item) => items.unshift(item))
}

/*
 * File reading
 */
type Input = {
  day: number
}

export function readInput(input: Input) {
  return read(false, input.day)
}
export function readExampleInput(input: Input) {
  return read(true, input.day)
}

export function fileReaderForExampleInputOnDay(day: number) {
  return fileReader(true, day)
}
export function fileReaderForInputOnDay(day: number) {
  return fileReader(false, day)
}

function fileReader(example: boolean, day: number): nReadlines {
  const filename = example ? "input.example.txt" : "input.txt"
  const pathPrefix = `src/aoc2022/day${day}/${filename}`
  return new nReadlines(pathPrefix)
}

function read(example: boolean, day: number): string[] {
  const filename = example ? "input.example.txt" : "input.txt"
  const pathPrefix = `src/aoc2022/day${day}/${filename}`
  const contents = fs.readFileSync(pathPrefix, "utf-8")
  return contents.split("\n")
}
