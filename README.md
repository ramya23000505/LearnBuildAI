# LearnBuild AI – Adaptive Project Learning & Development Platform

**LearnBuild AI** is an AI-powered educational platform designed to bridge the gap between AI project generation and deep technical learning. Unlike direct code generators that bypass the learning process, LearnBuild AI teaches students only the essential concepts required for their specific project idea before assisting them with step-by-step modular development and mock Viva defense examinations.

---

## 🚀 Key Innovations & Architecture

1. **Project-Based Adaptive Learning**:
   - Instead of 40-hour lengthy generic courses, LearnBuild AI extracts only the minimum essential concepts required for the selected project, saving ~65% of study time.
   
2. **Adaptive Tech Stack Swapping**:
   - Students can customize or swap any technology framework at any stage (e.g. swapping React for Angular, or FastAPI for Express). The platform automatically recalculates concepts, learning roadmaps, assessment questions, system architecture, and generated code!

3. **Dynamic Skill Diagnostics with Retries & History**:
   - Real-time letter grading (A+, A, B, C, F), unlimited retries with rotating question pools, and persistent attempt history logs.

4. **Auto-Rescheduling for Missed Study Days**:
   - Automatically recalculates remaining study timetables when students fall behind or miss study days.

5. **Interactive Educational Code Actions**:
   - Every generated code file includes 4 interactive learning tools:
     - **1. Explain Logic**: Line-by-line code logic breakdown.
     - **2. Why This Tech?**: Technical architectural justification.
     - **3. How It Works?**: Execution flow & common pitfalls to avoid.
     - **4. Modify / Swap Tech**: Live technology swapping.

6. **Context-Aware AI Project Tutor**:
   - Built-in contextual AI Tutor drawer that understands the student's current project, active step, tech stack, and diagnostic score history.

7. **Virtual AI Viva Examiner Simulator**:
   - Interactive exam defense simulator with keyword evaluation, 0-100% scoring, examiner feedback, and downloadable completion certificates.

---

## 🛠️ Project Structure

```text
learnbuild-ai/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                   # Top header with preset selector & AI Tutor trigger
│   │   ├── PhaseTracker.jsx             # 14-step workflow stepper tracker
│   │   ├── AITutorDrawer.jsx            # Contextual AI Tutor chat sidebar
│   │   ├── TechStackCustomizerModal.jsx # Real-time tech stack swapper modal
│   │   ├── Phase1/
│   │   │   ├── ProjectIdeaInput.jsx     # Step 1: Prompt input & domain picker
│   │   │   ├── TechAnalysisView.jsx     # Step 2: AI Tech Stack & difficulty analysis
│   │   │   ├── ConceptExtractor.jsx     # Step 3: Must-learn vs skipped concept matrix
│   │   │   ├── KnowledgeAssessment.jsx  # Step 4: Diagnostic quiz with grades & history
│   │   │   ├── PersonalizedRoadmap.jsx  # Step 5: Adaptive timetable & rescheduling
│   │   │   ├── LearningHub.jsx          # Step 6: YouTube video links & cheat sheets
│   │   │   ├── KnowledgeVerification.jsx# Step 7: Practical task verification
│   │   │   └── ReadinessDashboard.jsx   # Step 8: Readiness scorecard & gate unlock
│   │   └── Phase2/
│   │       ├── ArchitectureView.jsx     # Step 9: Folder tree, ER diagram & API specs
│   │       ├── CodeStudio.jsx           # Step 10: Code viewer with 4 educational actions
│   │       ├── TestDeployCenter.jsx     # Step 11: Unit tests, Dockerfile & cloud guides
│   │       ├── DocGenerator.jsx         # Step 12: SRS, README & PPT slides exporter
│   │       └── VivaExaminer.jsx         # Steps 13-14: Virtual AI Viva Examiner simulator
│   ├── services/
│   │   ├── aiEngine.js                  # Dynamic project analyzer, concept extractor & questions
│   │   ├── codeGenerator.js             # Dynamic architecture, code files & doc exporter
│   │   └── storageService.js            # Persistent LocalStorage state service
│   ├── data/
│   │   ├── sampleProjects.js
│   │   ├── questionBank.js
│   │   ├── learningResources.js
│   │   └── vivaQuestions.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
└── vite.config.js
```

---

## ⚡ Quick Start Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.
