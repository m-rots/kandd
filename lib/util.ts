export const seperator = (length: number, index: number): string => {
  if (index == length - 2) {
    return " and "
  }

  if (index < length - 2) {
    return ", "
  }

  return ""
}