interface VariableValue {
  value: string;
  weight: number;
}

type Rule = Record<string, VariableValue[]>;

const parseVariableDefinition = (definition: string): VariableValue[] => {
  const elements = definition.split(",");
  return elements.map((element) => {
    const [value, weight] = element.split("-");
    return { value, weight: +weight || 1 };
  });
};

const compileRule = (input: string): Rule => {
  const lines = input.split(/[\n\r]+/);
  const rules: Rule = {};
  const maxIterations = 10;
  let adHocCounter = 0;

  const extractAndReplaceAdHocVariables = (expression: string) => {
    let result = expression;
    let iteration = 0;
    while (iteration < maxIterations) {
      // Find a string inside a parentheses that doesn't contain a parentheses.
      // For example, when run against `(a,(b,c))` it'll return '(b,c)`
      const foundAdHocVars = result.match(/\([^()]+\)/g);
      if (!foundAdHocVars?.length) {
        break;
      }
      foundAdHocVars.forEach((adHocVar) => {
        const variableName = `ADHOC${adHocCounter}`;
        result = result.replace(adHocVar, `<${variableName}>`);
        rules[variableName] = parseVariableDefinition(
          adHocVar.replace(/[()]/g, "")
        );
        adHocCounter++;
      });
      iteration++;
    }
    return result;
  };

  lines
    .filter((line) => line.includes("="))
    .forEach((line) => {
      const [variableName, rawExpression] = line.split("=");
      const processedExpression =
        extractAndReplaceAdHocVariables(rawExpression);
      rules[variableName.trim()] = parseVariableDefinition(processedExpression);
    });
  return rules;
};

const chooseValue = (values: VariableValue[]): string => {
  let result = "";

  if (!values.length) {
    return result;
  }

  const totalWeight = values.reduce((acc, { weight }) => acc + weight, 0);
  let random = Math.random() * totalWeight;

  values.forEach(({ value, weight }) => {
    if (result) {
      return;
    }

    random -= weight;

    if (random < 0) {
      result = value;
    }
  });

  return result;
};

const replaceVariableInWord = (
  word: string,
  rule: Rule,
  maxIterations: number = 100
): string => {
  let loopCounter = 0;

  while (loopCounter < maxIterations) {
    loopCounter++;
    const matchedVariable = word.match(/<[^<>]+>/);
    if (!matchedVariable) {
      break;
    }
    const variableTag = matchedVariable[0];
    const variableName = variableTag.replace(/[<>]/g, "");
    const variabValues = rule[variableName] || [];
    const variableValue = chooseValue(variabValues);
    word = word.replace(variableTag, variableValue);
  }

  return word;
};

const buildWord = (rule: Rule) => {
  if (!rule.word) {
    return "";
  }
  let initialWord = chooseValue(rule.word);
  if (!initialWord) {
    return "";
  }
  const finalWord = replaceVariableInWord(initialWord, rule);
  return finalWord.replace(/0/g, "");
};

export { compileRule, buildWord };
