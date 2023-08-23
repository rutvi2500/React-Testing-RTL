import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Todo from '../Todo';

const MockTodo = () => {
  return (
    <BrowserRouter>
      <Todo />
    </BrowserRouter>
  );
};

const addTask = (tasks) => {
  const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
  const buttonElement = screen.getByRole('button', { name: /Add/i });
  tasks.forEach((task) => {
    fireEvent.change(inputElement, { target: { value: task } });
    fireEvent.click(buttonElement);
  });
};

describe('Todo', () => {
  it('should render same text passed into title prop', async () => {
    render(<MockTodo />);
    addTask(['Go for shopping']);
    const divElement = screen.getByText(/Go for shopping/i);
    expect(divElement).toBeInTheDocument();
  });

  it('should render multiple items', async () => {
    render(<MockTodo />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    const buttonElement = screen.getByRole('button', { name: /Add/i });
    addTask(['Go for shopping', 'Read a book', 'Watch a movie']);
    const divElements = screen.getAllByTestId('task-container');
    expect(divElements.length).toBe(3);
  });

  it('task should not have completed class when initially rendered', async () => {
    render(<MockTodo />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    const buttonElement = screen.getByRole('button', { name: /Add/i });
    addTask(['Go for shopping']);
    const divElement = screen.getByText(/Go for shopping/i);
    expect(divElement).not.toHaveClass('todo-item-active');
  });

  it('task should have completed class when clicked', async () => {
    render(<MockTodo />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    const buttonElement = screen.getByRole('button', { name: /Add/i });
    addTask(['Go for shopping']);
    const divElement = screen.getByText(/Go for shopping/i);
    fireEvent.click(divElement);
    expect(divElement).toHaveClass('todo-item-active');
  });
});
