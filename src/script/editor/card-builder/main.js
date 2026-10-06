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

    // TO REMOVE WHEN BACKEND IS READY
    return;

    const res = await fetch('http://localhost:4500/cards/create-card', {
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

    await loadData();
}

// TODO: Status effect is not working properly, need to implement it
// Same for creation effect and create card

async function createEffect(index){
    type = document.getElementsByName("effect-type-" + index)[0].value;
    let e = {};
    
    if(type !== "Status")
        e = {
            $type : type,
            value : Number(document.getElementsByName("effect-value-" + index)[0].value),
            target : Number(document.getElementsByName("effect-target-" + index)[0].value)
        };
    else
        e = {
            $type : type,
            target : Number(document.getElementsByName("effect-target-" + index)[0].value),
            status : {
                duration : Number(document.getElementsByName("effect-value-" + index)[0].value),
                effect : {
                    $type : document.getElementsByName("effect-type-" + Number(index * (-1) - 1))[0].value,
                    value : Number(document.getElementsByName("effect-value-" + Number(index * (-1) - 1))[0].value),
                    target : 0
                }
            }
        }

    card.addEffect(e);
}

async function updateEffect(index){

}