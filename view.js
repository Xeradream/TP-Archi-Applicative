// Classe abstraite
class TaskRenderer {
  render(task) {
    throw new Error("Méthode 'render()' non implémentée !");
  }
}

class TravailRenderer extends TaskRenderer {
  render(task) {
    const li = document.createElement("li");
    li.className = "travail";
    li.textContent = `[Travail] ${task.text}`;
    return li;
  }
}

class MaisonRenderer extends TaskRenderer {
  render(task) {
    const li = document.createElement("li");
    li.className = "maison";
    li.textContent = `[Maison] ${task.text}`;
    return li;
  }
}

class DiversRenderer extends TaskRenderer {
  render(task) {
    const li = document.createElement("li");
    li.className = "divers";
    li.textContent = `[Divers] ${task.text}`;
    return li;
  }
}

class TaskView {
  constructor() {
    this.taskList = document.getElementById("task-list");
    this.taskFormContainer = document.getElementById("task-form");
    this.filterSelect = document.getElementById("category-filter");
  }

  renderForm(onSubmit) {
    const form = document.createElement("form");

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Nouvelle tâche...";
    input.required = true;

    const select = document.createElement("select");
    ["travail", "maison", "divers"].forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      select.appendChild(option);
    });

    const button = document.createElement("button");
    button.textContent = "Ajouter";

    form.appendChild(input);
    form.appendChild(select);
    form.appendChild(button);

    form.addEventListener("submit", e => {
      e.preventDefault();
      onSubmit(input.value.trim(), select.value);
      input.value = "";
    });

    this.taskFormContainer.appendChild(form);
  }

  renderTasks(tasks) {
    this.taskList.innerHTML = "";
    tasks.forEach(task => {
      const renderer = this.getRenderer(task.category);
      const li = renderer.render(task);
      this.taskList.appendChild(li);
    });
  }

  getRenderer(category) {
    switch (category) {
      case "travail": return new TravailRenderer();
      case "maison": return new MaisonRenderer();
      case "divers": return new DiversRenderer();
      default: throw new Error("Catégorie inconnue");
    }
  }

  bindFilterChange(onFilterChange) {
    this.filterSelect.addEventListener("change", e => {
      onFilterChange(e.target.value);
    });
  }
}

const view = new TaskView();
