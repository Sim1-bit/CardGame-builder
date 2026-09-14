let effects = [];
let card;

async function createCard(){

    name = document.getElementById("card-name").value;
    description = document.getElementById("card-description").value;

    card = new Card(name, description, 0, 0, document.getElementById("dyes").value);

    for(let i = 0; i < effects.length; i++){
        await CreateEffect(i);
    } 
}

async function addEffectTemplate(){
    effect = 
    {
        type : document.getElementById("effects").value,
        index : effects.length
    };

    effects.push(effect);

    await populateEffectsList();

    await loadData();
}

async function populateEffectsList() {
    let html = "";

    for(let i = 0; i < effects.length; i++){
        json = 
        {
            choosenEffect : effects[i].type,
            index : i
        };

        pathAux = `../src/components/templates/${effects[i].type}-effect.html`;

        const aux = await loadTemplate(pathAux, json);
        html = html + aux;
    }
    document.getElementById("effects-templates-list").innerHTML = html;
}

async function CreateEffect(index){
    e = {
        $type : document.getElementsByName("effect-type-" + index)[0].value,
        value : document.getElementsByName("effect-value-" + index)[0].value,
        target : document.getElementsByName("effect-target-" + index)[0].value
    };

    card.addEffect(e);

    console.log(card);
}