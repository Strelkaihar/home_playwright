function getDuplicate(str) {
    const letters = str.split('')
    let duplicates = []
    for(let i = 0; i < letters.length; i++) {
        let curentLetter = letters[i]
        let rest = letters.slice(i + 1)
 
        if(rest.includes(curentLetter) && !duplicates.includes(curentLetter)) 
        duplicates.push(curentLetter)
    }
    return duplicates
}

console.log(getDuplicate('automation'))
