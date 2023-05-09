export class Options {
  constructor() {
    this.intents = 3276799;
    this.presence = {
      status: 'idle',
      activities: [{ name: '/invite', type: 0 }]
    };
    this.allowedMentions = {
      repliedUser: false,
      parse: [ 'roles', 'users' ]
    };
  };
};