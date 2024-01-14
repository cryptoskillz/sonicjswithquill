import { onRequestGet as __api_post_js_onRequestGet } from "/Users/cryptoskillz/Documents/code/cryptoskillz/sonicjs/editor/functions/api/post.js"
import { onRequestPost as __api_post_js_onRequestPost } from "/Users/cryptoskillz/Documents/code/cryptoskillz/sonicjs/editor/functions/api/post.js"

export const routes = [
    {
      routePath: "/api/post",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_post_js_onRequestGet],
    },
  {
      routePath: "/api/post",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_post_js_onRequestPost],
    },
  ]