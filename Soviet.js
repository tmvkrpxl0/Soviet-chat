const Discord = require('discord.js')
require('core-js/stable'); //<TypeError: Object.entries(...).filter(...).flatMap is not a function> 해결
const client = new Discord.Client();

const fs = require('fs');
const { waitForDebugger } = require('inspector');
const readline = require('readline');

var Users = []

async function processLineByLine(){
    fileStream = fs.createReadStream("./users.txt")
    rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })

    for await(var line of rl){
        Users.push(line)
    }
    fileStream.close();
}

client.on('ready', () =>{
    console.log("советский")
    processLineByLine()
})

async function hookSend(message){
    const webhooks = await message.channel.fetchWebhooks()
        .catch(error => console.log(error))
    if(webhooks){
        const webhook = webhooks.first()
        if(!webhook){
            message.channel.createWebhook("tmvkrpxl0 webHook", {
                avatar: "https://cdn.discordapp.com/avatars/348349452559319040/f5417a6011763501e6d062da24e113a6.png",
            }).then((webhook) => message.reply("webhook  생성됨")).catch(console.error)
        }else{
            message.delete();
            text = message.content;
            text = text.replace(/r/g, "Я").replace(/3/g, "Э") //텍스트 대체
                .replace(/y/g, "Ч").replace(/w/g, "Ш").replace(/U/g, "Ц")
                .replace(/n/g, "Й").replace(/N/g, "И").replace(/R/g, "Я")
                .replace(/b/g, "Ъ").replace(/W/g, "Ш").replace(/E/g, "Ё")
		.replace(/a/g, "Д").replace(/c/g, "Ҫ").replace(/e/g, "Ԑ")
		.replace(/f/g, "Ӻ").replace(/F/g, "Ӻ").replace(/x/g, "Ж")
		.replace(/X/g, "Ж").replace(/o/g, "Ф").replace(/O/g, "Ф")
		.replace(/h/g, "Ӊ").replace(/H/g, "Ӊ").replace(/k/, "Ҡ")
		.replace(/K/g, "Ҝ").replace(/i/g, "Ї").replace(/I/g, "Ї")
		.replace(/A/g, "Д")
            await webhook.send(text, {
                username: message.author.username,
                avatarURL: message.author.displayAvatarURL({
                    format: "png",
                    dynamic: true,
                    size: 128,
                }),
            })
        }
    }
}
client.on('message', msg => {
    if(msg.author.bot)return
    if(msg.content.startsWith("http") || msg.content.startsWith("<"))return
    if(msg.content == "*start"){

    }
    hookSend(msg)
})

function saveUser(){
    console.log("saving")
    w = fs.createWriteStream("./users.txt",{
       flags: "w+",
       encoding: 'utf8' 
    })
    Users.forEach(function(value){
        console.log(value)
        w.write(value + "\n")
    })
    w.write("as")
    w.end()
    w.close()
    console.log("ended")
    process.exit(0)
}

//process.on('exit', saveUser)
//process.on('SIGTERM', saveUser)
//process.on("SIGINT", saveUser)

client.login("")
