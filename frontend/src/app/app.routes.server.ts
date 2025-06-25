// app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '',          renderMode: RenderMode.Prerender },  // 👈 root path
  { path: 'courriers', renderMode: RenderMode.Prerender },
  { path: '**',        renderMode: RenderMode.Prerender }
];
