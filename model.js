class Task {
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }
}

class AdvancedTask extends Task {
  constructor(id, text, category) {
    super(id, text);
    this.category = category;
  }
}

class TaskModelSingleton {
  constructor() {
    if (!TaskModelSingleton.instance) {
      this.tasks = [];
      TaskModelSingleton.instance = this;
    }
    return TaskModelSingleton.instance;
  }

  addTask(text, category) {
    const task = new AdvancedTask(Date.now(), text, category);
    this.tasks.push(task);
  }

  getTasks(categoryFilter = "all") {
    if (categoryFilter === "all") {
      return this.tasks;
    }
    return this.tasks.filter(task => task.category === categoryFilter);
  }
}

const model = new TaskModelSingleton();
Object.freeze(model); // empêche la modification
