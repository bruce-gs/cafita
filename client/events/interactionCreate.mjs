/** Obtenemos la colección de comandos de barra*/
import { slashCommands } from '../../index.mjs';

export default {
  name: 'interactionCreate',
  once: false,
  description: 'Se emite cuando el cliente detecta una interacción',
  async execute(interaction, client) {
    /** Detiene la ejecución si no es un comando de barra */
    if(!interaction.isChatInputCommand()) return;
    /** Obtenemos el comando de barra */
    const command = slashCommands.get(interaction.commandName);
    /** Si no se obtiene el comando */
    if (!command) {
      console.error(`No se encontró el comando ${interaction.commandName}.`);
      interaction.reply({
        content: `El comando \`${interaction.commandName}\` no existe.`,
        ephemeral: true
      });
      return;
    };
    const data = {
      /** Autor de la interacción */
      authorId: interaction.user.id,
      authorUsername: interaction.user.username,
      authorDiscriminator: interaction.user.discriminator,
      authorAvatar: interaction.user.avatarURL(),
      authorTag: interaction.user.tag,
      /** Fecha y hora de la interacción */
      createdAt: interaction.createdAt,
      timeString: Math.floor(new Date() / 1000),
      /** Servidor de la interacción */
      guildId: interaction.guild.id,
      guildName: interaction.guild.name,
      guildRegion: interaction.guild.region,
      guildMemberCount: interaction.guild.memberCount,
      guildOwnerId: interaction.guild.ownerId,
      guildIcon: interaction.guild.iconURL(),
      guildVerficationLevel: interaction.guild.verificationLevel,
      /** Canal de la interacción */
      channelId: interaction.channel.id,
      channelName: interaction.channel.name,channelType: interaction.channel.type,
      /** Mensaje */
      ping: Date.now() - interaction.createdTimestamp,
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
          .round(Math.random()))).join('')
    };
    /** Ejecutamos el comando */
    try { await command.execute(interaction, data) }
    catch (err) { console.error(err) };
  }
};