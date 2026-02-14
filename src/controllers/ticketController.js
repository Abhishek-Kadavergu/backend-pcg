const Ticket = require('../models/Ticket');

// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Private
exports.createTicket = async (req, res) => {
    const { title, description, category, priority, resolver_group } = req.body;

    try {
        const newTicket = new Ticket({
            user: req.user.id,
            title,
            description,
            category,
            priority,
            resolver_group
        });

        const ticket = await newTicket.save();
        res.json(ticket);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get all tickets for logged in user
// @route   GET /api/tickets
// @access  Private
exports.getTickets = async (req, res) => {
    try {
        // const tickets = await Ticket.find({ user: req.user.id }).sort({ created_at: -1 });
        const tickets = await Ticket.find().sort({ created_at: -1 });
        res.json(tickets);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get ticket by ID
// @route   GET /api/tickets/:id
// @access  Private
exports.getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({ msg: 'Ticket not found' });
        }

        // Make sure user owns ticket
        if (ticket.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        res.json(ticket);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Ticket not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
exports.updateTicket = async (req, res) => {
    const { title, description, category, priority, status, resolver_group } = req.body;

    // Build ticket object
    const ticketFields = {};
    if (title) ticketFields.title = title;
    if (description) ticketFields.description = description;
    if (category) ticketFields.category = category;
    if (priority) ticketFields.priority = priority;
    if (status) {
        ticketFields.status = status;
        if (status === 'closed') {
            ticketFields.resolved_at = Date.now();
        }
    }
    if (resolver_group) ticketFields.resolver_group = resolver_group;

    try {
        let ticket = await Ticket.findById(req.params.id);

        if (!ticket) return res.status(404).json({ msg: 'Ticket not found' });

        // Make sure user owns ticket
        if (ticket.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { $set: ticketFields },
            { new: true }
        );

        res.json(ticket);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
exports.deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) return res.status(404).json({ msg: 'Ticket not found' });

        // Make sure user owns ticket
        if (ticket.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Ticket.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Ticket removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
