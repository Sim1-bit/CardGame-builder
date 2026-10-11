let effects = [];
let card;

async function createCard(){

    name = document.getElementById("card-name").value;
    description = document.getElementById("card-description").value;
    dye = Number(document.getElementById("dyes").value);
    type = Number(document.getElementById("types").value);
    grade = Number(document.getElementById("grades").value);

    card = new Card(name, description, type, grade, dye);

    for(let i = 0; i < effects.length; i++){
        await createEffect(i);
    }

    createJson(card, card.Id);

    const res = await fetch(`${CONFIG.API_URL}/cards/create-card`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(card)
    });
}

async function createEffectTemplate(){

    const res = await fetch(path + `data/${folder}/effects.json`);
    const effects_json = await res.json();

    const effect_selected = document.getElementById("effects-select").value;

    const effect_data = {
        index : effects.length,
        choosenEffect : effect_selected,
        min : effects_json.effects[effect_selected].min,
        max : effects_json.effects[effect_selected].max
    };

    effects.push({
        $type : effect_selected,
        value : 1,
        target : 0
    });

    const pathAux = `../src/components/templates/${folder}/effect.html`;
    const aux = await loadTemplate(pathAux, effect_data);

    const html = document.getElementById(`effects-templates-list`).innerHTML + aux;

    document.getElementById(`effects-templates-list`).innerHTML = html;

    if(effect_selected === "status"){
        await createStatusEffectSelectTemplate(effects.length - 1, effects_json);
    }

    await loadData();
}

async function createStatusEffectSelectTemplate(index){

    effects[effects.length - 1] = {
        $type : effects[effects.length - 1].$type,
        target : effects[effects.length - 1].target,
        value : effects[effects.length - 1].value,
        status : {
            duration : 1,
            effect : {}
        }
    };

    var effectStatusId = (index + 1) * (-1);

    const effect_data = {
        index : index,
        effectId : `${effectStatusId}`
    };

    const pathAux = `../src/components/templates/${folder}/status.html`;
    const aux = await loadTemplate(pathAux, effect_data);

    document.getElementById(`effect-${index}-special`).innerHTML = aux;
}

async function createStatusEffectTemplate(index, effectStatusId){

    var effect_selected = document.getElementById("effects-select-" + index).value;

    const res = await fetch(path + `data/${folder}/effects.json`);
    const effects_json = await res.json();

    json = {
        index : `${index}-${effectStatusId}`,
        choosenEffect : effect_selected,
        min : effects_json.effects[effect_selected].min,
        max : effects_json.effects[effect_selected].max
    };

    pathAux = `../src/components/templates/${folder}/effect.html`;

    const aux = await loadTemplate(pathAux, json);

    document.getElementById(`effect-${index}-${effectStatusId}-spot`).innerHTML = aux;
    document.getElementById(`effect-${index}-${effectStatusId}-target`).innerHTML = "";

    await loadData();
}

// TODO: Status effect is not working properly, need to implement it
// Same for creation effect and create card

async function createEffect(index){
    type = document.getElementById(`effect-type-${index}`).value;
    let e = {};
    
    if(type !== "status")
    {
        e = {
            $type : type,
            value : Number(document.getElementById(`effect-value-${index}`).value),
            target : Number(document.getElementById(`effect-target-${index}`).value)
        };
    }
    else
    {
        e = {
            $type : type,
            target : Number(document.getElementById(`effect-target-${index}`).value),
            status : {
                duration : Number(document.getElementById(`effect-value-${index}`).value),
                effect : {
                    $type : document.getElementById(`effect-type-${index}-${index * (-1) - 1}`).value,
                    value : Number(document.getElementById(`effect-value-${index}-${index * (-1) - 1}`).value),
                    target : 0
                }
            }
        }
    }

    card.addEffect(e);
}

async function updateEffect(index){

}