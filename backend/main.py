from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/jobs/", response_model=schemas.JobResponse)
def create_job(job: schemas.JobCreate, db: Session = Depends(get_db)):

    # create a new job instance
    db_job = models.Job(
        script=job.script,
        target_url=job.target_url,
        status="queued"
    )

    # add to db
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job

@app.get("/jobs/{job_id}", response_model=schemas.JobResponse)
def get_job(job_id: int, db: Session = Depends(get_db)):
    db_job = db.query(models.Job).filter(models.Job.job_id == job_id).first()
    if db_job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return db_job

# check database.py for connection details
# cd backend
# ./venv/bin/python -m uvicorn main:app --reload
# http://127.0.0.1:8000/docs