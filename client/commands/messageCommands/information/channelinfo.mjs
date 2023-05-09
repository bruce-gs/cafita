import { EmbedBuilder } from 'discord.js';

export default {
  name: 'channelinfo',
  category: 'Information',
  description: 'Muestra información del canal mencionado.',
  example: '[prefix]channelinfo #general',
  usage: '[prefix]channelinfo <#channel>, <channelId>',
  aliases: [ 'chinfo', 'infocanal' ],
  cooldown: 'Sin cooldown',
  botPermissions: [ 'ViewChannel', 'SendMessages' ],
  userPermissions: [ 'SendMessages' ],
  hidden: false,
  ownerOnly: false,
  nsfw: false,
  execute ( message, args, client, msg ) {
    try {
      /** Convirtiendo el tipo de canal a string */
      const channelTypes = {
        0: 'Canal de Texto',
        1: 'Mensaje Directo',
        2: 'Canal de Voz',
        3: 'Mensaje Directo en Grupo',
        4: 'Categoría Organizacional',
        5: 'Anuncio de Servidor',
        10: 'Hilo de Anuncios',
        11: 'Hilo Público',
        12: 'Hilo Privado',
        13: 'Canal de voz para eventos con audiencia',
        14: 'Lista de servidores',
        15: 'Foro del servidor'
      };
      /** Creando el embedChannelInfo del canal mencionado */
      const channel = msg.mentionChannel;
      const embedChannelInfo = new EmbedBuilder()
        .setTitle(`Información de <#${channel.id}>`)
        .setDescription(
`**Id del canal:** ${channel.id}
**Nombre del canal:** ${channel.name}
**Tipo:** ${channelTypes[channel.type] || 'Desconocido'}
**Posición:** ${channel.position ?? 'No definido'}
**NSFW:** ${channel.nsfw ? 'Habilitado' : 'Deshabilitado'}
**Creado el:** <t:${Math.floor(channel.createdTimestamp / 1000)}> (<t:${Math.floor(channel.createdTimestamp / 1000)}:R>)`
        )
        .setThumbnail(`${msg.guildIcon}`)
        .setColor(msg.randomColorSoft)
        .setFooter({ text: `${this.name}`, iconURL: client.user.avatarURL() })
        .setTimestamp();
      /** Respondiendo al comando */
      message.reply({
        embeds: [ embedChannelInfo ]
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