const nodeFetch = require('node-fetch');
const fetch = require('fetch-cookie')(nodeFetch);
const dotenv = require('dotenv');
dotenv.config();

const AUTO_LOGIN = process.env.AUTO_LOGIN;
const LOGIN_URL = `${AUTO_LOGIN}/user/?format=json`;
const EPITECH_API_CALENDAR = (start, end) => `https://intra.epitech.eu/planning/load?format=json&start=${start}&end=${end}`;

async function login() {
    console.log("Connecting...");
    await fetch(LOGIN_URL);
}

function retrieveEvents(start, end) {
    console.log(`Getting the activities from ${start}...`);
    return fetch(EPITECH_API_CALENDAR(start, end)).then(res => res.json());
}

async function getEvents(start, end) {
    const activities = await retrieveEvents(start, end);
    if (activities.error) return [];
    const my_activities = activities.filter(el => el.titlemodule === 'B0 - Hub' && (el.event_registered === "present" || el.event_registered === "absent"))
    return my_activities;
}

module.exports = {
    login,
    getEvents
}