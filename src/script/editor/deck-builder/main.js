let deck;
let cards = {};


async function getAllCards() {
    const res = await fetch('http://localhost:4500/cards/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });

    const data = await res.json(); 

    console.log(data);
}

getAllCards();