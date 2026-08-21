from sqlalchemy.orm import Session
from app import models, schemas,security

def create_note(db: Session, note: schemas.NoteCreate,current_user:models.User):
    db_note = models.Note(
        title=note.title,
        content=note.content,
        user_id = current_user.id
    )

    db.add(db_note)
    db.commit()
    db.refresh(db_note)

    return db_note
def get_notes(
    db: Session,
    current_user: models.User
):
    return db.query(models.Note).filter(
        models.Note.user_id == current_user.id
    ).all()

def get_note(db: Session, note_id: int):
    return db.query(models.Note).filter(models.Note.id == note_id).first()

def update_note(
    db: Session,
    note_id: int,
    updated_note: schemas.NoteUpdate,
    current_user: models.User
):
    note = db.query(models.Note).filter(
        models.Note.id == note_id,
        models.Note.user_id == current_user.id
    ).first()

    if not note:
        return None

    note.title = updated_note.title
    note.content = updated_note.content

    db.commit()
    db.refresh(note)

    return note

def delete_note(db: Session, note_id: int):
    db_note = db.query(models.Note).filter(models.Note.id == note_id).first()

    if db_note is None:
        return None

    db.delete(db_note)
    db.commit()

    return db_note

def create_user(db: Session, user: schemas.UserCreate):

    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if existing_user:
        return None

    hashed_password = security.hash_password(user.password)

    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

def login_user(db: Session, user: schemas.UserLogin):

    db_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if db_user is None:
        return None

    if not security.verify_password(
        user.password,
        db_user.hashed_password
    ):
        return None

    access_token = security.create_access_token(
        data={"sub": db_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

def delete_note(
    db: Session,
    note_id: int,
    current_user: models.User
):
    note = db.query(models.Note).filter(
        models.Note.id == note_id,
        models.Note.user_id == current_user.id
    ).first()

    if not note:
        return None

    db.delete(note)
    db.commit()

    return note


def create_assignment(
    db: Session,
    assignment: schemas.AssignmentCreate,
    current_user: models.User
):
    db_assignment = models.Assignment(
        title=assignment.title,
        subject=assignment.subject,
        due_date=assignment.due_date,
        status="Pending",
        user_id=current_user.id
    )

    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)

    return db_assignment

def get_assignments(db: Session, current_user: models.User):
    return (
        db.query(models.Assignment)
        .filter(models.Assignment.user_id == current_user.id)
        .all()
    )

def update_assignment(
    db: Session,
    assignment_id: int,
    assignment: schemas.AssignmentUpdate,
    current_user: models.User
):
    db_assignment = db.query(models.Assignment).filter(
        models.Assignment.id == assignment_id,
        models.Assignment.user_id == current_user.id
    ).first()

    if not db_assignment:
        return None

    db_assignment.title = assignment.title
    db_assignment.subject = assignment.subject
    db_assignment.due_date = assignment.due_date
    db_assignment.status = assignment.status

    db.commit()
    db.refresh(db_assignment)

    return db_assignment

def delete_assignment(
    db: Session,
    assignment_id: int,
    current_user: models.User
):
    db_assignment = db.query(models.Assignment).filter(
        models.Assignment.id == assignment_id,
        models.Assignment.user_id == current_user.id
    ).first()

    if not db_assignment:
        return None

    db.delete(db_assignment)
    db.commit()

    return {"message": "Assignment deleted successfully"}

def get_dashboard(db: Session, current_user: models.User):
    total_notes = db.query(models.Note).filter(
        models.Note.user_id == current_user.id
    ).count()

    total_assignments = db.query(models.Assignment).filter(
        models.Assignment.user_id == current_user.id
    ).count()

    pending_assignments = db.query(models.Assignment).filter(
        models.Assignment.user_id == current_user.id,
        models.Assignment.status == "Pending"
    ).count()

    completed_assignments = db.query(models.Assignment).filter(
        models.Assignment.user_id == current_user.id,
        models.Assignment.status == "Completed"
    ).count()

    return {
        "total_notes": total_notes,
        "total_assignments": total_assignments,
        "pending_assignments": pending_assignments,
        "completed_assignments": completed_assignments
    }

def create_timetable(
    db: Session,
    timetable: schemas.TimetableCreate,
    current_user: models.User
):
    db_timetable = models.Timetable(
        subject=timetable.subject,
        day=timetable.day,
        start_time=timetable.start_time,
        end_time=timetable.end_time,
        room=timetable.room,
        user_id=current_user.id
    )

    db.add(db_timetable)
    db.commit()
    db.refresh(db_timetable)

    return db_timetable

def get_timetable(
    db: Session,
    current_user: models.User
):
    return db.query(models.Timetable).filter(
        models.Timetable.user_id == current_user.id
    ).all()

def update_timetable(
    db: Session,
    timetable_id: int,
    timetable: schemas.TimetableUpdate,
    current_user: models.User
):
    db_timetable = db.query(models.Timetable).filter(
        models.Timetable.id == timetable_id,
        models.Timetable.user_id == current_user.id
    ).first()

    if not db_timetable:
        return None

    db_timetable.subject = timetable.subject
    db_timetable.day = timetable.day
    db_timetable.start_time = timetable.start_time
    db_timetable.end_time = timetable.end_time
    db_timetable.room = timetable.room

    db.commit()
    db.refresh(db_timetable)

    return db_timetable

def delete_timetable(
    db: Session,
    timetable_id: int,
    current_user: models.User
):
    db_timetable = db.query(models.Timetable).filter(
        models.Timetable.id == timetable_id,
        models.Timetable.user_id == current_user.id
    ).first()

    if not db_timetable:
        return None

    db.delete(db_timetable)
    db.commit()

    return {"message": "Timetable deleted successfully"}

def create_progress(
    db: Session,
    progress: schemas.ProgressCreate,
    current_user: models.User
):
    db_progress = models.Progress(
        subject=progress.subject,
        study_hours=progress.study_hours,
        topics_completed=progress.topics_completed,
        completion_percentage=progress.completion_percentage,
        user_id=current_user.id
    )

    db.add(db_progress)
    db.commit()
    db.refresh(db_progress)

    return db_progress

def get_progress(
    db: Session,
    current_user: models.User
):
    return db.query(models.Progress).filter(
        models.Progress.user_id == current_user.id
    ).all()

def get_single_progress(
    db: Session,
    progress_id: int,
    current_user: models.User
):
    return db.query(models.Progress).filter(
        models.Progress.id == progress_id,
        models.Progress.user_id == current_user.id
    ).first()

def update_progress(
    db: Session,
    progress_id: int,
    progress: schemas.ProgressUpdate,
    current_user: models.User
):
    db_progress = db.query(models.Progress).filter(
        models.Progress.id == progress_id,
        models.Progress.user_id == current_user.id
    ).first()

    if not db_progress:
        return None

    db_progress.subject = progress.subject
    db_progress.study_hours = progress.study_hours
    db_progress.topics_completed = progress.topics_completed
    db_progress.completion_percentage = progress.completion_percentage

    db.commit()
    db.refresh(db_progress)

    return db_progress

def delete_progress(
    db: Session,
    progress_id: int,
    current_user: models.User
):
    db_progress = db.query(models.Progress).filter(
        models.Progress.id == progress_id,
        models.Progress.user_id == current_user.id
    ).first()

    if not db_progress:
        return None

    db.delete(db_progress)
    db.commit()

    return {"message": "Progress deleted successfully"}