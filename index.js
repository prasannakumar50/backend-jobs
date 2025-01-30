const express = require("express")
const app =express()


const {initializeDatabase} = require("./db/db.connect")
const Job = require("./models/jobPosting.models");

app.use(express.json())

initializeDatabase();

async function createJob(newJob){
     try{
        const job = new Job(newJob)
        const saveJob = await job.save()
        return saveJob
     }catch(error){
         throw error
     }
  
}

app.post("/jobs", async(req, res)=>{
    try{
        const savedJob = await createJob(req.body)
        res.status(201).json({message: 'Job added successfully.', job: savedJob})
        
    }catch(error){
        res.status(500).json({error: 'Failed to add job'})
    }
})

async function readByJobTitle(jobTitle){
    try{
        const job = await Job.findOne({title: jobTitle})
        return job

    }catch(error){
          throw error
    }
}


app.get("/jobs/:title", async(req, res)=>{
    try{
        const job = await readByJobTitle(req.params.title)
        if(job){
            res.json(job)
        }else{
            res.status(404).json({error: 'Job not found'})
        }
    }catch(error){
        res.status(500).json({error: "failed to fetch job"})
    }
})


async function readAllJobs(){
    try{
        const allJobs = await Job.find()
        return allJobs

    }catch(error){
          throw error
    }
}

app.get("/jobs", async(req, res)=>{
    try{
        const jobs = await readAllJobs()
        if(jobs.length!=0){
            res.json(jobs)
        }else{
            res.status(404).json({error: 'Job not found'})
        }
    }catch(error){
        res.status(500).json({error: "failed to fetch job"})
    }
}) 

async function readJobById(jobId) {
    try {
        const job = await Job.findById(jobId);
        return job;
    } catch (error) {
        throw error;
    }
}

app.get("/jobs/id/:jobId", async (req, res) => {
    try {
        const job = await readJobById(req.params.jobId);
        if (job) {
            res.json(job);
        } else {
            res.status(404).json({ error: "Job not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch job" });
    }
});


async function deleteJob(jobId){
    try{
        const deletedJob = await Job.findByIdAndDelete(jobId)
        return deletedJob

    }catch(error){
          throw error
    }
}

app.delete("/jobs/id/:jobId", async(req, res)=>{
    try{
      const deletedJob =  await deleteJob(req.params.jobId)
      if(deletedJob){
      res.status(200).json({message: 'Job deleted successfully'})
      }
    }catch(error){
        res.status(500).json({error: "failed to delete job"})
    }
})


const PORT = 3000;


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})



