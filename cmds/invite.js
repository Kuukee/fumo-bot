const discord = require('discord.js');

const info = {
	name: 'invite',
	version: '1.0',
	usage: 'invite',
	description: 'Invite me to your server!'
};

function exec(args, vars) {
	var embed = new discord.MessageEmbed()
	.setTitle('Invite')
	.setColor('#ffcff0')
	.setDescription(vars.config.invite);
	try { 	vars.msg.reply({embeds:[embed]})	} catch(err) { console.log(err); }
}

exports.info = info;
exports.exec = exec;
