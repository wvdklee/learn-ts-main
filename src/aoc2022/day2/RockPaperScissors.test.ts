import { readInput, readExampleInput }  from '../utils'

// Input
const input = readInput({day: 2})
const exampleInput = readExampleInput({day: 2})

// Part 1
function getScore(move: string): number {
    if (['A Y', 'B Z', 'C X'].includes(move))
        return 6
    else if (['A X', 'B Y', 'C Z'].includes(move))
        return 3
    else 
        return 0
}

function getMyValue(letter: string): number {
    switch (letter){
        case 'X': return 1
        case 'Y': return 2
        case 'Z': return 3
        default: return 0
    }
}

function totalScoreUsingStrategyGuide(input: string[]): number {
    let score = 0
    input.forEach(moves => {
        const thisRound = getMyValue(moves[2]) + getScore(moves)
        score += thisRound
    })    
    return score
}

// Part 2
function totalScoreUsingRealGuide(input: string[]): number {
    const lookup: {[move: string]:number} = {
        'A Z': 8,
        'B Z': 9,
        'C Z': 7,
        'A Y': 4,
        'B Y': 5,
        'C Y': 6,
        'A X': 3,
        'B X': 1,
        'C X': 2,
    }

    let score = 0
    input.forEach(moves => {
        const thisRound = lookup[moves]
        score += thisRound ?? 0
    })    
    return score
}

// Tests
describe('Rock Paper Scissors', () => {
    test('Part 1: total score using strategy guide', () => {
        expect(totalScoreUsingStrategyGuide(exampleInput)).toBe(15)        
        expect(totalScoreUsingStrategyGuide(input)).toBe(13052)        
    })
    test('Part 2: total score using real guide', () => {
        expect(totalScoreUsingRealGuide(exampleInput)).toBe(12)        
        expect(totalScoreUsingRealGuide(input)).toBe(13693)        
    })
})