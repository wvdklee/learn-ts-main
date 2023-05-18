import { readInput, readExampleInput }  from '../utils'
import * as _ from 'lodash'

// Input
const input = readInput({day: 1})
const exampleInput = readExampleInput({day: 1})

// Part 1
function caloriesCarriedByTheMostCalorificElf(input: string[]): number {
    let [cals, largest] = [0, 0]
    input.forEach(cal => {
        if (cal.length === 0){        
            largest = cals > largest ? cals : largest
            cals = 0;
        } else 
            cals += +cal
    })
    return largest > cals ? largest : cals
}

// Part 2
function caloriesCarriedByTheTopThreeElves(input: string[]): number {
    let cals = 0
    let totalCals: number[] = []
    input.forEach(cal => {
        if (cal.length === 0){        
            totalCals.push(cals)
            cals = 0;
        } else 
            cals += +cal
    })
    totalCals.push(cals)
    totalCals.sort((a,b) => b-a )
    return _.sum(_.take(totalCals, 3))
}

// Tests
describe('Calorie counting', () => {
    test('Part 1: Most calorific elf', () => {
        expect(caloriesCarriedByTheMostCalorificElf(exampleInput)).toBe(24000)        
        expect(caloriesCarriedByTheMostCalorificElf(input)).toBe(67450)        
    })

    test('Part 2: Calories carried by the top 3 elves', () => {
        expect(caloriesCarriedByTheTopThreeElves(exampleInput)).toBe(45000)
        expect(caloriesCarriedByTheTopThreeElves(input)).toBe(199357)
    })
})