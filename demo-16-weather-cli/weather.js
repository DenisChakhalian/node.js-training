#!/usr/bin/env node
import {getArgs} from "./helpers/args.js"
import {printHelp, printSuccess, printError, printWeather} from "./services/log.service.js";
import {saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getWeather, getIcon} from "./services/api.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError("Not transferred token!")
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess("Token saved!");
    } catch (e) {
        printError(e.message);
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError("Not transferred city!")
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess("City saved!");
    } catch (e) {
        printError(e.message);
    }
}

const getForCast = async () => {
    try {
        const weather = await getWeather();
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (e) {
        if (e?.response?.status === 404) {
            printError("This city is not exist!")
        } else if (e?.response?.status === 401) {
            printError("Invalid token!")
        } else {
            printError(e.message);
        }

    }

}

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    }
    if (args.s) {
        return saveCity(args.s)
    }
    if (args.t) {
        return saveToken(args.t)
    }
    return getForCast();
};

initCLI();