const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    ticket_id: {
        type: String,
        required: true,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString() // Simple auto-generation
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        default: 'Low'
    },
    status: {
        type: String,
        enum: ['active', 'pending', 'closed'],
        default: 'active'
    },
    resolver_group: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    resolved_at: {
        type: Date
    }
});

module.exports = mongoose.model('Ticket', TicketSchema);
