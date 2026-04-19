from pydantic import BaseModel
from datetime import datetime
from typing import Any, Dict, Optional

# this is so that users can create jobs without needing ids
class JobCreate(BaseModel):
    script: str
    target_url: str

class JobResponse(BaseModel): # sent to fe
    job_id: int
    script: str
    target_url: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True # when i ask row info from db, return json response to fe

class SelectorBase(BaseModel):
#selector id is auto created by db
    job_id: int
    intent: str
    selector: str
    last_success_aom: Dict[str, Any] # aom is a dict(eg: {"role:button","name:login"})

class SelectorResponse(SelectorBase):
    selector_id: int
    updated_at: datetime

class HealLogBase(BaseModel):
    # no heal log id either
    job_id: int #link to job id
    intent: str
    old_selector: str
    new_selector: str
    broken_aom: Dict[str, Any]
    confidence: float

class HealLogResponse(HealLogBase):
    heal_id: int
    healed_at: datetime