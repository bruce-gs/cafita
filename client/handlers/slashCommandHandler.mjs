import fs from 'fs';
import path from 'path';
import { Collection } from 'discord.js';

export class SlashCommandHandler {
  static async loadSlashCommands(client) {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const slashCommands = new Collection();

    fs.readdirSync(path.join(__dirname, '..', 'commands', 'slashCommands'), { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .forEach(folder => {
        fs.readdirSync(path.join(__dirname, '..', 'commands', 'slashCommands', folder.name))
          .filter(file => file.endsWith('.mjs'))
          .forEach(async file => {
            const { default: command } = await import(path.join(__dirname, '..', 'commands', 'slashCommands', folder.name, file));
            if (command && command.execute && command.data) {
              slashCommands.set(command.data.name, command);
            } else {
              console.warn(`Al archivo '${file}' le falta 'data' o 'execute'.`);
            };
          });
      });
    client.slashCommands = slashCommands;
    return slashCommands;
  };
};