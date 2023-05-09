import { REST, Routes } from 'discord.js';
import fs from 'fs/promises';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

(async () => {
  try {
    const rest = new REST({ version: '10' }).setToken(process.env.token);
    const slashCommands = [];
    for await (const folder of await fs.readdir(path.join(__dirname, 'commands', 'slashCommands'))) {
      for await (const file of (await fs.readdir(path.join(__dirname, 'commands', 'slashCommands', folder))).filter(file => file.endsWith('.mjs'))) {
        const sCFilePath = path.join(__dirname, 'commands', 'slashCommands', folder, file);
        const { default: slashCommand } = await import(sCFilePath);
        if ('data' in slashCommand && 'execute' in slashCommand) slashCommands.push(slashCommand.data.toJSON());
        else console.log(`[ADVERTENCIA] El comando en ${sCFilePath} no tiene las propiedades "data" o "execute" requeridas.`);
      }
    }
    console.log(`Actualizando ${slashCommands.length} comando(s)(/) de cafita.`);
    const data = await rest.put(Routes.applicationCommands(process.env.cafitaid), { body: slashCommands });
    console.log(`Se actualizaron ${data.length} comando(s)(/) de cafita.`);
  } catch (error) {
    console.error(error);
  }
})();