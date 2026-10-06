let deck = [];
let cards = [];


async function getAllCards() {
    const res = await fetch('http://localhost:4500/cards/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });

    const data = await res.json(); 

    return data;
}

async function buildCardList() {
    const data = await getAllCards();

    var html = '';

    for (var key in data) {
        const value = data[key];

        cards.push(value);

        var types_json = await fetch(path + `data/${folder}/types.json`);
        types_json = await types_json.json();
        var colors_json = await fetch(path + `data/${folder}/colors.json`);
        colors_json = await colors_json.json();
        var grades_json = await fetch(path + `data/${folder}/grades.json`);
        grades_json = await grades_json.json();

        json = {
            index : cards.length - 1,
            id : value.Id,
            name : value.Name,
            type : types_json.types[`${value.Type}`],
            color : colors_json.colors[`${value.color.dye}`],
            grade : grades_json.grades[value.Grade - 1],
        };

        pathAux = `../src/components/templates/${folder}/card.html`;

        const aux = await loadTemplate(pathAux, json);

        html = html + aux;
    }

    document.getElementById('cards-list').innerHTML = html;

    var effects_json = await fetch(path + `data/${folder}/effects.json`);
    effects_json = await effects_json.json();

    for(var i = 0; i < cards.length; i++){
        await buildEffectList(i, effects_json);
    }

    await loadData();
}

async function buildEffectList(index, effect_json) {
    var html = '';

    var statusEffects = [];

    for(var i = 0; i < cards[index].effects.length; i++){
        json = {
            index : index,
            effectId : i,
            choosenEffect : cards[index].effects[i].$type.toLowerCase(),
            value : cards[index].effects[i].value,
            target : effect_json.targets[cards[index].effects[i].target]
        };

        if(json.choosenEffect === "status")
            statusEffects.push(i);

        pathAux = `../src/components/templates/${folder}/effect.html`;

        const aux = await loadTemplate(pathAux, json);

        html = html + aux;
    }
    document.getElementById(`effects-list-${index}`).innerHTML = html;

    for(var i = 0; i < statusEffects.length; i++){
        await statusEffectBuilder(index, effect_json, statusEffects[i]);
    }
}

async function statusEffectBuilder(index, effect_json, effectId) {
    var effectStatusId = (effectId + 1) * (-1);

    json = {
        index : index,
        effectId : `${effectId}${effectStatusId}`,
        choosenEffect : cards[index].effects[effectId].status.effect.$type.toLowerCase(),
        value : cards[index].effects[effectId].status.effect.value,
        target : effect_json.targets[cards[index].effects[effectId].status.effect.target]
    };

    pathAux = `../src/components/templates/${folder}/effect.html`;

    const aux = await loadTemplate(pathAux, json);

    document.getElementById(`effect-${index}-${effectId}-special`).innerHTML = aux;
}

async function createDeck() {
    for(var i = 0; i < cards.length; i++){
        if(document.getElementById(`card-${i}-checkbox`).checked){
            deck.push(cards[i].Id);
        }
    }

    createJson(deck, document.getElementById("deck-owner").value.toLowerCase().replace(/\s+/g, '_'));

    deck = [];
}

buildCardList();