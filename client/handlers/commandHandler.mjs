import { Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';

export class CommandHandler {
  static loadCommands(client) {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const commandsDir = path.join(__dirname, '..', 'commands', 'messageCommands');
    const commands = new Collection();
    fs.readdirSync(commandsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .forEach(category => {
        fs.readdirSync(path.join(commandsDir, category.name))
          .filter(file => file.endsWith('.mjs'))
          .forEach(async file => {
            const { default: command } =
              await import(path.join(commandsDir, category.name, file));
            if (command && command.name) {
              commands.set(command.name, command);
            };
          });
      });
    client.commands = commands;
  };
};