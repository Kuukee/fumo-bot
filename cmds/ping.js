const discord = require('discord.js');

const info = {
	name: 'ping',
	version: '1.0',
	usage: 'ping',
	description: 'Responds with the bot\`s websocket ping.'
};

function exec(args, vars) {
	var embed = new discord.MessageEmbed()
	.setTitle('Pong!')
	.setColor('#33ff36')
	.setDescription(`Websocket ping: **${vars.client.ws.ping}ms**`);
	try { 
		vars.msg.reply({embeds:[embed]})
		.then(msg => {
			setTimeout(() => msg.delete(), 3000)
		});
	} catch(err) { console.log(err); }
}

exports.info = info;
exports.exec = exec;
