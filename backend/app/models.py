from sqlalchemy import Column, Integer, String, ForeignKey, Date, Time
from sqlalchemy.orm import relationship
from app.database import Base


class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    user_id=Column(Integer,ForeignKey("users.id"))
    owner = relationship("User", back_populates="notes")
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    notes = relationship("Note", back_populates="owner")
    assignments = relationship("Assignment", back_populates="owner")
    timetable = relationship("Timetable", back_populates="owner")
    progress = relationship("Progress", back_populates="owner")
class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    due_date = Column(Date, nullable=False)
    status = Column(String, default="Pending")

    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="assignments")

class Timetable(Base):
    __tablename__ = "timetable"

    id = Column(Integer, primary_key=True, index=True)

    subject = Column(String, nullable=False)
    day = Column(String, nullable=False)

    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)

    room = Column(String, nullable=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="timetable")

class Progress(Base):
    __tablename__ = "progress"

    id = Column(Integer, primary_key=True, index=True)

    subject = Column(String, nullable=False)
    study_hours = Column(Integer, nullable=False)
    topics_completed = Column(Integer, nullable=False)
    completion_percentage = Column(Integer, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="progress")