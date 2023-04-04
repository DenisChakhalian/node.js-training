import chalk from "chalk"
import dedent from "dedent-js";

const printError = (err) => {
    console.log(chalk.bgRed(" Error ") + " " + err);
}

const printSuccess = (message) => {
    console.log(chalk.bgGreen(" Success ") + " " + message);
}

const printHelp = () => {
    console.log(
        dedent`
        ${chalk.bgMagentaBright.black(" Help ")}
        Without parameters - return weather
        -s [CITY] => for install city
        -t [API_KEY] => for saving token
        -h => return help
        `
    );
}

const printWeather = (res, icon) => {
    console.log(
        dedent`
        ${chalk.bgBlackBright(" WEATHER ")} Weather in ${res.name} 
        ${icon} ${res.weather[0].description}
        Temperature: ${res.main.temp}
        Feels like: ${res.main.feels_like}
        Humidity: ${res.main.humidity}%
        Wind speed: ${res.wind.speed}
        `
    );
}

export {printError, printSuccess, printHelp, printWeather};
