async function loadAllComponents() {
  await loadComponent("card-form-spot", path + "components/forms/card.html");
  await loadComponent("colors-form-spot", path + "components/forms/colors.html");
  await loadComponent("types-form-spot", path + "components/forms/types.html");
  await loadComponent("grades-form-spot", path + "components/forms/grades.html");
  await loadComponent("effects-form-spot", path + "components/forms/effects.html");

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