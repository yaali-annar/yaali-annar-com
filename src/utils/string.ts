const kebabToProperName = (kebabString: string): string =>
  kebabString
    .split("-") // Split the string by hyphen
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(" "); // Join words with a space

type ClassNamesInput = string | Record<string, boolean>;

function classNames(...args: ClassNamesInput[]): string {
  const classes = args
    .flatMap((arg) => {
      if (typeof arg === "string") {
        return arg;
      }
      if (typeof arg === "object") {
        return Object.keys(arg).filter((key) => arg[key]);
      }
      return [];
    })
    .flatMap((className) => className.split(" "));
  const classSet = new Set(classes);
  return Array.from(classSet).join(" ");
}

export { classNames, kebabToProperName };
