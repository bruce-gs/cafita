import { EmbedBuilder } from 'discord.js';

export default {
  name: 'userinfo',
  category: 'Information',
  description: 'Obten información del usuario mencionado o del autor.',
  example: '[prefix]userinfo @eevee',
  usage: '[prefix]userinfo <@user>, <userId>',
  aliases: '',
  cooldown: 'Sin cooldown',
  botPermissions: [ 'ViewChannel', 'SendMessages' ],
  userPermissions: [ 'SendMessages' ],
  hidden: false,
  ownerOnly: false,
  nsfw: false,
  execute ( message, args, client, msg ) {
    try {
      /** Definimos y obtenemos los atributos del usuario */
      const user = msg.mentionUser;
      const member = message.guild.members.cache.get(user.id);
      const roles = member?.roles.cache.filter(role => role.name !== '@everyone').map(role => role.toString()).join(' | ') || 'Ninguno';
      const nickname = member?.nickname || 'Ninguno';
      const isBot = user.bot ? 'Sí' : 'No';
      const created = `<t:${Math.floor(user.createdAt / 1000)}> (<t:${Math.floor(user.createdAt / 1000)}:R>)`;
      const joined = member ? `<t:${Math.floor(member.joinedAt / 1000)}:f> (<t:${Math.floor(member.joinedAt / 1000)}:R>)` : 'Fuera del servidor';
      /** Creamos el embedUserInfo */
      const embedUserInfo = new EmbedBuilder()
        .setColor(msg.randomColorPastel)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setTitle(`Información de **${user.tag}**`)
        .setDescription(
`**ID:** ${user.id}
**Nombre:** ${user.username}
**Discriminador:** ${user.discriminator}
**Cuenta creada:** ${created}${member ?
`\n**Fecha de ingreso al servidor:** ${joined}
**Roles:** ${roles}
**Apodo:** ${nickname}` : ''}
**Bot:** ${isBot}`
        )
        .setFooter({ text: `${this.name}`, iconURL: client.user.avatarURL() })
        .setTimestamp();
      /** Respondiendo al comando */
      message.reply({
        embeds: [ embedUserInfo ]
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