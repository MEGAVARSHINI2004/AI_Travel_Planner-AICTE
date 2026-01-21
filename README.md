# 🌍 AI Travel Planner

AI Travel Planner is a full-stack web application that helps users generate personalized travel plans using Google Gemini AI.
It creates smart travel itineraries based on user inputs such as destination, duration, budget, and interests.

This project was developed as part of an AICTE initiative.

# 🚀 Features

🧠 AI-powered travel itinerary generation using Google Gemini API
🌐 Full-stack application (Frontend + Backend)
⚡ User-friendly and responsive interface
🔐 Secure environment variable handling
🧩 Clean and modular project structure

# 🛠️ Tech Stack
Frontend
React.js
HTML, CSS, JavaScript
Axios (for API calls)

Backend
Python
Flask
Google Gemini API
RESTful APIs

# 📁 Project Structure
AI_Travel_Planner/
├── Backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── .env          # Not pushed to GitHub
│   └── venv/         # Not pushed to GitHub
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── node_modules/ # Not pushed to GitHub
│
├── .gitignore
└── README.md

# ⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/MEGAVARSHINI2004/AI_Travel_Planner-AICTE.git
cd AI_Travel_Planner-AICTE

# 2️⃣ Backend Setup (Flask + Gemini API)
cd Backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt

Create a .env file inside the Backend folder:
GEMINI_API_KEY=your_gemini_api_key_here

Run the backend server:
python app.py

Backend runs at:
http://localhost:5000

# 3️⃣ Frontend Setup (React)
cd Frontend
npm install
npm start

Frontend runs at:
http://localhost:3000

# 🔑 Environment Variables
Variable	Description
GEMINI_API_KEY	API key for Google Gemini AI

⚠️ Do not commit .env files to GitHub.

# 🧪 Future Enhancements

User authentication
Save and export travel itineraries
Multi-language support
Map and location integration
Improved UI/UX

# 🤝 Contributing

Contributions are welcome!
Fork the repository and submit a pull request.

# 📜 License

This project is created for educational purposes under the AICTE program.

# 👩‍💻 Author

Megavarshini
GitHub: (https://github.com/MEGAVARSHINI2004/AI_Travel_Planner-AICTE.git)

# ⭐ Acknowledgements

Google Gemini API

AICTE

Open-source community
