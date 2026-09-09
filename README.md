# ClimaBoard

 מזג אוויר למטיילים 

## הרצה:

### Backend:
~~~~
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
~~~~
רץ על http://localhost:8000 

### Frontend:
~~~~
cd frontend
npm install
npm run dev
~~~~
רץ על http://localhost:5173

## אנדפוינטים בשרת:
- GET /cities/search?name= - חיפוש עיר
- GET /weather/current - מזג אוויר נוכחי
- GET /weather/forecast - תחזית
- GET /weather/compare - השוואה בין 2 ערים
- GET /favorites/get/{name} - מועדפים של משתמש
- POST /favorites/add - הוספה למועדפים
- DELETE /favorites/remove/{id} - מחיקה ממועדפים
- GET /atbash/{text} - אתבש
- GET /health - בדיקת שרת
