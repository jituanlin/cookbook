import fs from "fs/promises";
import path from "path";

import { Service } from "toy-js/dist/es6/index.server";

@Service()
export class FileService {
  async readFile(path$: string): Promise<string> {
    const buffer = await fs.readFile(path.join(__dirname, path$));
    return buffer.toString();
  }
}
