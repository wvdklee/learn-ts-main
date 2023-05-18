import { readInput, readExampleInput } from "../utils"

// Input
const input = readInput({ day: 4 })
const exampleInput = readExampleInput({ day: 4 })

type Bounds = {
  lower: number
  upper: number
}

function extractSectionRange(s: string): Bounds {
  const bounds = s.split("-").map((n) => +n)
  return { lower: bounds[0], upper: bounds[1] }
}

function containsOther(first: Bounds, second: Bounds): boolean {
  return (
    (first.lower >= second.lower && first.upper <= second.upper) ||
    (second.lower >= first.lower && second.upper <= first.upper)
  )
}

function overlap(first: Bounds, second: Bounds): boolean {
  return (
    (second.lower >= first.lower && second.lower <= first.upper) ||
    (second.upper >= first.lower && second.upper <= first.upper) ||
    (first.lower >= second.lower && first.lower <= second.upper) ||
    (first.upper >= second.lower && first.upper <= second.upper)
  )
}

function answer(
  pairs: string[],
  predicate: (a: Bounds, b: Bounds) => boolean
): number {
  let result = 0
  pairs.forEach((assignmentPair) => {
    const [first, second] = assignmentPair.split(",")
    const sectionRanges = [
      extractSectionRange(first),
      extractSectionRange(second),
    ]
    result += predicate(sectionRanges[0], sectionRanges[1]) ? 1 : 0
  })
  return result
}

// Tests
describe("Camp Cleanup", () => {
  test("Part 1: Number of assignments in which one range fully contains the other", () => {
    expect(answer(exampleInput, containsOther)).toBe(2)
    expect(answer(input, containsOther)).toBe(599)
  })
  test("Part 2: Number of assignments that overlap each other at all", () => {
    expect(answer(exampleInput, overlap)).toBe(4)
    expect(answer(input, overlap)).toBe(599)
  })
})
