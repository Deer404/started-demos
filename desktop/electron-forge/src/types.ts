export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  flagged: boolean;
  createdAt: Date;
}

export type FilterType = 'all' | 'active' | 'completed' | 'today' | 'flagged';

export interface PersistedTodo extends Omit<Todo, 'createdAt'> {
  createdAt: string;
}

export interface TodoState {
  todos: PersistedTodo[];
  filter: FilterType;
}
