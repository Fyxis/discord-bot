const fs = require("fs");

const dateFunction = () => {
    const date = new Date();
    let month = date.getMonth() + 1,
        seconds = date.getSeconds(),
        minutes = date.getMinutes();

    month < 10 ? (month = "0" + month) : "";
    seconds < 10 ? (seconds = "0" + seconds) : "";
    minutes < 10 ? (minutes = "0" + minutes) : "";

    const dateComplete = `${date.getFullYear()}-${month}-${date.getDate()}`,
        time = `${date.getHours()}:${minutes}:${seconds}`;

    const result = `${dateComplete} ${time}`;
    return result;
};

const readFileLogger = (command, serverName) => {
    const data = `${dateFunction()} - [${serverName}: /${command}] \n`;
    fs.appendFile("logger.log", data, (error) => {
        if (error) console.error(`Error write logger, `, error);
    });

    if (process.env.NODE_ENV != "production") {
        console.log(`${dateFunction()} - [${serverName}: /${command}]`);
    }
};

module.exports = readFileLogger;
