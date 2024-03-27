import loginService from '../../services/user/loginService.js';
import { sendMail } from '../../../../config/mailer.js';

class LoginController {
  async addrecord(req, res) {
    try {
      let data = await loginService.addrecord(req.body);
      // response.success(res, 'USER_REGISTRATION_SUCCESS', req.headers.language, data, statusCode.success);
      console.log('data',data)
      sendMail();
    } catch (error) {
      console.log('signUp controller catch error ->>', error);
    }
  }
}

export default new LoginController();
