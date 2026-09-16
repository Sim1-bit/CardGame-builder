let contents = {};

const components = ["card","types","grades","colors","effects"];

async function loadData() {
  contents = {};
  for(const comp of components){
      const res = await fetch(path + `data/${comp}.json`);
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

loadData();