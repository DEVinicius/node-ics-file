import * as ics from "ics";
import { writeFileSync } from "fs"

interface IDuration {
    hours: number;
    minutes: number;
}

interface IGeoLocation {
    lat: number;
    lon: number;
}

interface IOrganizer {
    name: string;
    email: string;
}

//people invited
interface IAtendee extends IOrganizer {}

enum IcsFileStatus {
    CONFIRMED = "CONFIRMED",
    TENTATIVE = "TENTATIVE",
    CANCELLED = "CANCELLED"
}

interface IEvent {
    /**[year, month, day, hour, minute] */
    start: number[];
    duration: IDuration;
    title: string;
    description: string;
    location: string;
    url: string;
    geo: IGeoLocation;
    categories: string[];
    status: IcsFileStatus;
    organizer: IOrganizer;
    attendees: IAtendee[];
}

const event = {
    start: [2022, 2, 3,13,30],
    duration: {
        hours: 1,
        minutes: 0
    },
    attendees: [
        {
            email: "teste@mailinator.com",
            name: "Vinicius Pereira de Oliveira"
        }
    ],
    categories: [
        "teste",
        "arquivo ics"
    ],
    status: IcsFileStatus.CONFIRMED,
    description: "TESTE DE ENVIO DE ICS",
    geo: {
        lat: -23.5863,
        lon: -46.6831
    },
    location: "Prédio Comercial",
    organizer: {
        email: "teste2@mailinator.com",
        name: "Vinicius Pereira de Oliveira Organizer"
    },
    title: "Reunião teste",
    url: "https://meet.google.com/zfeg-abwo-zrf"
} as ics.EventAttributes;

console.log(event);
try {
    ics.createEvent(event, async(error, value) => {
        if (error) {
            console.log(error)
            return
        }
      
        console.log("VALUE", value)
        writeFileSync(`${__dirname}/event.ics`, value)
    })
} catch (error:any) {
    console.log(error);
}
