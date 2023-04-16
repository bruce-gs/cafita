const config = require('./config);
const { Client } = require('discord.js');
const client = new Client({ intents: 3276799 });

client.login(config.token).then(console.log(`Bot conectado/a como ${client.user.username}`));
