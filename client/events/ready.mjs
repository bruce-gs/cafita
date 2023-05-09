export default {
  name: 'ready',
  once: true,
  description: 'Se emite cuando el cliente está listo para trabajar.',
  execute({ user, guilds }) {
    /** Registro del evento de conexión exitosa */
    console.log(`${user.tag} online.`);
    console.log(`Servidores presente: ${guilds.cache.size}.`);
  }
};