import FoundWord from '../types/FoundWord'
import wordlist from './wordlist.json'

const masculineWordList = wordlist.masculine_coded_words
const femenineWordList = wordlist.feminine_coded_words
const nonCodedWordList = wordlist.non_coded_exceptions

export const findFemenineWords = (text: string): FoundWord[] => {
    return findWords(text.toLowerCase(), femenineWordList, nonCodedWordList)
}

export const findMasculineWords = (text: string): FoundWord[] => {
    return findWords(text.toLowerCase(), masculineWordList, nonCodedWordList)
}

export const findWords = (text: string, codedWordList: string[], neutralWordList: string[]): FoundWord[] => {
    return codedWordList.flatMap(word => findWord(text, word, neutralWordList))
}

const findWord = (text: string, word: string, neutralWordList: string[]): FoundWord[] => {
    let regex = new RegExp(`[^A-Za-z0-9]?${word}[A-Za-z]*`, "ig")
    const matchesIterator = text.matchAll(regex)
    const matches = Array.from(matchesIterator)

    /*     for (const match of matches) {
            if (match.index === undefined) {
                console.log("match.index is undefined")
            } else {
                console.log(
                    `Found ${match[0]} start=${match.index} end=${match.index + match[0].length
                    }.`,
                )
            }
        } */

    const filteredMatches = matches.filter(m => filterNeutralWords(m[0], neutralWordList))
    console.log(`filteredMatches: ${filteredMatches}`)
    return filteredMatches.map(
        m => ({ word: m[0], sentence: getSentenceOfFoundWord(matchToFoundWord(m), text), index: m.index || -1 })
    )
}

const matchToFoundWord = (match: RegExpMatchArray): FoundWord => {
    return { word: match[0], index: match.index || -1 }
}

const filterNeutralWords = (word: string, neutralWordList: string[]): boolean => {
    return neutralWordList
        .map(neutralWord => !(word.toLowerCase().startsWith(neutralWord.toLowerCase())))
        .reduce((acc: boolean, curr: boolean) => acc || curr, false)
}

const matchWordWithCodedWordList = (word: string, codedWordList: string[], neutralWordList: string[]): string => {
    if (neutralWordList.includes(word)) {
        return ""
    }
    for (let codedWord of codedWordList) {
        if (word.startsWith(codedWord)) {
            return word
        }
    }
    return ""
}

export const getSentenceOfFoundWord = (foundWord: FoundWord, text: string): string => {
    let allNonPrintableCharacters = new RegExp(`[^ -~]`, "g")
    const matches = text.matchAll(allNonPrintableCharacters)

    let prevMatchIndex = -1
    let nextMatchIndex = -1
    for (const match of matches) {
        if (match.index === undefined) continue
        if (foundWord.index > match.index) {
            { prevMatchIndex = match.index }
        }
        if (foundWord.index < match.index) {
            { nextMatchIndex = match.index }
            break
        }
    }

    return text.substring(prevMatchIndex + 1, nextMatchIndex)

}