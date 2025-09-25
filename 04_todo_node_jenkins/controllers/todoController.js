let todos = [
  { id: 1, title: "Learn Express", completed: false },
  { id: 2, title: "Write Tests", completed: false },
];

export const getTodosData = () => todos;


// Get all todos
export const getTodos = (req, res) => {
  res.json(todos);
};

// Get single todo
export const getTodoById = (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
};

// Add new todo
export const addTodo = (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    title,
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
};

// Update todo
export const updateTodo = (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const todo = todos.find((t) => t.id === parseInt(id));
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
};

// Delete todo
export const deleteTodo = (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((t) => t.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: "Todo not found" });

  const deleted = todos.splice(index, 1);
  res.json(deleted[0]);
};
