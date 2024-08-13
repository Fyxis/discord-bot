const checkConnection = async (message, client) => {
    message.channel.send(`Your latency is ${client.ws.ping}ms`)
}

module.exports = checkConnection