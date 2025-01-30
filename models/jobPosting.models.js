const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,  
    },
    jobType: {
        type: [String], 
        enum: ["Full-time (On-Site)", "Part-time (On-Site)", "Full-time (Remote)", "Part-time (Remote)",], 
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    qualifications: {
        type: [String],
        required: true,
    },
}, { timestamps: true });

const Job = mongoose.model('Job', jobPostingSchema);

module.exports = Job;
