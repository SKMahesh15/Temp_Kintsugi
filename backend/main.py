from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials= True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/jobs/", response_model=schemas.JobResponse, status_code=201)
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


#endpoint for returning a Selector instance (a row) which has the intent as requested by middleware
@app.get("/selectors/", response_model=schemas.SelectorResponse)
def get_intent(intent: str, db: Session = Depends(get_db)):
    selector = db.query(models.Selectors).filter(models.Selectors.intent == intent).first()

    if selector:
        return selector
    else:
        raise HTTPException(status_code=404, detail=f"script is running for the first time hence {intent} does not exists in the db")

@app.post("/selectors/", response_model=schemas.SelectorResponse, status_code=201)
def save_new_selector(selector: schemas.SelectorBase, db: Session = Depends(get_db)):
   
   #need two columns of the Selector table to uniquely indentify the row
    job_id = selector.job_id
    intent = selector.intent
    existing_selector = db.query(models.Selectors).filter(models.Selectors.job_id == job_id, models.Selectors.intent == intent).first()

    if existing_selector:
        #updating the already existing selector instance (basically the db row) so that it stores the lastest changes
        existing_selector.intent = selector.intent
        existing_selector.last_success_aom = selector.last_success_aom
        existing_selector.selector = selector.selector
        db.commit()
        db.refresh(existing_selector)
        return existing_selector
    else:
        #creating a new selector instance and saving the job_id, intent, selector, last_success_aom to the db (Selectors table)
        new_selector = models.Selectors(**selector.model_dump())
        db.add(new_selector)
        db.commit()
        db.refresh(new_selector)
        return new_selector

# check database.py for connection details
# cd backend
# ./venv/bin/python -m uvicorn main:app --reload
# http://127.0.0.1:8000/docs