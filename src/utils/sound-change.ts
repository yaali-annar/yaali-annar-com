interface Change {
  regex: RegExp;
  stringTransformation: string;
}

const applyChanges = (input: string, changes: Change[]): string => {
  let output = input;

  changes.forEach(({ regex, stringTransformation }) => {
    output = output.replace(regex, stringTransformation);
  });

  return output;
};

const parseChanges = (changesString: string): Change[] => {
  const lines = changesString.split("\n");
  const variables: Record<string, string> = {};
  const changes: Change[] = [];

  lines.forEach((line) => {
    // Trim to remove extra spaces and ignore empty lines or comments
    line = line.trim();
    if (line === "" || line.startsWith("#")) {
      return;
    }

    // Check for variable definitions
    if (line.includes("=") && !line.includes("\t")) {
      const [variableName, value] = line.split("=");
      variables[variableName.trim()] = value.trim();
      return;
    }

    // Parse regex and transformations, replacing variables
    const [regex, stringTransformation] = line.split("\t");
    const resolvedRegex = regex.replace(/<(\w+)>/g, (_, varName) => {
      // Replace variable placeholder with actual value
      return variables[varName] || `<${varName}>`; // Return unresolved variables as they were if not found
    });

    changes.push({
      regex: new RegExp(resolvedRegex, "g"), // Using global flag for replacements
      stringTransformation,
    });
  });

  return changes;
};

export { applyChanges, parseChanges };
