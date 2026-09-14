async function loadAllComponents() {
  await loadComponent("card-form-spot", path + "components/forms/card.html");

  await writeContents();
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