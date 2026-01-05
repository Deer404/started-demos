import { Todo, FilterType, TodoState } from './types';

class TodoApp {
  private todos: Todo[] = [];
  private filter: FilterType = 'all';
  private todoInput: HTMLInputElement;
  private addButton: HTMLButtonElement;
  private todoList: HTMLDivElement;
  private filterButtons: NodeListOf<HTMLButtonElement>;
  private navItems: NodeListOf<HTMLButtonElement>;
  private todoCount: HTMLSpanElement;
  private clearCompletedButton: HTMLButtonElement;
  private emptyState: HTMLDivElement;

  constructor() {
    this.loadFromStorage();
    this.initializeElements();
    this.attachEventListeners();
    this.render();
  }

  private initializeElements(): void {
    this.todoInput = document.querySelector('.todo-input') as HTMLInputElement;
    this.addButton = document.querySelector('.add-button') as HTMLButtonElement;
    this.todoList = document.querySelector('.todo-list') as HTMLDivElement;
    this.filterButtons = document.querySelectorAll('.filter-button') as NodeListOf<HTMLButtonElement>;
    this.navItems = document.querySelectorAll('.nav-item') as NodeListOf<HTMLButtonElement>;
    this.todoCount = document.querySelector('.todo-count') as HTMLSpanElement;
    this.clearCompletedButton = document.querySelector('.clear-completed') as HTMLButtonElement;
    this.emptyState = document.querySelector('.empty-state') as HTMLDivElement;
  }

  private attachEventListeners(): void {
    this.addButton.addEventListener('click', () => this.addTodo());

    this.todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addTodo();
      }
    });

    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filterType = button.dataset.filter as FilterType;
        this.setFilter(filterType);
      });
    });

    this.navItems.forEach(button => {
      button.addEventListener('click', () => {
        const filterType = button.dataset.filter as FilterType;
        if (filterType) {
          this.setFilter(filterType);
          this.updateNavActiveState(filterType);
          this.updateListTitle(filterType);
        }
      });
    });

    this.clearCompletedButton.addEventListener('click', () => {
      this.clearCompleted();
    });
  }

  private addTodo(): void {
    const text = this.todoInput.value.trim();
    if (text === '') return;

    const newTodo: Todo = {
      id: this.generateId(),
      text,
      completed: false,
      createdAt: new Date()
    };

    this.todos.unshift(newTodo);
    this.todoInput.value = '';
    this.saveToStorage();
    this.render();
  }

  private toggleTodo(id: string): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveToStorage();
      this.render();
    }
  }

  private deleteTodo(id: string): void {
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveToStorage();
    this.render();
  }

  private setFilter(filter: FilterType): void {
    this.filter = filter;
    
    this.filterButtons.forEach(button => {
      if (button.dataset.filter === filter) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
    
    this.render();
  }

  private clearCompleted(): void {
    this.todos = this.todos.filter(t => !t.completed);
    this.saveToStorage();
    this.render();
  }

  private getFilteredTodos(): Todo[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    switch (this.filter) {
      case 'active':
        return this.todos.filter(t => !t.completed);
      case 'completed':
        return this.todos.filter(t => t.completed);
      case 'today':
        return this.todos.filter(t => {
          const todoDate = new Date(t.createdAt);
          return todoDate >= today && todoDate < tomorrow;
        });
      case 'flagged':
        return this.todos.filter(t => (t as any).flagged);
      default:
        return this.todos;
    }
  }

  private getActiveTodoCount(): number {
    return this.todos.filter(t => !t.completed).length;
  }

  private getCompletedTodoCount(): number {
    return this.todos.filter(t => t.completed).length;
  }

  private render(): void {
    const filteredTodos = this.getFilteredTodos();
    
    this.todoList.innerHTML = '';
    
    if (filteredTodos.length === 0) {
      this.emptyState.style.display = 'block';
      this.todoList.style.display = 'none';
    } else {
      this.emptyState.style.display = 'none';
      this.todoList.style.display = 'block';
      
      filteredTodos.forEach(todo => {
        const todoElement = this.createTodoElement(todo);
        this.todoList.appendChild(todoElement);
      });
    }
    
    const activeCount = this.getActiveTodoCount();
    const countText = activeCount === 1 ? '1 item' : `${activeCount} items`;
    this.todoCount.textContent = countText;
    
    const completedCount = this.getCompletedTodoCount();
    this.clearCompletedButton.style.display = completedCount > 0 ? 'block' : 'none';
  }

  private createTodoElement(todo: Todo): HTMLElement {
    const todoItem = document.createElement('div');
    todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    
    todoItem.innerHTML = `
      <div class="todo-checkbox">
        <input type="checkbox" id="todo-${todo.id}" class="checkbox-input" ${todo.completed ? 'checked' : ''}>
        <label for="todo-${todo.id}" class="checkbox-label"></label>
      </div>
      <p class="todo-text">${this.escapeHtml(todo.text)}</p>
      <div class="todo-actions">
        <button class="action-button" aria-label="Flag todo">
          <svg class="flag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
            <line x1="4" y1="22" x2="4" y2="15"></line>
          </svg>
        </button>
        <button class="action-button delete-button" aria-label="Delete todo">
          <svg class="delete-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18"></path>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
            <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
          </svg>
        </button>
      </div>
    `;
    
    const checkbox = todoItem.querySelector('.checkbox-input') as HTMLInputElement;
    const deleteButton = todoItem.querySelector('.delete-button') as HTMLButtonElement;
    
    checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
    deleteButton.addEventListener('click', () => this.deleteTodo(todo.id));
    
    return todoItem;
  }

  private updateNavActiveState(filter: FilterType): void {
    this.navItems.forEach(button => {
      if (button.dataset.filter === filter) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  private updateListTitle(filter: FilterType): void {
    const listTitle = document.querySelector('.list-title') as HTMLHeadingElement;
    if (listTitle) {
      switch (filter) {
        case 'all':
          listTitle.textContent = 'All Lists';
          break;
        case 'today':
          listTitle.textContent = 'Today';
          break;
        case 'flagged':
          listTitle.textContent = 'Flagged';
          break;
        case 'active':
          listTitle.textContent = 'Active';
          break;
        case 'completed':
          listTitle.textContent = 'Completed';
          break;
        default:
          listTitle.textContent = 'All Lists';
      }
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  private saveToStorage(): void {
    const state: TodoState = {
      todos: this.todos,
      filter: this.filter
    };
    localStorage.setItem('todoapp-state', JSON.stringify(state));
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem('todoapp-state');
    if (stored) {
      try {
        const state: TodoState = JSON.parse(stored);
        this.todos = state.todos.map(todo => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
        this.filter = state.filter || 'all';
      } catch (error) {
        console.error('Error loading todos from storage:', error);
        this.todos = [];
        this.filter = 'all';
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
});

export default TodoApp;