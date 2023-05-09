import express from 'express';

export function startServer() {
  const app = express();
  
  app.get('/', (_, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cafita</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet">
          <style>
            body {
              background-color: #F5DEB3;
              color: #8B4513;
              font-family: 'Poppins', sans-serif;
              text-align: center;
              margin: 0;
              background-size: cover;
            }
            h1 {
              font-size: 5rem;
              margin-top: 5rem;
              text-shadow: 2px 2px #000000;
            }
            p {
              font-size: 2rem;
              margin-top: 2rem;
            }
            button {
              background-color: #8B4513;
              color: #F5DEB3;
              font-size: 1.2rem;
              padding: 1rem 2rem;
              border: none;
              border-radius: 2rem;
              cursor: pointer;
              margin-top: 2rem;
              box-shadow: 2px 2px #000000;
            }
            button:hover {
              background-color: #F7DC6F;
              color: #8B4513;
            }
          </style>
        </head>
        <body>
          <h1>Cafita Online</h1>
          <p>¡Eventos y Comandos cargados!</p>
          <button>¡Haz clic aquí para tomar un café!</button>
        </body>
      </html>
    `);
  });
  app.listen(3000);
};