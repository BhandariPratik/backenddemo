
import loginController from '../../controllers/user/loginController.js';
const routerConfig = (app) => {

app.post('/api/v1/user/addrecord', (req, res) => {
  console.log('Received a POST request:', req);
  loginController.addrecord(req,req)
  res.status(200).json({ message: 'POST request successful' });
});

};

export default routerConfig;