class TaskController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.renderForm(this.handleAddTask.bind(this));
    this.view.bindFilterChange(this.handleFilterChange.bind(this));

    this.currentFilter = "all";
    this.updateView();
  }

  handleAddTask(text, category) {
    this.model.addTask(text, category);
    this.updateView();
  }

  handleFilterChange(category) {
    this.currentFilter = category;
    this.updateView();
  }

  updateView() {
    const tasks = this.model.getTasks(this.currentFilter);
    this.view.renderTasks(tasks);
  }
}

const controller = new TaskController(model, view);
