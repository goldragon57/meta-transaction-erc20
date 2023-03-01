import * as fs from "fs";

const writeConfig = (key: string, value: string) => {
  const updatingString = `export const ${key} = '${value}';`;
  const config_contracts: string = fs
    .readFileSync("./config/contracts.ts")
    .toString();
  const configs = config_contracts.split("\n");

  let i: number;
  for (i = 0; i < configs.length; i++)
    if (configs[i].includes(key)) {
      configs[i] = updatingString;
      break;
    }
  if (i == configs.length) configs.push(updatingString);

  fs.writeFileSync("./config/contracts.ts", configs.join("\n"));
};

export default writeConfig;
