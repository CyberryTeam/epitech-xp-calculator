const {login, getEvents} = require('./src/epitech-calendar/epitech-calendar');
const dotenv = require('dotenv');
dotenv.config();

const typeXP = {
    Talk: 1,
    Workshop: 3,
    Hackaton: 6,
    Experience: 3
}

const maxType = {
    Talk: 15,
    Workshop: 10,
    Hackaton: 15,
    Experience: 10
}

async function main(auth) {
    await login();

    let start = new Date(process.env.START_DATE || "2020-01-01")
    let today = new Date()
    const activities = await getEvents(start.toISOString().split('T')[0], today.toISOString().split('T')[0]);

    let xp = 0;
    let numberType = {
        Talk: 0,
        Workshop: 0,
        Hackaton: 0,
        Experience: 0
    }

    activities.forEach(el => {
        if (numberType[el.type_title] >= maxType[el.type_title]) {
            console.log("Over the limit for: ", el.type_title, "->", el.acti_title);
            numberType[el.type_title]++;
            return;
        }
        numberType[el.type_title]++;
        if (el.event_registered === "absent") {
            xp -= typeXP[el.type_title];
        } else {
            xp += typeXP[el.type_title]
        }
        console.log(el.acti_title);
        console.log("Realized the: ", el.start);
        console.log("Gives you: ", (el.event_registered === "absent" ? "-" : "+"),typeXP[el.type_title], (el.event_registered === "absent" ? "-> because you was absent" : ""));
    });
    console.log("\nYou currently have validated: ", xp);
    console.log("\nAnd you do in total, and counting the over the limit activities:");
    console.log(`HubTalks: ${numberType["Talk"]}/${maxType["Talk"]}`);
    console.log(`Workshops: ${numberType["Workshop"]}/${maxType["Workshop"]}`);
    console.log(`Hackatons: ${numberType["Hackaton"]}/${maxType["Hackaton"]}`);
    console.log(`Experiences: ${numberType["Experience"]}/${maxType["Experience"]}`);
}

main();
