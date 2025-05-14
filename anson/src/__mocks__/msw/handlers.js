import { http, HttpResponse } from "msw";

export const handlers = [
  // { params } comes from resolver argument
  http.get(
    "https://jsonplaceholder.typicode.com/users/*",
    async ({ params }) => {
      // await delay(500);
      return HttpResponse.json({
        id: params.id,
        name: "mina",
        username: "mineapolis",
        email: "mina@mina.com",
        phone: "234567890098765",
      });
    }
  ),
];
