export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  flagged: boolean;
  createdAt: Date;
}

export type FilterType = 'all' | 'active' | 'completed' | 'today' | 'flagged';

export interface TodoState {
  todos: Todo[];
  filter: FilterType;
}