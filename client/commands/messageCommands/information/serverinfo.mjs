import { EmbedBuilder } from 'discord.js';

export default {
  name: 'serverinfo',
  category: 'Information',
  description: 'Obten información del servidor.',
  example: '[prefix]serverinfo',
  usage: '[prefix]serverinfo',
  aliases: [ 'svinfo' ],
  cooldown: 'Sin cooldown',
  botPermissions: [ 'ViewChannel', 'SendMessages' ],
  userPermissions: [ 'SendMessages' ],
  hidden: false,
  ownerOnly: false,
  nsfw: false,
  execute ( message, args, client, msg ) {
    try {
      /** Convirtiendo el tipo de verificación a string */
      const vL = {
        0: 'Ninguna',
        1: 'Correo electrónico verificado',
        2: 'Registrado en discord más de 5 minutos',
        3: 'Miembro del servidor mas de 10 minutos',
        4: 'Número de teléfono verificado'
      };
      /** Creamos el embed para el comando */
      const embedServerInfo = new EmbedBuilder()
        .setTitle(`Información de este servidor`)
        .setDescription(
`**Nombre del servidor:** ${msg.guildName}
**ID del servidor:** ${msg.guildId}
**Propietario:** <@${msg.guildOwnerId}>
**Cantidad de miembros:** ${msg.guildMemberCount}
**Creado el:** <t:${Math.floor(msg.guild.createdTimestamp / 1000)}> (<t:${Math.floor(msg.guild.createdTimestamp / 1000)}:d>)
**Icon:** [Enlace al icon](${msg.guildIcon})
**Cantidad de roles:** ${msg.guild.roles.cache.size}
**Cantidad de emojis:** ${msg.guild.emojis.cache.size}
**Nivel de verificación:** ${vL[msg.guildVerficationLevel]}`
        )
      .setThumbnail(`${msg.guildIcon}`)
      .setColor(msg.randomColorPastel)
      .setFooter({ text: `${this.name}`, iconURL: client.user.avatarURL() })
      .setTimestamp();
      /** Respondiendo al comando */
      message.reply({
        embeds: [ embedServerInfo ]
      });
    } catch (err) {
      /** Enviando mensaje de alerta en caso de error */
      message.reply({
        content: `Ups! ha ocurrido un error al ejecutar el comando \`${this.name}\`.\n\n\`\`\`${err.stack}.\`\`\``
      });
      /** Registrando el error en consola */
      console.log(err);
    };
  }
};