from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# change postgres and password to your actual username and pwd
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:password@localhost:5432/kintsugi_db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()