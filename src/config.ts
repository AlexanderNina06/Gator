import fs from "fs";
import os from "os";
import path from "path";

export type Config = { 
  dbUrl : string;
  currentUserName: string;
}

export function getConfigFilePath(): string {
  return path.join(os.homedir(), ".gatorconfig.json");
}

function validateConfig(raw: any): Config {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid config file: not an object");
  }

  if (typeof raw.db_url !== "string") {
    throw new Error("Invalid config file: db_url missing or not string");
  }

  return {
    dbUrl: raw.db_url,
    currentUserName: raw.current_user_name ?? ""
  };
}

function writeConfig(cfg: Config): void {
  const filePath = getConfigFilePath();

  const json = {
    db_url: cfg.dbUrl,
    current_user_name: cfg.currentUserName,
  };

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
}

export function setUser(username: string): void {

  const config = readConfig();

  const updated: Config = {
    dbUrl: config.dbUrl,          
    currentUserName: username    
  };

  writeConfig(updated);
}

export function readConfig(): Config {
  const filePath = getConfigFilePath();
  const data = fs.readFileSync(filePath, { encoding: "utf8" });

  const rawJson = JSON.parse(data);
  return validateConfig(rawJson);
}