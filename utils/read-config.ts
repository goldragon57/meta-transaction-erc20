import * as fs from "fs";

const readConfig = (key: string) => {
  const config_contracts = fs.readFileSync("./config/contracts.ts").toString();
  const configs = config_contracts.split("\n");

  for (let i = 0; i < configs.length; i++) {
    if (configs[i].includes(key)) {
      const config_split = configs[i].split("=");

      return config_split[1]
        .replace(/'/gi, "")
        .replace(/"/gi, "")
        .replace(";", "")
        .replace(" ", "");
    }
  }

  return "";
};

export default readConfig;
