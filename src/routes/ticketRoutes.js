const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const auth = require('../middleware/authMiddleware');

// All routes are protected
router.use(auth);

// Analyze endpoint (for ML classification)
router.post('/analyze', ticketController.analyzeTicket);

// Ticket CRUD endpoints
router.post('/', ticketController.createTicket);
router.post('/create', ticketController.createTicket); // Alternative endpoint for frontend compatibility
router.get('/', ticketController.getTickets);
router.get('/user/:userId', ticketController.getUserTickets);
router.get('/:id', ticketController.getTicketById);
router.put('/:id', ticketController.updateTicket);
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;
