from fastapi import Depends,FastAPI,HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_current_user
from app.models import User
from app.database import get_db,engine
from app import crud,schemas,models
from fastapi.middleware.cors import CORSMiddleware
models.Base.metadata.create_all(bind=engine)
app=FastAPI(
    title="StudyNest API",
    version="1.0.0",
    description="Backend API for StudyNest"
)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://studynest-byteja.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def root():
    return{"message":"welcome to studyNest"}

@app.post("/notes")
def create_note(
    note: schemas.NoteCreate,
    db: Session = Depends(get_db),
    current_user:models.User = Depends(get_current_user)
):
    return crud.create_note(db, note, current_user)

@app.get("/notes")
def get_notes(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.get_notes(db, current_user)


@app.get("/notes/{note_id}")
def read_note(
    note_id: int,
    db: Session = Depends(get_db)
):
    return crud.get_note(db, note_id)
@app.put("/notes/{note_id}")
def update_note(
    note_id: int,
    note: schemas.NoteUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    updated = crud.update_note(db, note_id, note, current_user)

    if not updated:
        raise HTTPException(status_code=404, detail="Note not found")

    return updated

@app.post("/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail="User already exists"
        )

    return crud.create_user(db, user)

@app.post("/login")
def login(
    user: schemas.UserLogin,
    db: Session = Depends(get_db)
):

    token = crud.login_user(db, user)

    if token is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return token

@app.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email
    }

@app.delete("/notes/{note_id}")
def delete_note(
    note_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    deleted_note = crud.delete_note(
        db,
        note_id,
        current_user
    )

    if not deleted_note:
        raise HTTPException(
            status_code=404,
            detail="Note not found"
        )

    return {"message": "Note deleted successfully"}

@app.post("/assignments", response_model=schemas.AssignmentResponse)
def create_assignment(
    assignment: schemas.AssignmentCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.create_assignment(db, assignment, current_user)

@app.get("/assignments", response_model=list[schemas.AssignmentResponse])
def get_assignments(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.get_assignments(db, current_user)

@app.put("/assignments/{assignment_id}", response_model=schemas.AssignmentResponse)
def update_assignment(
    assignment_id: int,
    assignment: schemas.AssignmentUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    updated_assignment = crud.update_assignment(
        db,
        assignment_id,
        assignment,
        current_user
    )

    if not updated_assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    return updated_assignment

@app.delete("/assignments/{assignment_id}")
def delete_assignment(
    assignment_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    deleted_assignment = crud.delete_assignment(
        db,
        assignment_id,
        current_user
    )

    if not deleted_assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    return deleted_assignment

@app.get("/dashboard", response_model=schemas.DashboardResponse)
def get_dashboard(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.get_dashboard(db, current_user)

@app.post("/timetable", response_model=schemas.TimetableResponse)
def create_timetable(
    timetable: schemas.TimetableCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.create_timetable(db, timetable, current_user)

@app.get("/timetable", response_model=list[schemas.TimetableResponse])
def get_timetable(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.get_timetable(db, current_user)

@app.get("/timetable/{timetable_id}", response_model=schemas.TimetableResponse)
def get_single_timetable(
    timetable_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    timetable = crud.get_single_timetable(
        db,
        timetable_id,
        current_user
    )

    if not timetable:
        raise HTTPException(
            status_code=404,
            detail="Timetable not found"
        )

    return timetable

@app.put("/timetable/{timetable_id}", response_model=schemas.TimetableResponse)
def update_timetable(
    timetable_id: int,
    timetable: schemas.TimetableUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    updated = crud.update_timetable(
        db,
        timetable_id,
        timetable,
        current_user
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Timetable not found"
        )

    return updated

@app.delete("/timetable/{timetable_id}")
def delete_timetable(
    timetable_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    deleted = crud.delete_timetable(
        db,
        timetable_id,
        current_user
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Timetable not found"
        )

    return deleted

@app.post("/progress", response_model=schemas.ProgressResponse)
def create_progress(
    progress: schemas.ProgressCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.create_progress(db, progress, current_user)

@app.get("/progress", response_model=list[schemas.ProgressResponse])
def get_progress(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.get_progress(db, current_user)

@app.get("/progress/{progress_id}", response_model=schemas.ProgressResponse)
def get_single_progress(
    progress_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    progress = crud.get_single_progress(
        db,
        progress_id,
        current_user
    )

    if not progress:
        raise HTTPException(
            status_code=404,
            detail="Progress not found"
        )

    return progress

@app.put("/progress/{progress_id}", response_model=schemas.ProgressResponse)
def update_progress(
    progress_id: int,
    progress: schemas.ProgressUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    updated = crud.update_progress(
        db,
        progress_id,
        progress,
        current_user
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Progress not found"
        )

    return updated

@app.delete("/progress/{progress_id}")
def delete_progress(
    progress_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    deleted = crud.delete_progress(
        db,
        progress_id,
        current_user
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Progress not found"
        )

    return deleted