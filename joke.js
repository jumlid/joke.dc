let prefix = './'
let fetch = require('node-fetch')
let url = 'https://v2.jokeapi.dev/joke/Any'
let token= require('./user.json')

const { Client, GatewayIntentBits, Guild } = require('discord.js');
const { datacatalog } = require('googleapis/build/src/apis/datacatalog');
let client = new Client({
    intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
})
client.once('ready', () => {
    console.log('-------------')
    console.log('ready')
    console.log('-------------')
  
})

client.on('messageCreate', (message) => {
    if (message.content.startsWith(prefix)) {
        if (message.content != "") {
            console.log(message.content)
        }
        if (message.content.startsWith(prefix + 'play')) {
          


                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        message.channel.send(data.setup),
                            message.channel.sendTyping()
                        setTimeout(() => {
                            message.channel.send(data.delivery)
                        }, 3000)

                    }
                    )
            
        }
    }
    else {
        console.error(message.content)
    }
})
client.login(token[0].token)
