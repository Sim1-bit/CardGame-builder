let contents = {};

var components;
var folder;
var page;

async function cardPage()
{
  components = ["card","types","grades","colors","effects"];
  folder = 'card-builder';
}

async function deckPage() {
  components = ["deck", "types", "grades", "colors", "effects"];
  folder = 'deck-builder';
}


async function loadData() {
  contents = {};
  for(const comp of components){
      const res = await fetch(path + `data/${folder}/${comp}.json`);
      const data = await res.json();

      contents[comp] = data;
  }

  writeContents();
}

function createJson(object, fileName)
{
  const json = JSON.stringify(object, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName + ".json";
  link.click();

  URL.revokeObjectURL(url);
}

function writeContents() {
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const path = element.dataset.i18n.split(".");

    const content = path.reduce((base, key) => {
      return (base && base[key] !== undefined) ? base[key] : undefined;
    }, contents);

    if(content !== undefined && typeof content === 'string')
      element.innerText = content;
  });
}

async function startPage(auxPage) {
  page = auxPage;
  switch(page){
    case "Card":
      cardPage();
      break;
    case "Deck":
      deckPage();
      break;
  }
  loadData();
}