const { color } = require('../config.json');
const websites = require('../websites.json');
const Discord = require('discord.js');

module.exports = {
  name: 'links',
  aliases: ['link'],
  description: 'Provides a collection of useful links for Shakes and Fidget.',
  args: false,
  execute(message, _args) {
    var embed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle('Useful Links');
      
    Object.keys(websites).forEach(category => {
      var links = '';
      Object.keys(websites[category]).forEach(i => {
        const obj = websites[category][i];
        links += `${obj.name}: ${obj.url}\n`;
      });
      embed.addField(category, links);
    });

    message.channel.send(embed);
  },
};
