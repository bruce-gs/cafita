import { EmbedBuilder } from 'discord.js';

export default {
  name: 'roleinfo',
  category: 'Information',
  description: 'Obten información del rol mencionado.',
  example: '[prefix]roleinfo @cafita',
  usage: '[prefix]roleinfo <@role>, roleId ',
  aliases: [ 'rolinfo' ],
  cooldown: 'Sin cooldown',
  botPermissions: [ 'ViewChannel', 'SendMessages' ],
  userPermissions: [ 'SendMessages' ],
  hidden: false,
  ownerOnly: false,
  nsfw: false,
  execute ( message, args, client, msg ) {
    try {
      /** Definimos y obtenemos el rol mencionado */
      const role = msg.mentionRole;
      if (!role) return message.reply({
        content:`Porfavor intenta mencionar un rol válido.`
      });
      /** Definimos los permisos importantes */
      const importantPerms = [
        'Administrator',
        'KickMembers',
        'BanMembers',
        'ManageChannels',
        'ManageGuild',
        'ManageRoles',
        'ManageRoles',
        'SendMessages',
        'ManageMessages'
      ];
      /** Obtenemos los permisos del rol mencionado */
      const permisos = role.permissions
        .toArray()
        .filter(perm => importantPerms.includes(perm))
        .join(', ');
      /** Creamos el embed para el comando */
      const embedRoleInfo = new EmbedBuilder()
        .setColor(role.hexColor)
        .setTitle(`Información del rol **${role.name}**`)
        .setDescription(
`**ID:** ${role.id}
**Nombre:** ${role.name}
**Color:** ${role.hexColor}
**Posición:** ${role.position} 
**Miembros vistos:** ${role.members.size}
**Mencionable:** ${role.mentionable ? 'Sí' : 'No'}
**Permisos:** \`${permisos || 'Ninguno'}\``
        )
        .setFooter({ text: `${this.name}`, iconURL: client.user.avatarURL() })
        .setTimestamp();
      /** Respondiendo al comando */
      message.reply({
        embeds: [ embedRoleInfo ]
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