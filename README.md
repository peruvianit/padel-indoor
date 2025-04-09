# 🎾 Padel indoor - <span style="display:inline-block;width:auto;height:auto;background-color:#2196F3;border-radius:15px;margin-right:6px;font-size:0.5em;padding:10px">v 0.1.0</span> 


Applicazione per la gestione di un centro sportivo.

---

## 📦 Funzionalità principali

- 🔐 Autenticazione con ruoli (Admin, Dipendente)
- 👥 Gestione anagrafiche
- 🏬 Assegnazione a reparti e team
- 📊 Dashboard con statistiche in tempo reale
- 📁 Gestione documentale per progetto

---

## 🚀 Installazione

### Requisiti
- Node.js >= 18
- Python >= 3.10
- PostgreSQL

### Avvio in locale

```bash
# 1. Clona il repository
git clone gh repo clone peruvianit/padel-indoor
cd padel-indoor

# 2. Creazione enviroment
python -m venv venv

# 3. Attiva enviroment
venv\Scripts\activate  

# 4. Installa le dipendenze
pip install -r requirements.txt

# 5. Avvia il backend e frontend
uvicorn app.main:app --reload


EXTRA:

> Per aggiornare il requirements.txt 
pip freeze > requirements.txt

> Se ci sono problemi di cache dei oggetti
python tools/clean_pycache.py