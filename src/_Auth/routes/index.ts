import express from 'express';
import AuthValidator from "../validator/validator";
import Middleware from '../../middleware/middleware';
import AuthController from '../controllers';

const router = express.Router();
const path = '/auth';

router.post(path + '/admin-token',
	Middleware.handleValidationError,
	AuthController.adminToken
);

router.post(path + '/default-token',
	Middleware.handleValidationError,
	AuthController.defaultToken
);

router.post(path + '/register',
	AuthValidator.checkRegisterUser(),
	Middleware.handleValidationError,
	AuthController.register
);

router.post(path + '/login',
	AuthValidator.checkLoginUser(),
	Middleware.handleValidationError,
	AuthController.login
);

router.post(path + '/logout',
	AuthValidator.checkLogoutUser(),
	Middleware.handleValidationError,
	AuthController.logout
);

router.post(path + '/introspect',
	AuthValidator.checkToken(),
	Middleware.handleValidationError,
	AuthController.introspect
);

router.post(path + '/refresh',
	AuthValidator.checkRefreshToken(),
	Middleware.handleValidationError,
	AuthController.refresh
);

router.put(path + '/update/:id',
	AuthValidator.checkID(),
	Middleware.handleValidationError,
	AuthController.update
);

router.put(path + '/forgot-password/:id',
	AuthValidator.checkID(),
	Middleware.handleValidationError,
	AuthController.forgot_password
);

router.put(path + '/reset-password/:id',
	AuthValidator.checkResetPassword(),
	Middleware.handleValidationError,
	AuthController.reset_password
);

router.delete(path + '/delete/:id',
	AuthValidator.checkID(),
	Middleware.handleValidationError,
	AuthController.delete
);

router.get(path + '/groups',
	Middleware.handleValidationError,
	AuthController.groups
);

router.get(path + '/users/group/:name',
	Middleware.handleValidationError,
	AuthController.getUsersByGroup
);

router.get(path + '/users',
	Middleware.handleValidationError,
	AuthController.users
);

router.get(path + '/user/username/:username',
	AuthValidator.checkGetUserByUsername(),
	Middleware.handleValidationError,
	AuthController.getUserByUsername
);

router.get(path + '/user/email/:email',
	AuthValidator.checkGetUserByEmail(),
	Middleware.handleValidationError,
	AuthController.getUserByEmail
);

router.get(path + '/checkIfUserExistsByUsername/:username',
	AuthValidator.checkGetUserByUsername(),
	Middleware.handleValidationError,
	AuthController.checkIfUserExistsByUsername
);

router.get(path + '/checkIfUserExistsByEmail/:email',
	AuthValidator.checkGetUserByEmail(),
	Middleware.handleValidationError,
	AuthController.checkIfUserExistsByEmail
);

router.get(path + '/sessions/:id',
	AuthValidator.checkID(),
	Middleware.handleValidationError,
	AuthController.sessions
);



export default router;
