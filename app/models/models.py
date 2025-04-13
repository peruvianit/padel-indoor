from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Text, VARCHAR
from sqlalchemy.orm import relationship, DeclarativeBase


class Base(DeclarativeBase):
    pass


# Modello Utente    
class User(Base):
    __tablename__ = "users"
    __table_args__ = {'comment': 'Tabella che contiene le informazioni principali degli utenti registrati.'}

    id = Column(Integer, primary_key=True, comment="Identificativo univoco dell'utente.")
    username = Column(String(50), unique=True, nullable=False, comment="Username scelto dall'utente. Deve essere univoco.")
    email = Column(String(255), unique=True, nullable=False, comment="Email dell'utente. Deve essere univoca.")
    password_hash = Column(String(255), nullable=False, comment="Password dell'utente salvata in formato hash (bcrypt o argon2).")
    is_active = Column(Boolean, default=True, comment="Flag che indica se l'utente è attivo o disabilitato.")
    created_at = Column(DateTime, default=datetime.utcnow, comment="Data e ora di creazione del record.")
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, comment="Data e ora dell'ultima modifica del record.")

    # Relazioni
    tokens = relationship("UserToken", back_populates="user", cascade="all, delete-orphan")
    roles = relationship("UserRole", back_populates="user", cascade="all, delete-orphan")


# Modello Refresh Token
class UserToken(Base):
    __tablename__ = "user_tokens"
    __table_args__ = {'comment': 'Tabella per la gestione dei Refresh Token degli utenti. Permette login multipli da dispositivi diversi.'}

    id = Column(Integer, primary_key=True, comment="Identificativo univoco del token.")
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, comment="Chiave esterna che collega il token all'utente proprietario.")
    refresh_token = Column(VARCHAR(512), nullable=False, comment="Refresh Token assegnato all'utente. Può essere salvato in chiaro o hashato.")
    user_agent = Column(Text, comment="Informazioni sul browser o device che ha effettuato il login.")
    ip_address = Column(String(45), comment="Indirizzo IP pubblico dell'utente al momento del login.")
    expires_at = Column(DateTime, nullable=False, comment="Data e ora di scadenza del token.")
    created_at = Column(DateTime, default=datetime.utcnow, comment="Data e ora di creazione del record.")

    # Relazione
    user = relationship("User", back_populates="tokens")


# Modello Ruoli Utente
class UserRole(Base):
    __tablename__ = "user_roles"
    __table_args__ = {'comment': 'Tabella per associare uno o più ruoli agli utenti (esempio: admin, fisioterapista, paziente).'}

    id = Column(Integer, primary_key=True, comment="Identificativo univoco del ruolo associato.")
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, comment="Chiave esterna che collega il ruolo all'utente.")
    role = Column(String(50), nullable=False, comment="Nome del ruolo associato (esempio: admin, fisioterapista, paziente, operatore).")
    created_at = Column(DateTime, default=datetime.utcnow, comment="Data e ora di creazione del record.")

    # Relazione
    user = relationship("User", back_populates="roles")
