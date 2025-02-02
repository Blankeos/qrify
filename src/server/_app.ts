import { Hono } from "hono";
import { csrf } from "hono/csrf";

const app = new Hono();

app.use(csrf());

/**
 * The base router. Include all the routes here from `./routes/*`
 */
export const appRouter = app;

export type AppRouter = typeof appRouter;
