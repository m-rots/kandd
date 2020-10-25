export const seperator = (length: number, index: number): string => {
  if (index == length - 2) {
    return " and "
  }

  if (index < length - 2) {
    return ", "
  }

  return ""
}

export const withSpace = (word: string): string => {
  return word.replace(/([A-Z])/g, " $1").trim();
}