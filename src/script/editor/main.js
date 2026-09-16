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

    console.log(card);
    createJson();
}

async function addEffectTemplate(){
    type = document.getElementById("effects-select").value;

    effect = 
    {
        type : document.getElementById("effects-select").value,
        index : effects.length
    };

    effects.push(effect);

    await populateEffectsList();

    await loadData();
}

async function addEffectTemplateToStatusEffect(index){
    console.log("Adding effect to status effect", index);
}
  
async function populateEffectsList() {
    let html = "";

    for(let i = 0; i < effects.length; i++){
        json = 
        {
            choosenEffect : effects[i].type,
            index : i
        };

        pathAux = `../src/components/templates/effects/${effects[i].type}-effect.html`;

        const aux = await loadTemplate(pathAux, json);
        html = html + aux;
    }
    document.getElementById("effects-templates-list").innerHTML = html;
}

async function createEffect(index){
    e = {
        $type : document.getElementsByName("effect-type-" + index)[0].value,
        value : Number(document.getElementsByName("effect-value-" + index)[0].value),
        target : Number(document.getElementsByName("effect-target-" + index)[0].value)
    };

    card.addEffect(e);
}

async function createJson()
{
  const json = JSON.stringify(card, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = card.Id + ".json";
  link.click();

  URL.revokeObjectURL(url);
}

async function updateEffect(index){

}