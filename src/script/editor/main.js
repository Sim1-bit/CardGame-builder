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
    type = document.getElementById("effects-select").value;

    if(type == "")
        return;
    
    effects[index] =
    {
        type : "Status",//-----------
        index : effects.length,
        effect : document.getElementById("effects-select-" + index).value
    };

    populateEffectStatus();
    await loadData();
    document.getElementById("effect-"+ Number(index*(-1)-1) + "-target").innerHTML = ``;
}
  
async function populateEffectsList() {
    let html = "";

    for(let i = 0; i < effects.length; i++){
        json = 
        {
            choosenEffect : effects[i].type,
            index : i
        };

        pathAux = `../src/components/templates/effects/${effects[i].type.toLowerCase()}-effect.html`;

        const aux = await loadTemplate(pathAux, json);

        html = html + aux;
    }
    document.getElementById("effects-templates-list").innerHTML = html;
}

async function populateEffectStatus() {
    let html = "";

    status_list = [];

    for(let i = 0; i < effects.length; i++){
        if(effects[i].type === "Status")
            status_list.push(i);
    }
    if(status_list.length === 0)
        return;

    for(let i = 0; i < status_list.length; i++){
        select = document.getElementById("effects-select-" + status_list[i]);
        if(select.value === "")
            continue;

        json = 
        {
            choosenEffect : select.value, //----
            index : Number(status_list[i]*(-1)-1)
        };
        const aux1 = await loadTemplate("../src/components/templates/effects/"+ select.value +"-effect.html", json);

        document.getElementById("effect-template-" + status_list[i]).innerHTML = aux1;
    }
}

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