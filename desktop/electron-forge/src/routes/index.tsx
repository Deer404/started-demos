import { useEffect, useMemo, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import type { FilterType, Todo, TodoState } from '../types';

export const Route = createFileRoute('/')({
  component: TodoPage,
});

const STORAGE_KEY = 'todoapp-state';

const NAV_FILTERS: { key: FilterType; label: string; icon: JSX.Element }[] = [
  {
    key: 'all',
    label: 'All Lists',
    icon: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="9" y1="9" x2="15" y2="9"></line>
        <line x1="9" y1="15" x2="15" y2="15"></line>
      </svg>
    ),
  },
  {
    key: 'today',
    label: 'Today',
    icon: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
  },
  {
    key: 'flagged',
    label: 'Flagged',
    icon: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
        <line x1="4" y1="22" x2="4" y2="15"></line>
      </svg>
    ),
  },
];

const FILTER_CONTROLS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

const FILTER_TITLES: Record<FilterType, string> = {
  all: 'All Lists',
  today: 'Today',
  flagged: 'Flagged',
  active: 'Active',
  completed: 'Completed',
};

function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      const state: TodoState = JSON.parse(stored);
      setTodos(
        (state.todos || []).map((todo) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        })),
      );
      setFilter(state.filter || 'all');
    } catch (error) {
      console.error('Failed to load todos from storage', error);
    }
  }, []);

  useEffect(() => {
    const state: TodoState = {
      todos: todos.map((todo) => ({
        ...todo,
        createdAt: todo.createdAt.toISOString(),
      })),
      filter,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [todos, filter]);

  const filteredTodos = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      case 'today':
        return todos.filter((t) => {
          const created = new Date(t.createdAt);
          return created >= today && created < tomorrow;
        });
      case 'flagged':
        return todos.filter((t) => t.flagged);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = useMemo(() => todos.filter((t) => !t.completed).length, [todos]);
  const completedCount = useMemo(() => todos.filter((t) => t.completed).length, [todos]);

  const listTitle = FILTER_TITLES[filter] || 'All Lists';

  const addTodo = () => {
    const text = inputValue.trim();
    if (!text) return;

    const newTodo: Todo = {
      id: generateId(),
      text,
      completed: false,
      flagged: false,
      createdAt: new Date(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    setInputValue('');
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const toggleFlag = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, flagged: !todo.flagged } : todo)),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const countText = activeCount === 1 ? '1 item' : `${activeCount} items`;

  return (
    <div className="app-window">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="app-title">Reminders</h1>
        </div>

        <nav className="sidebar-nav">
          {NAV_FILTERS.map((item) => (
            <button
              key={item.key}
              className={`nav-item ${filter === item.key ? 'active' : ''}`}
              onClick={() => setFilter(item.key)}
              type="button"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="add-list-button" type="button">
            + Add List
          </button>
        </div>
      </aside>

      <main className="main-content">
        <div className="content-header">
          <div className="header-title">
            <h2 className="list-title">{listTitle}</h2>
            <span className="todo-count">{countText}</span>
          </div>

          <div className="header-actions">
            <button className="toolbar-button" aria-label="View options" type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
          </div>
        </div>

        <div className="content-body">
          <div className="input-section">
            <div className="input-wrapper">
              <input
                type="text"
                className="todo-input"
                placeholder="New Reminder..."
                autoComplete="off"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addTodo();
                  }
                }}
              />
              <button className="add-button" aria-label="Add reminder" type="button" onClick={addTodo}>
                <svg className="add-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>

          <div className="filter-controls">
            {FILTER_CONTROLS.map((item) => (
              <button
                key={item.key}
                className={`filter-button ${filter === item.key ? 'active' : ''}`}
                type="button"
                onClick={() => setFilter(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
              </svg>
              <p className="empty-text">No reminders</p>
              <p className="empty-subtext">Create your first reminder to get started</p>
            </div>
          ) : (
            <div className="todo-list">
              {filteredTodos.map((todo) => (
                <div className={`todo-item ${todo.completed ? 'completed' : ''}`} key={todo.id}>
                  <div className="todo-checkbox">
                    <input
                      type="checkbox"
                      id={`todo-${todo.id}`}
                      className="checkbox-input"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                    />
                    <label htmlFor={`todo-${todo.id}`} className="checkbox-label"></label>
                  </div>
                  <p className="todo-text">{todo.text}</p>
                  <div className="todo-actions">
                    <button
                      className={`action-button ${todo.flagged ? 'flagged' : ''}`}
                      aria-label="Flag todo"
                      type="button"
                      onClick={() => toggleFlag(todo.id)}
                    >
                      <svg className="flag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                        <line x1="4" y1="22" x2="4" y2="15"></line>
                      </svg>
                    </button>
                    <button
                      className="action-button delete-button"
                      aria-label="Delete todo"
                      type="button"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      <svg className="delete-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
                        <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="content-footer">
          {completedCount > 0 && (
            <button className="clear-completed" type="button" onClick={clearCompleted}>
              Clear Completed
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
