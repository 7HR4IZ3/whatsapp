import path from "path";
import fs from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import { BufferJSON } from "@whiskeysockets/baileys";

const store = new Map();

export class WhatsappAuthStore {
  async get(id: string): Promise<{ [key: string]: any } | null> {
    return store.get(id);
  }
  async set(id: string, data: any): Promise<void> {
    store.set(id, data);
  }
  async delete(id: string): Promise<void> {
    store.delete(id);
  }
}

export class FilesystemAuthStore extends WhatsappAuthStore {
  folder: string;

  constructor(folder?: string) {
    super();
    this.folder = folder ?? path.join(process.cwd(), "auth-store");
    if (!existsSync(this.folder)) {
      mkdirSync(this.folder, { recursive: true });
    }
  }

  async get(id: string): Promise<{ [key: string]: any } | null> {
    const file = path.join(this.folder, this.#fixFileName(id));
    try {
      const data = await fs.readFile(file, { encoding: "utf-8" });
      return JSON.parse(data, BufferJSON.reviver);
    } catch (error) {
      return null;
    }
  }

  async set(id: string, data: any) {
    const file = path.join(this.folder, this.#fixFileName(id));
    await fs.writeFile(file, JSON.stringify(data, BufferJSON.replacer));
  }

  async delete(id: string) {
    const file = path.join(this.folder, this.#fixFileName(id));
    await fs.unlink(file);
  }

  #fixFileName(file: string) {
    return file.replace(/\//g, "__").replace(/:/g, "-");
  }
}
