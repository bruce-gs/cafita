/** Importar los comandos, obtener los argumentos y el nombre del comando */
import { commands } from '../../index.mjs';

export default {
  name: 'messageCreate',
  once: false,
  description: 'Se activa cuando se crea un mensaje.',
  async execute(message, client) {
    /** Definir el prefijo del bot */
    const prefix = '.';
    /** Comprobaciones previas antes de procesar el evento */
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (['DM', 'GroupDM'].includes(message.channel.type)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    /** Buscar el comando correspondiente al nombre o alias */
    const command =
      commands.get(commandName) ||
      commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    /** Si no se encuentra el comando, terminar la ejecución */
    if (!command) return;
    /** Obejto 'msg': contiene información relevante del mensaje y del cliente */
    const msg = {
      /** Autor del mensaje */
      author: message.author,
      authorId: message.author.id,
      authorUsername: message.author.username,
      authorDiscriminator: message.author.discriminator,
      authorAvatar: message.author.avatarURL(),
      authorTag: message.author.tag,
      /** Fecha y hora del mensaje */
      createdAt: message.createdAt,
      timeString: Math.floor(new Date() / 1000),
      /** Servidor del mensaje */
      guild: message.guild,
      guildId: message.guild.id,
      guildName: message.guild.name,
      guildRegion: message.guild.region,
      guildMemberCount: message.guild.memberCount,
      guildOwnerId: message.guild.ownerId,
      guildIcon: message.guild.iconURL(),
      guildVerficationLevel: message.guild.verificationLevel,
      /** Canal del mensaje */
      channel: message.channel,
      channelId: message.channel.id,
      channelName: message.channel.name,
      channelType: message.channel.type,
      /** Mensaje */
      content: message.content,
      messageId: message.id,
      messageEmbeds: message.embeds,
      messageAttachments: message.attachments,
      ping: Date.now() - message.createdTimestamp,
      /** Cliente */
      clientId: client.user.id,
      clientUsername: client.user.username,
      clientDiscriminator: client.user.discriminator,
      clientTag: client.user.tag,
      /** Algunos valores aleatorios */
      randomColorPastel: [...Array(3)]
        .map(_ => Math.round(Math.random() * 127 + 127).toString(16)).join(''),
      randomColorSoft: [...Array(3)]
        .map(() => Math.floor(Math.random() * 128 + 64).toString(16)).join(''),
      randomCode: [...Array(6)].map(_ => Math.floor(Math.random() * 10)).join(''),
      randomPassword: [...Array(8)].map(() => String
        .fromCharCode(Math.floor(Math.random() * 26) + 65 + Math
          .round(Math.random()))).join(''),
      /** Menciones */
      mentionRole:
        message.mentions.roles.first() ||
        message.guild.roles.cache.get(args[0]),
      mentionUser:
        message.mentions.users.first() ||
        (await client.users.fetch(args[0]).catch(() => null)) ||
        client.users.cache.find(user => user.username && user.username
          .toLowerCase().includes(args[0]?.toLowerCase())) ||
        message.author,
      mentionChannel:
        message.mentions.channels.first() ||
        message.guild.channels.cache.get(args[0]) ||
        message.guild.channels.cache
          .find(c => c.name.toLowerCase().includes(args[0]?.toLowerCase())) ||
        message.channel
    };
    /** Ejecutar el comando y manejar cualquier error que se produzca */
    try {
      command.execute(message, args, client, msg);
    } catch (err) {
      console.log(err);
    };
  }
};
