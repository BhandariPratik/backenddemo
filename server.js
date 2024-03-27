
import express from 'express';
import cors from 'cors';
import http from 'http';
import { connectDB } from './config/connection.js';
import  routerConfig  from './app/v1/routes/user/index.js';
import { sendMail } from './config/mailer.js';

export const app = express();
let  server = http.createServer(app);
app.use(cors());
// routerConfig(app);

app.use(express.json()); // Parse JSON data from the request body
app.use(express.urlencoded({ extended: true }));

// app.use(logger('dev'));
routerConfig(app);

connectDB().then(async() => {
  await server.listen(4000, () => {
      console.log(`Server listening on the port ${4000} ${new Date()} --------`);
    });
 
  })
  .catch((error) => {
    console.log(`Main server configuration error >> ${error} \n-----`);
  });
export default app;
