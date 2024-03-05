import wordlist from './wordlist.json'

const masculineWordList = wordlist.masculine_coded_words
const femenineWordList = wordlist.feminine_coded_words
const nonCodedWordList = wordlist.non_coded_exceptions


export const countMasculineWords = (text: string): number => {
    const words = textToWords(text)
    return filterMasculineWords(words).length
}

export const countFemenineWords = (text: string): number => {
    const words = textToWords(text)
    return matchWordWithFemenineWordList(words).length
}

const textToWords = (text: string): string[] => {
    return text.replace(/[^ -~]+/g, " ").split(" ")
}

const filterMasculineWords = (words: string[]): string[] => {
    return words.map(word => matchWordWithCodedWordList(word, masculineWordList, nonCodedWordList)).filter(word => word.length > 0)
}

const matchWordWithFemenineWordList = (words: string[]): string[] => {
    return words.map(word => matchWordWithCodedWordList(word, femenineWordList, nonCodedWordList)).filter(word => word.length > 0)
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