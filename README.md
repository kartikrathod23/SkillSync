🎓 SkillSync - Peer-to-Peer Skill Exchange Platform
A collaborative platform connecting learners and mentors for real-time skill sharing, featuring session requests, video calls, and smart skill matching algorithms.

📋 Overview
SkillSync helps users teach what they know and learn what they want through:

Smart Matching: Algorithm finds users who can teach what you want to learn AND want to learn what you can teach
Session Management: Request, accept, and schedule learning sessions
Real-time Chat: WebSocket-powered messaging between users
Video Calls: Integrated Jitsi Meet for virtual sessions
Profile Showcase: Display skills, experience, and learning interests


🛠️ Tech Stack
Frontend

React 18 + Vite
React Router v6
Socket.IO Client
Tailwind CSS

Backend

Node.js + Express
MongoDB + Mongoose
Socket.IO
JWT Authentication
Bcrypt for password hashing


🚀 Getting Started
Prerequisites

Node.js (v16 or higher)
MongoDB (local or MongoDB Atlas)
npm or yarn


Installation & Setup
1. Clone the repository
bashgit clone https://github.com/kartikrathod23/SkillSync.git
cd skillsync

2. Backend Setup
bash# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
Add the following to .env:
envPORT=5000
MONGO_URI=mongodb://localhost:27017/skillsync
JWT_SECRET=your_super_secret_jwt_key_12345
CLIENT_URL=http://localhost:5173
Start the backend server:
bashnpm run dev
✅ Backend running on http://localhost:5000

3. Frontend Setup
Open a new terminal and run:
bash# Navigate to frontend folder (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file
touch .env
Add the following to .env:
envVITE_API_BASE_URL=http://localhost:5000
Start the frontend:
bashnpm run dev
```

✅ Frontend running on `http://localhost:5173`

---

## 🎯 **How to Use**

1. **Sign Up**: Create an account with your skills and learning interests
2. **Browse Matches**: View users who match your learning goals
3. **Request Session**: Send session requests with topic and schedule
4. **Chat**: Message other users in real-time
5. **Video Call**: Join accepted sessions via integrated video chat
6. **Track Progress**: View completed sessions and stats on dashboard

---

## 🔑 **Key Features**

### **1. Skill Matching Algorithm**
- Finds mutual learning opportunities
- Bidirectional matching: users who can teach what you want to learn AND want to learn what you teach
- Categorized browsing (Web Dev, App Dev, ML, Cybersecurity)

### **2. Session System**
- Request sessions with topic and scheduled time
- Accept/reject requests
- Real-time notifications via Socket.IO
- Mark sessions as complete
- Track statistics (completed sessions, skills learned)

### **3. Real-time Chat**
- Socket.IO-powered messaging
- Persistent message history (MongoDB)
- Room-based conversations
- Chat list sorted by recent activity

### **4. Video Calling**
- Integrated Jitsi Meet
- Secure room generation
- No additional setup required

---

## 📡 **API Endpoints**

### **Authentication**
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user (protected)
GET    /api/auth/users/:id   - Get user by ID
```

### **Users**
```
GET    /api/users/match                - Get skill matches
GET    /api/users/match/learnonly      - Get learning matches
GET    /api/users/all                  - Get all users
```

### **Sessions**
```
POST   /api/sessions/request           - Request a session
GET    /api/sessions/received          - Get received requests
GET    /api/sessions/accepted          - Get accepted sessions
GET    /api/sessions/between/:id       - Check session between users
GET    /api/sessions/:id               - Get session by ID
PUT    /api/sessions/:id/respond       - Accept/reject session
PUT    /api/sessions/:id/complete      - Mark session complete
GET    /api/sessions/stats/me          - Get user stats
```

### **Messages**
```
POST   /api/messages                   - Send message
GET    /api/messages/:userId           - Get messages with user
POST   /api/messages/room              - Create/get chat room
GET    /api/messages/rooms/list        - Get all chat rooms

🔐 Authentication Flow

User registers → Password hashed with bcrypt
JWT token generated (7-day expiry)
Token stored in localStorage
Protected routes check token via middleware
Token sent as Authorization: Bearer <token> header


🌐 Real-time Features (Socket.IO)
Events
javascript// Client emits
socket.emit('join', userId)              // Join user's room
socket.emit('joinRoom', roomId)          // Join chat room
socket.emit('sendMessage', { roomId, message })

// Client listens
socket.on('sessionAccepted', session)    // New session accepted
socket.on('receiveMessage', message)     // New chat message

🧪 Testing the App
Quick Test Flow

Register two users with complementary skills:

User A: Skills: React, Node.js | Interests: Python, ML
User B: Skills: Python, ML | Interests: React, Web Dev


Login as User A → Check "Skill Matches" → See User B
Request session with User B
Login as User B → Accept session request
Both users see session in "Upcoming Sessions"
Start chat or join video call


🐛 Troubleshooting
MongoDB Connection Error
bash# Make sure MongoDB is running
mongod

# Or use MongoDB Atlas connection string
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/skillsync
CORS Issues
Ensure CLIENT_URL in backend .env matches frontend URL
Socket.IO Not Connecting

Check if API_BASE in frontend .env is correct
Verify CORS settings in server.js

JWT Token Issues

Clear localStorage: localStorage.clear() in browser console
Re-login to get fresh token


📝 Environment Variables
Backend (.env)
envPORT=5000
MONGO_URI=mongodb://localhost:27017/skillsync
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
Frontend (.env)
envVITE_API_BASE_URL=http://localhost:5000

🔮 Future Enhancements

 Email verification on signup
 Password reset flow
 File sharing in chat
 Session ratings and reviews
 Calendar integration
 Mobile app (React Native)
 AI-powered skill recommendations
 Group sessions support


🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository
Create a feature branch (git checkout -b feature/AmazingFeature)
Commit changes (git commit -m 'Add some AmazingFeature')
Push to branch (git push origin feature/AmazingFeature)
Open a Pull Request


📄 License
This project is licensed under the MIT License.

👨‍💻 Author
Your Name

GitHub: kartikrathod23
LinkedIn: https://www.linkedin.com/in/kartik-rathod-3513172a8/
Email: rathodkartik293@gmail.com


🙏 Acknowledgments

Jitsi Meet for video conferencing
Socket.IO for real-time communication
Tailwind CSS for styling


⭐ If you found this project helpful, please give it a star!


Built with ❤️ by Kartik Rathod
