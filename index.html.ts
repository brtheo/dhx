import { html } from "https://deno.land/x/html/mod.ts";
import type { Todo } from "./todo.ts";
import { todos } from "./todo.ts";

function classMap(input: string) {
  return {
  'completed': 'completed'
  }[input] ?? ''
}


export function $Todo(todo: Todo) {
  return html`
    <li id="row-${todo.id}">
      ${
        todo.isEditing 
          ? html`<input type="text" value="${todo.todoName}" >`
          : html`
            <span class=${classMap(todo.state)} id="todo-${todo.id}">${todo.todoName}</span>
            <button 
              name=${todo.id}
              hx-put="/completed"
              hx-swap="none"
              hx-target="this"
              _="on htmx:afterRequest toggle .completed on 
              #todo-${todo.id}"
            >👌</button>
            <button
              name=${todo.id}
              hx-put="/delete"
              hx-swap="none"
              _="on htmx:afterRequest remove 
              #row-${todo.id}"
            >❌</button>
          `
      }
    </li>
  `
}


export default html`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DHX</title>
    <script src="https://unpkg.com/htmx.org@1.9.3"></script>
    <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
      :root{
        zoom: 150%; 
        background: #242424;
        color: white;
        font-family: 'Open Sans'
      }
      .completed {
        text-decoration:line-through;
      }
    </style>
  </head>
  <body>
    <ul id="todolist">${todos.map(todo => $Todo(todo)).join('')}</ul>
    <form _="on htmx:afterRequest reset() me">
      <input type="text" name="todo-name">
      <button 
        type="submit" 
        hx-post="/create" 
        hx-include="[name='todo-name']" 
        hx-target="#todolist" 
        hx-swap="beforeend"  
      >Create</button>
    </form>
  </body>
  </html>
`
