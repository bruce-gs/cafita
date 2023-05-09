import { Client, Events } from 'discord.js';
import { Options } from './client/options.mjs';
import { EventHandler } from './client/handlers/eventHandler.mjs';
import { CommandHandler } from './client/handlers/commandHandler.mjs';
import { SlashCommandHandler } from './client/handlers/slashCommandHandler.mjs';
import { startServer } from './client/startServer.mjs';
import fs from 'fs';
import path from 'path';

const client = new Client(new Options());

EventHandler.loadEvents(client);
CommandHandler.loadCommands(client);
SlashCommandHandler.loadSlashCommands(client);
startServer();

export const commands = client.commands;
export const slashCommands = client.slashCommands;

client.login(process.env.token);