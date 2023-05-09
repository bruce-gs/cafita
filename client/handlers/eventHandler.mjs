import fs from 'fs';
import path from 'path';

export class EventHandler {
  static async loadEvents(client) {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const eventsPath = path.join(__dirname, '..', 'events');
    fs.readdirSync(eventsPath).filter(file => file.endsWith('.mjs'))
      .forEach(async file => {
        const { default: event } = await import(path.join(eventsPath, file));
        const eventType = event.once ? 'once' : 'on';
        client[eventType](event.name, (...args) => event.execute(...args, client));
      });
  };
};