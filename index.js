const config = require('./config');
const { Client } = require('discord.js');
const client = new Client({
  intents: 3276799
});

client.once('ready', client => {
  console.log(`${client.user.tag} en línea.`);
});
client.on('messageCreate', message => {
  if(message.author.bot) return;
  message.reply({
    content: `Hola ${message.author.tag} ;)`,
    allowedMentions: {
      repliedUser: false
    }
  });
});

client.login(config.token);
