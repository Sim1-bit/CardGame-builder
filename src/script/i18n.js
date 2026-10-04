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
  components = ["deck"];
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