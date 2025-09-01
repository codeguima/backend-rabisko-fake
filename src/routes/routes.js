import express from 'express';
import { getAllProfiles, getProfileById } from '../controllers/profileController.js';
import { register, login } from '../controllers/authController.js';
import { authenticate } from '../../middleware/authMiddleware.js';
import { getAllTattoos, getTattooById } from '../controllers/tattooController.js';
import { getGeneralNotifications, getFollowingNotifications } from '../controllers/notificationController.js';
import { getChatHistory, sendMessage, getActiveMessages, getArchivedMessages } from '../controllers/messageController.js'; // ✅ novo
import { getFavoritedPosts, addFavoritePost } from '../controllers/favoriteController.js';
// ...
const router = express.Router();

router.get('/profiles', authenticate, getAllProfiles);
router.get('/profiles/:id', authenticate, getProfileById);

router.post('/auth/register', register);
router.post('/auth/login', login);

router.get('/notifications/general', authenticate, getGeneralNotifications);
router.get('/notifications/following', authenticate, getFollowingNotifications);

router.get('/favorited/findAll', authenticate, getFavoritedPosts);
router.post('/favorited/create', authenticate, addFavoritePost);

router.get('/tattoos', authenticate, getAllTattoos);
router.get('/tattoos/:id', authenticate, getTattooById);


router.get('/messages/active', authenticate, getActiveMessages);
router.get('/messages/archived', authenticate, getArchivedMessages);
router.get('/messages/:user', authenticate, getChatHistory);  // ✅ novo
router.post('/messages/:user', authenticate, sendMessage);    // ✅ novo

export default router;
