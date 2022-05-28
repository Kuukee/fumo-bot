const fs = require('fs');
const discord = require('discord.js');

const info = {
	name: 'help',
	version: '1.0',
	usage: 'help [command]',
	description: 'Lists all commands, or detailed info on a specific command.'
};

function exec(args, vars) {
	if(args[0]) {
		fs.access(`./cmds/${args[0]}.js`, fs.constants.F_OK, (err) => {
			if(!err && typeof require(`./${args[0]}`).info !== 'undefined') {
				var cmd = require(`./${args[0]}.js`).info;
				var embed = new discord.MessageEmbed()
				.setTitle('Help')
				.setColor('#00ff00')
				.setDescription(`Name: ${cmd.name}\nVersion: ${cmd.version}\nUsage: ${vars.config.prefix}${cmd.usage}\nDescription: ${cmd.description}`);
				try { 	vars.msg.reply({embeds:[embed]})	} catch(err) { console.log(err); }
			} else {
				var embed = new discord.MessageEmbed()
				.setTitle('Help')
				.setColor('#ff4933')
				.setDescription('Command not found, or has no info.');
				try { 	vars.msg.reply({embeds:[embed]})	} catch(err) { console.log(err); }
			}
		});
	} else {
		fs.readdir('./cmds/', (err, files) => {
			if(err) {console.error(err); return;}
			var cmds = [];
			for(i=0; i<files.length; i++) cmds[i] = files[i].slice(0, -3);
			var embed = new discord.MessageEmbed()
			.setTitle('Help')
			.setColor('#00ff00')
			.setDescription(`I love Fumo\nSupport server: https://discord.gg/bingus for bingus-bot or https://discord.gg/QBvgMMR4We For the fumo-bot fork\nDeveloper: <@!${vars.config.owner}> & <@!546768454427082785>\nSource code: https://github.com/Lolbird123/bingus-bot or https://github.com/Kuukee/Fumobot\n\n**Commands:** ${cmds.join(',  ')}`);
			try { 	vars.msg.reply({embeds:[embed]})	} catch(err) { console.log(err); }
		});
	}
}

exports.info = info;
exports.exec = exec;
