const nodeFetch = require('node-fetch');
const fetch = require('fetch-cookie')(nodeFetch);
const dotenv = require('dotenv');
dotenv.config();

const AUTO_LOGIN = process.env.AUTO_LOGIN;
const LOGIN_URL = `${AUTO_LOGIN}/user/?format=json`;
const EPITECH_API_CALENDAR = (start, end) => `https://intra.epitech.eu/planning/load?format=json&start=${start}&end=${end}`;
const EPITECH_API_ACTIVITY = (year, module, instance, acti) => `https://intra.epitech.eu/module/${year}/${module}/${instance}/${acti}?format=json`;
const EPITECH_API_USER = `https://intra.epitech.eu/user/?format=json`;

async function login() {
    console.log("Connecting...");
    await fetch(LOGIN_URL);
}

function retrieveEvents(start, end) {
    console.log(`Getting the activities from ${start}...`);
    return fetch(EPITECH_API_CALENDAR(start, end)).then(res => res.json());
}

function retrieveActivity(year, module, instance, acti) {
    return fetch(EPITECH_API_ACTIVITY(year, module, instance, acti)).then(res => res.json());
}

async function getActivities(start, end) {
    const events = await retrieveEvents(start, end);
    let activities = [];

    if (events.error) return [];
    for (let el in events) {
        if (events[el].titlemodule === 'B0 - Hub') {
            const activity = await retrieveActivity(events[el].scolaryear, events[el].codemodule, events[el].codeinstance, events[el].codeacti);
            activities.push(activity);
        }
    }
    return activities;
}

async function getEvents(start, end, email) {
    const activities = await getActivities(start, end);
    const my_activities = activities.filter(el => {

        if (el.events[0].user_status === "present" || el.events[0].user_status === "absent") {
            return true;
        } else {
            if (el.events[0].assistants.filter(assistant => assistant.login === email.login).length)
                return true;
        }
        return false;
    })
    return my_activities;
}

function getEmail() {
    return fetch(EPITECH_API_USER).then(res => res.json());
}

module.exports = {
    login,
    getEvents,
    getEmail
}
