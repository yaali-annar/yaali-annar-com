interface Change {
  regex: RegExp;
  stringTransformation: string;
}

const applyChanges = (input: string, changes: Change[]): string => {
  let output = input;

  for (const { regex, stringTransformation } of changes) {
    output = output.replace(regex, stringTransformation);
  }

  return output;
};

const parseChanges = (changesString: string, emptyMarker: string): Change[] => {
  const lines = changesString.split("\n");
  const variables: Record<string, string> = {};
  const changes: Change[] = [];

  for (const line of lines) {
    if (line === "" || line.startsWith("#")) {
      continue;
    }

    // Check for variable definitions
    if (line.includes("=") && !line.includes("\t")) {
      const [variableName, value] = line.split("=");
      variables[variableName.trim()] = value.trim();
      continue;
    }

    // Parse regex and transformations, replacing variables
    let [regex, stringTransformation] = line.split("\t");

    if (!stringTransformation) {
      continue;
    }

    const resolvedRegex = regex.replace(/<(\w+)>/g, (_, varName) => {
      // Replace variable placeholder with actual value
      return variables[varName] || `<${varName}>`; // Return unresolved variables as they were if not found
    });

    stringTransformation = stringTransformation.replaceAll(emptyMarker, "");

    changes.push({
      regex: new RegExp(resolvedRegex, "g"), // Using global flag for replacements
      stringTransformation,
    });
  }

  return changes;
};

export { applyChanges, parseChanges };
export type { Change };
