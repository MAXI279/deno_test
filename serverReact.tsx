// @deno-types= "https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types= "https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { contentTypeFilter, createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

const app = createApp();
let colores: string[] = ['red', 'blue']

app.handle("/", async (req) => {
    await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "text/html; charset=UTF-8",
        }),
        body: ReactDOMServer.renderToString(
            <html style={{ background: 'black' }}>
                <head>
                    <meta charSet="utf-8" />
                    <title>Colores</title>
                </head>
                <body style={{ color: 'white' }}>
                    <h1 style={{ color:'blue' }}>Bienvenido</h1>
                    <form method="POST" action="/enviar">
                        <label style={{ color: 'white' }}>
                            Color:
                            <input type="text" name="color" />
                        </label>
                        <input type="submit" value="Enviar" />
                    </form>
                    <ul>
                        { colores.map(color => {
                            return( <li style={{ color:color }}>{ color }</li> )
                        })}
                    </ul>
                </body>
            </html>
        )
    })
})


app.post(
    "/enviar",
    contentTypeFilter("application/x-www-form-urlencoded"),
    async (req) => {
      const bodyForm = await req.formData();
      const color = bodyForm.value("color");
      if(color){
          colores.push(color)
      }
      await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "text/html; charset=UTF-8",
        }),
        body: ReactDOMServer.renderToString(
            <html style={{ background: 'black' }}>
                <head>
                    <meta charSet="utf-8" />
                    <title>Colores</title>
                </head>
                <body style={{ color: 'white' }}>
                    <h1 style={{ color:'blue' }}>Bienvenido</h1>
                    <form method="POST" action="/enviar">
                        <label style={{ color: 'white' }}>
                            Color:
                            <input type="text" name="color" />
                        </label>
                        <input type="submit" value="Enviar" />
                    </form>
                    <ul>
                        { colores.map(color => {
                            return( <li style={{ color:color }}>{ color }</li> )
                        })}
                    </ul>
                </body>
            </html>
        )
      })
    },
  );

// app.post("/enviar", async (req) => {
//     const body = req.text()
//     await req.respond({
//         status: 200,
//         headers: new Headers({
//           "content-type": "application/json",
//         }),
//         body: JSON.stringify(body),
//     });
// });

app.listen({ port: 8899 })