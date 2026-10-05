let deck;
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

async function buildEffectList(index, json) {
    var html = '';

    // to fix: effects are not being displayed correctly, need to check the data structure and how it's being accessed

    for(var i = 0; i < cards[index].effects.length; i++){
        json = {
            index : index,
            effectId : i,
            choosenEffect : cards[index].effects[i].$type.toLowerCase(),
            value : cards[index].effects[i].value,
            target : json.targets[cards[index].effects[i].target]
        };

        pathAux = `../src/components/templates/${folder}/effect.html`;

        const aux = await loadTemplate(pathAux, json);

        html = html + aux;
    }
    document.getElementById(`effects-list-${index}`).innerHTML = html;
}

buildCardList();