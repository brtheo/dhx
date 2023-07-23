import index, { $Todo } from './index.html.ts';
import { completeTodo, deleteTodo, createTodo } from './todo.ts';
interface Routes {
  [routeName: string]: (req: Request) => Response | Promise<Response>
}
function routeMatching(req: Request, routes: Routes) {
  const {pathname} = new URL(req.url);
  const route = routes[pathname] ?? (() => new Response("Too bad"))
  return route(req)
}


Deno.serve((req: Request) => routeMatching(req, {
  '/': () => new Response(index, {
    headers: new Headers([["content-type","text/html"]])
  }),
  '/completed': (req: Request) => {
    const todoId = parseInt(req.headers.get('hx-trigger-name')!);
    completeTodo(todoId)
    return new Response('ok');
  },
  '/delete': (req: Request) => {
    const todoId = parseInt(req.headers.get('hx-trigger-name')!);
    deleteTodo(todoId);
    return new Response('ok');
  },
  '/create': async (req: Request) => {
    const form = await req.formData();
    const todoName = await form.get('todo-name') as string;
    const todo = createTodo(todoName);
    return new Response($Todo(todo));
  }
}));