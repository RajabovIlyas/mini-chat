import { promises as fsp } from 'fs'
import { parse as yamlParse } from 'yaml'
import * as path from 'node:path'
import { Config } from './config.interface'

const NODE_ENV = process.env.NODE_ENV ?? 'development'

const CONFIG_PATH = path.resolve(__dirname, '..', '..', '..', 'config', `config.${NODE_ENV}.yaml`)

export async function readYamlConfig(): Promise<Config> {
  const apisConfigContent = await fsp.readFile(CONFIG_PATH, {
    encoding: 'utf8'
  })
  return yamlParse(apisConfigContent) as Config
}