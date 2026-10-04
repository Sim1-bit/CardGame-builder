async function loadAllComponents() {
  switch(page){
    case "Card":
      await loadAllCardPageComponents();
      break;
    case "Deck":
      await loadAllDeckPageComponents();
      break;
  }

  await writeContents();
}

async function loadAllCardPageComponents() {
  await loadComponent("card-form-spot", path + "components/forms/" + folder + "/card.html");
  await loadComponent("colors-form-spot", path + "components/forms/" + folder + "/colors.html");
  await loadComponent("types-form-spot", path + "components/forms/" + folder + "/types.html");
  await loadComponent("grades-form-spot", path + "components/forms/" + folder + "/grades.html");
  await loadComponent("effects-form-spot", path + "components/forms/" + folder + "/effects.html");
}

async function loadAllDeckPageComponents() {
  await loadComponent("deck-form-spot", path + "components/forms/" + folder + "/deck.html");
}

async function loadComponent(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

async function loadTemplate(file, data) {
    const res = await fetch(file);

    let html = await res.text();

    for (const key in data) {
        html = html.replaceAll(`{{${key}}}`, data[key]);
    }

    return html;
}

loadAllComponents();