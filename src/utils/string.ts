const kebabToProperName = (kebabString: string): string =>
  kebabString
    .split("-") // Split the string by hyphen
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(" "); // Join words with a space

export { kebabToProperName };
