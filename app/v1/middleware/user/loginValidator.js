const joi = require('joi');
const response = require('../../../../utils/response');
const passwordComplexity = require('joi-password-complexity');

const {
  joiResponse
} = require('../../../../common/common');


class LoginValidator {
  async login(req, res, next) {
    try {
      let schema = joi.object({
        email: joi.string().email().required().label('email'),
        password: joi.string().required().label('password'),
      }).options({
        allowUnknown: true
      });

      let value = schema.validate(req.body);
      joiResponse(value, req, res, next);
    } catch (error) {
      console.log(`\nlogin validator error ->> `, error);
      return response.error(req, res, error, req.headers.language);
    }
  }

  async signup(req, res, next) {
    try {
      let schema = joi.object({
        name: joi.string().required().label('name'),
        user_name: joi.string().required().label('user name'),
        email: joi.string().email().required().label('email'),
        password: joi.string().min(6).required().label('password'),
      }).options({
        allowUnknown: true
      });

      let value = schema.validate(req.body);
      joiResponse(value, req, res, next);
    } catch (error) {
      console.log(`\nSignup validator error ->> `, error);
      return response.error(req, res, error, req.headers.language);
    }
  }

  async isAgreeAction(req, res, next) {
    try {
      let schema = joi.object({
          is_selected: joi.number().valid(0, 1)
        })
        .options({
          allowUnknown: true
        });

      let value = schema.validate(req.body);

      if (value.error) {
        let param = value.error.details[0].context.key;
        let type = value.error.details[0].type;
        let message = value.error.details[0].message;

        if ('label' in value.error.details[0].context) {
          param = value.error.details[0].context.label;
        }

        return response.error(
          res, {
            param,
            type,
            message
          },
          req.headers.language
        );
      } else next();
    } catch (error) {
      console.log(`verifiedAction validator error -> ${error}`)
      return response.error(res, error, req.headers.language);
    }
  }

  async changePassword(req, res, next) {
    try {
      let schema = joi.object({
        password: joi.string().required().label('password'),
        newPassword: joi.string().min(6).required().label('new password'),
      }).options({
        allowUnknown: true
      });

      let value = schema.validate(req.body);
      joiResponse(value, req, res, next);
    } catch (error) {
      console.log(`\nchangePassword validator error ->> `, error);
      return response.error(req, res, error, req.headers.language);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      let schema = joi.object({
        email: joi.string().email().required().label('email')
      }).options({
        allowUnknown: true
      });

      let value = schema.validate(req.body);
      joiResponse(value, req, res, next);
    } catch (error) {
      console.log(`\nforgotPassword validator error ->> `, error);
      return response.error(req, res, error, req.headers.language);
    }
  }

  async resetPassword(req, res, next) {
    try {
      let schema = joi.object({
        password: joi.string().min(6).required().label('new password'),
      }).options({
        allowUnknown: true
      });

      let value = schema.validate(req.body);
      joiResponse(value, req, res, next);
    } catch (error) {
      console.log(`\nresetPassword validator error ->> `, error);
      return response.error(req, res, error, req.headers.language);
    }
  }

  
  async changeUserName(req, res, next) {
    
    try {
      let schema = joi.object({
        user_name :joi.string().required().label('username')
      }).options({
        allowUnknown: true
      });

      let value = schema.validate(req.body);
      joiResponse(value, req, res, next);
    } catch (error) {
      console.log(`\nresetPassword validator error ->> `, error);
     
      return response.error(req, res, error, req.headers.language);
    }
  }

  async editProfile(req, res, next) {
    
    try {
      let schema = joi.object({
        profile_pic: joi.any().required().label('profile pic')
      }).options({
        allowUnknown: true
      });

      let value = schema.validate(req.body);
      joiResponse(value, req, res, next);
    } catch (error) {
      console.log(`\neditProfile Password validator error ->> `, error);
      return response.error(req, res, error, req.headers.language);
    }
  }

  async logout(req, res, next) {
    try {
      let schema = joi.object({
        device_token: joi.string().required().allow(null).allow("").label('device token')
      }).options({
        allowUnknown: true
      });

      let value = schema.validate(req.body);
      joiResponse(value, req, res, next);
    } catch (error) {
      console.log(`\nlogout validator error ->> `, error);
      return response.error(req, res, error, req.headers.language);
    }
  }

  async checkUser(req, res, next) {
    try {
      let schema = joi.object({
        user_name: joi.string().required().label('user_name')
      }).options({
        allowUnknown: true
      });

      let value = schema.validate(req.body);
      joiResponse(value, req, res, next);
    } catch (error) {
      console.log(`\ncheckUser validator error ->> `, error);
      return response.error(req, res, error, req.headers.language);
    }
  }


}

module.exports = new LoginValidator();