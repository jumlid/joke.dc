let url = 'https://v2.jokeapi.dev/joke/Any'
let prefix = "!joke"
let { Client, GatewayIntentBits, Message } = require('discord.js')
let c = new Client({
    intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping
    ]
})
let channelid = ""/enter your channel ID/
let channel;



c.once('ready', () => {
    console.log('                          ')
    console.log('          ready           ')
    console.log('                          ')

    setInterval(() => {
        checks(joke)

    }, 3600000);
   



})

function checks(joke) {
    channel = c.channels.cache.get(channelid)

    if (channel) {
        console.log('hi')


    }

    if (!channel) {
        console.log('error')
    }
    joke()
   

}

function joke() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.setup || data.delivery != "") {
                console.log(`${(data.setup.trim())}`)
              
                channel.send(data.setup.trim())
                setTimeout(() => {
                    channel.send('‎ ‎ ')
                    channel.send('‎ ‎ ')

                    console.log(`${data.delivery.trim()}`)
                    channel.send(data.delivery.trim())
                    channel.send('‎ ‎ ')
                }, 2000)
            }
            else {
                console.log('joke 404')
                joke()
            }

        })
        .catch(Error => {
            console.log('API error')
            checks(joke)
        })


    

}


c.on('messageCreate', m => {
    if (m.content.startsWith(prefix)) {
        console.log(`cammand by ${m.author.username} `)
        checks(joke)
    }

})




c.login('token')
