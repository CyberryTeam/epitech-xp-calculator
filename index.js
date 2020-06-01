const {login, getEvents, getEmail} = require('./src/epitech-calendar/epitech-calendar');
const dotenv = require('dotenv');
dotenv.config();

const participationXP = {
    Talk: 1,
    Workshop: 3,
    Hackaton: 6,
    Experience: 3
}

const organizationXPPresent = {
    Talk: 4,
    Workshop: 10,
    Hackaton: 15
}

const organizationXPAbsent = {
    Talk: 6,
    Workshop: 15,
    Hackaton: 20
}

const maxParticipation = {
    Talk: 15,
    Workshop: 10,
    Hackaton: 15,
    Experience: 10
}

const maxOrganization = {
    Talk: 6,
    Workshop: 3,
    Hackaton: 999
}

async function main(auth) {
    await login();
    const email = await getEmail();

    let start = new Date(process.env.START_DATE || "2020-01-01");
    let today = new Date();
    const activities = await getEvents(start.toISOString().split('T')[0], today.toISOString().split('T')[0], email);

    let xp = 0;
    let numberParticipation = {
        Talk: 0,
        Workshop: 0,
        Hackaton: 0,
        Experience: 0
    }
    let numberOrganization = {
        Talk: 0,
        Workshop: 0,
        Hackaton: 0
    }

    activities.forEach(el => {
        if (el.events[0].user_status != null) {
            if (numberParticipation[el.type_title] >= maxParticipation[el.type_title]) {
                console.log("[Participation] Over the limit for: ", el.type_title, "->", el.title);
                numberParticipation[el.type_title]++;
                return;
            }
            if (el.events[0].user_status === "absent") {
                xp -= participationXP[el.type_title];
            } else if (el.events[0].user_status === "present") {
                xp += participationXP[el.type_title];
                numberParticipation[el.type_title]++;
            }
            console.log("[Participation] ", el.title);
            console.log("Realized the: ", el.events[0].begin);
            console.log("Gives you: ", (el.events[0].user_status === "absent" ? "-" : "+"), participationXP[el.type_title], (el.events[0].user_status === "absent" ? "-> because you was absent" : ""));
        } else {
            if (numberOrganization[el.type_title] >= maxOrganization[el.type_title]) {
                console.log("[Organization] Over the limit for: ", el.type_title, "->", el.title);
                numberOrganization[el.type_title]++;
                return;
            }
            el.events[0].assistants.forEach(assistant => {
                if (assistant.login === email.login) {
                    if (assistant.manager_status === "absent") {
                        xp -= organizationXPAbsent[el.type_title];
                    } else if (assistant.manager_status === "present") {
                        xp += organizationXPPresent[el.type_title];
                        numberOrganization[el.type_title]++;
                    }
                    console.log("[Organization] ", el.title);
                    console.log("Realized the: ", el.events[0].begin);
                    console.log("Gives you: ", (assistant.manager_status === "absent" ? "-" + organizationXPAbsent[el.type_title] : "+" + organizationXPPresent[el.type_title]), (assistant.manager_status === "absent" ? "-> because you was absent" : ""));
                }
            });
        }
    });
    console.log("\nYou currently have validated: ", xp);
    console.log("\nCounting the surpluses, you participated in:\n");
    console.log(`HubTalks: ${numberParticipation["Talk"]}/${maxParticipation["Talk"]}`);
    console.log(`Workshops: ${numberParticipation["Workshop"]}/${maxParticipation["Workshop"]}`);
    console.log(`Hackatons: ${numberParticipation["Hackaton"]}/${maxParticipation["Hackaton"]}`);
    console.log(`Experiences: ${numberParticipation["Experience"]}/${maxParticipation["Experience"]}`);
    console.log("\nAnd counting the surpluses, you organized :\n");
    console.log(`HubTalks: ${numberOrganization["Talk"]}/${maxOrganization["Talk"]}`);
    console.log(`Workshops: ${numberOrganization["Workshop"]}/${maxOrganization["Workshop"]}`);
    console.log(`Hackatons: ${numberOrganization["Hackaton"]}/${maxOrganization["Hackaton"]}`);
}

main();
