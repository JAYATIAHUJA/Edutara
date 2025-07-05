# 🌟 **Edu Tara**

An intelligent, inclusive AI-driven learning platform that provides **personalized, adaptive learning plans** for elementary students (Grades 1-5) aligned with **CBSE/NCERT curriculum**, with special focus on **rural India**.

Our system assesses knowledge levels, identifies learning gaps, generates daily/weekly learning challenges, and provides an inclusive, accessible experience (dyslexia-friendly mode, color-blind safe UI, text-to-speech).

---

## 🚀 Features

✅ Adaptive knowledge assessment using LLM (Large Language Model)  
✅ Personalized daily/weekly learning plan (Math + English)  
✅ Progress tracking and dynamic difficulty adjustment  
✅ Text-to-Speech (Hindi + English)  
✅ Offline downloadable notes (PDF/text)  
✅ Color-blind friendly palette + dyslexia-friendly font support  
✅ Rewards system: stars, badges, printable certificates  
✅ Regional language support for rural learners  

---

## ⚙️ **Tech Stack**

### 🎨 Frontend
**React + Vite**
- Lightning-fast, modern user interface  
- Responsive and interactive experience for young learners  
- Efficient development and instant updates  

**TypeScript**
- Strongly typed JavaScript for robust, error-free code  
- Enhanced maintainability and scalability  

---

### 🛠 Backend & Data
**Supabase**
- Open-source, real-time database and authentication  
- Secure storage of student progress, learning plans, and user profiles  
- Instant updates and offline sync for rural connectivity needs  

**JSON**
- Lightweight data format for fast communication between frontend and backend  
- Flexible structure for storing questions, learning plans, and progress data  

---

### 🔄 Automation & AI
**n8n**
- Orchestration of workflow automation  
- Schedule triggers, API calls, dynamic routing of logic  

**n8n Router**
- Routes requests dynamically based on grade level, subject, and detected gaps  

**OpenAI GPT (LLM)**
- Adaptive questioning  
- Learning plan generation  
- Quiz creation  
- Notes generation  

---

## 🌍 Accessibility & Inclusion

- **Dyslexia-friendly mode:** OpenDyslexic / Lexend fonts, clean layouts  
- **Color-blind friendly UI:** Shapes, patterns, tested palettes  
- **Text-to-Speech:** Reads out notes and questions (Hindi + English)  
- **Offline downloadable notes:** PDF / text files for low-connectivity regions  

---

## 📝 How It Works

1️⃣ Initial assessment via adaptive AI-powered questions  
2️⃣ AI detects skill gaps and generates personalized learning plans  
3️⃣ Supabase stores progress, user data, and rewards  
4️⃣ n8n manages workflows, API requests, and dynamic routing  
5️⃣ Frontend displays progress, rewards, and downloadable notes  

---

## 💻 How to Run

1️⃣ Fork the repo  
2️⃣ Install frontend dependencies:
```bash
cd frontend
npm install
npm run dev
