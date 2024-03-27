

import { insert, insertBulk } from '../../../../config/connection.js';

class LoginService {
  addrecord(body) {
    return new Promise(async (resolve, reject) => {
      try {
        let date = new Date(),
          {
            fieldname,
            value,
            value2,
            type
          } = body,
          created_on = date,
          modified_date = date

        let data = {
          fieldname,
          value,
          value2,
          type
        };
        const user = await insertBulk('demo', body)
        return resolve({
          userDetail: {
           details: user
          }
        });
      } catch (error) {
        return reject(error);
      }
    });
  }
}

export default new LoginService();