import { readInput, readExampleInput } from "../utils"
import { intersection } from "lodash"

// Input
const input = readInput({ day: 3 })
const exampleInput = readExampleInput({ day: 3 })

// Common functions
function itemCommonToCompartments(contents: string[]): string {
  const items = contents.map((comp) => comp.split(""))
  return intersection(...items).toString()
}
function getCompartmentContents(rucksack: string): [string, string] {
  const rucksackSize = rucksack.length
  const halfWay = rucksackSize / 2
  return [
    rucksack.substring(0, halfWay),
    rucksack.substring(halfWay, rucksackSize),
  ]
}

function getItemPriority(item: string): number {
  if (item) {
    const code = item.charCodeAt(0)
    if (code >= 97 && code <= 122) return code - 96
    else if (code >= 65 && code <= 90) return code - 38
  }
  return 0
}

// Part 1
function sumOfPriorities(input: string[]): number {
  return input.reduce((sum, rucksack) => {
    const contents = getCompartmentContents(rucksack)
    const commonItem = itemCommonToCompartments(contents)
    return sum + getItemPriority(commonItem)
  }, 0)
}

// Part 2
function sumOfGroupPriorities(input: string[]): number {
  let elfGroup: string[] = []
  let [totalPriorities, currElfInGroup] = [0, 0]
  input.forEach((line) => {
    elfGroup.push(line)
    if (++currElfInGroup % 3 === 0) {
      const commonItem = itemCommonToCompartments(elfGroup)
      totalPriorities += getItemPriority(commonItem)
      elfGroup = []
    }
  })
  return totalPriorities
}

// Tests
describe("Rucksack Reorganisation", () => {
  test("Part 1: sum of priorities of common rucksack items", () => {
    expect(sumOfPriorities(exampleInput)).toBe(157)
    expect(sumOfPriorities(input)).toBe(8153)
  })

  test("Temp test", () => {
    expect(sumOfGroupPriorities(exampleInput)).toBe(70)
    expect(sumOfGroupPriorities(input)).toBe(2342)
  })
})
