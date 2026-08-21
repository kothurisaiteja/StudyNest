from pydantic import BaseModel
from datetime import date,time
class NoteCreate(BaseModel):
    title: str
    content: str

class NoteUpdate(BaseModel):
    title:str
    content:str

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: str
    password: str

class AssignmentCreate(BaseModel):
    title: str
    subject: str
    due_date: date

class AssignmentResponse(BaseModel):
    id: int
    title: str
    subject: str
    due_date: date
    status: str

    class Config:
        from_attributes = True

class AssignmentUpdate(BaseModel):
    title: str
    subject: str
    due_date: date
    status: str

class DashboardResponse(BaseModel):
    total_notes: int
    total_assignments: int
    pending_assignments: int
    completed_assignments: int

class TimetableCreate(BaseModel):
    subject: str
    day: str
    start_time: time
    end_time: time
    room: str

class TimetableUpdate(BaseModel):
    subject: str
    day: str
    start_time: time
    end_time: time
    room: str

class TimetableResponse(BaseModel):
    id: int
    subject: str
    day: str
    start_time: time
    end_time: time
    room: str

    class Config:
        from_attributes = True

class ProgressCreate(BaseModel):
    subject: str
    study_hours: int
    topics_completed: int
    completion_percentage: int

class ProgressUpdate(BaseModel):
    subject: str
    study_hours: int
    topics_completed: int
    completion_percentage: int

class ProgressResponse(BaseModel):
    id: int
    subject: str
    study_hours: int
    topics_completed: int
    completion_percentage: int

    class Config:
        from_attributes = True