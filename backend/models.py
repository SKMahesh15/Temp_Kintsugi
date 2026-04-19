from sqlalchemy import Column, Integer, String, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Job(Base):
    __tablename__ = "jobs"

    job_id = Column(Integer, primary_key=True, index = True)
    script = Column(String, nullable = False)
    target_url = Column(String, nullable = False)
    status = Column(String, default="queued")
    created_at = Column(DateTime, default=datetime.utcnow)

    # selectors = relationship("Selector", back_populates="job")
    # logs = relationship("HealLog", back_populates="job")
