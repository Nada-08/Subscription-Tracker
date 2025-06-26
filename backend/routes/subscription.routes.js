import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import isAdmin from '../middlewares/role.middleware.js';
import * as SubscriptionController from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

// Specific Routes
subscriptionRouter.get('/user/:id/filter', authorize, SubscriptionController.getFilteredUserSubscriptions);
subscriptionRouter.get('/upcoming-renewals', authorize, SubscriptionController.getUpcomingRenewals);


subscriptionRouter.get('/user/:id', authorize, SubscriptionController.getUserSubscription);

subscriptionRouter.put('/:id/cancel', authorize, SubscriptionController.cancelSubscription); 


// Admin-only
subscriptionRouter.get('/', authorize, isAdmin, SubscriptionController.getSubscriptions);

// Dynamic routes
subscriptionRouter.get('/:id', authorize, SubscriptionController.getSubscriptionDetails);

subscriptionRouter.post('/', authorize, SubscriptionController.createSubscription);

subscriptionRouter.put('/:id', authorize, SubscriptionController.updateSubscription);

subscriptionRouter.delete('/:id', authorize, SubscriptionController.deleteSubscription);


export default subscriptionRouter;
