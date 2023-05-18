import {
  readInput,
  readExampleInput,
  createEmptyArrays,
  removeHeadMutable,
  prependItemMutable,
  prependItemsMutable,
  removeItemsMutable,
} from "../utils"
import * as _ from "lodash"

const EMPTY: string = " "

interface Instruction {
  numCratesToMove: number
  fromStack: number
  toStack: number
}

type Stacks = string[][]

// Input
const input = readInput({ day: 5 })

/*
 * Parse input into a plan and the instructions
 */
const breakpoint = input.indexOf("")
const [plan, instructionLines] = [
  input.slice(0, breakpoint),
  input.slice(breakpoint + 1),
]

/*
 * Locate some key information from the plan
 */
const stackNumbers = plan[plan.length - 1]
const stackNumberIndexes = stackNumbers
  .split("")
  .filter((c) => c !== EMPTY)
  .map((c) => stackNumbers.indexOf(c))
const stackRows = plan.slice(0, plan.length - 1)
const numStacks = stackNumberIndexes.length

const instructions: Instruction[] = instructionLines.map(parseInstruction)

function getCrateContents(row: string, stackNum: number): string {
  const pos = stackNumberIndexes[stackNum - 1]
  return pos < row.length ? row[pos] : EMPTY
}

function buildStacksFromInput(): Stacks {
  const stacks = createEmptyArrays<string>(numStacks)
  stackRows.forEach((row) => {
    let currStack = 1
    while (currStack <= numStacks) {
      const contents = getCrateContents(row, currStack)
      if (contents !== EMPTY) stacks[currStack - 1].push(contents)
      currStack++
    }
  })
  return stacks
}

function executeProcedureWithCrane9000(stacks: Stacks): Stacks {
  instructions.forEach(({ numCratesToMove, fromStack, toStack }) => {
    for (let move = 0; move < numCratesToMove; move++) {
      let sourceStack = stacks[fromStack - 1]
      let targetStack = stacks[toStack - 1]
      prependItemMutable(removeHeadMutable(sourceStack), targetStack)
    }
  })
  return stacks
}
function executeProcedureWithCrane9001(stacks: Stacks): Stacks {
  instructions.forEach(({ numCratesToMove, fromStack, toStack }) => {
    let sourceStack = stacks[fromStack - 1]
    let targetStack = stacks[toStack - 1]
    prependItemsMutable(
      removeItemsMutable(sourceStack, numCratesToMove),
      targetStack
    )
  })
  return stacks
}

function getMessageFromStacks(stacks: Stacks): string {
  return stacks.map((stack) => stack[0]).join("")
}

function parseInstruction(stringInstruction: string): Instruction {
  const tokens = stringInstruction.split(" ")
  return {
    numCratesToMove: +tokens[1],
    fromStack: +tokens[3],
    toStack: +tokens[5],
  }
}

// Tests
describe("Camp Cleanup", () => {
  let stacks: Stacks
  beforeEach(() => {
    stacks = buildStacksFromInput()
  })
  test("Part 1: Message in the top crates", () => {
    const finalStack = executeProcedureWithCrane9000(stacks)
    expect(getMessageFromStacks(finalStack)).toBe("SBPQRSCDF")
  })
  test("Part 2: Message in the top crates when using the new machine", () => {
    const finalStack = executeProcedureWithCrane9001(stacks)
    expect(getMessageFromStacks(finalStack)).toBe("RGLVRCQSB")
  })
})
