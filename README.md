# 📓 Assignment Handler

This is your all-in-one app for handling assignments like a pro. 💼 From adding tasks to tracking them, we've got you covered. Get ready to stay on top of your work while looking sleek with customizable profiles and even *tags*. 🏷️

---

## 💡 Features

- **Add Assignments**: Need to throw in a new task? Use our quick and easy modal to add assignments with a description, payment amount, and a cool cover image. 💸
  
- **Edit & Delete Assignments**: Oops! Made a mistake? No worries! You can easily edit or delete assignments. You stay in control. ✏️❌

- **Profile Customization**: Set up your profile with a name, username, and even your very own profile picture. It's your space, make it personal. 🖼️

- **Tags**: Organize your tasks like a boss! Add tags to assignments so you can filter them quickly later. 🚩

- **Responsive UI**: Yep, it’s fully responsive. You can access this bad boy on any device, be it desktop, tablet, or mobile. 📱💻

---

## 🛠️ How to Get Started

### 1. Clone this repo:  
   ```bash
   git clone https://github.com/sashminea/assignment-handler.git
   cd assignment-handler
   ```

### 2. Install dependencies:  
   Make sure you have Node.js installed. Run:
   ```bash
   npm install
   ```

### 3. Set up your environment:  
   Create a `.env` file in the root of your project and add your MongoDB connection URI:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```

### 4. Run the app locally:  
   To start the server using Express, run:
   ```bash
   node server.js
   ```

### 5. Open in browser:  
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### 6. API Endpoints:
   - **POST** `/api/assignments`: Create a new assignment.
   - **GET** `/api/assignments`: Fetch all assignments.
   - **PUT** `/api/assignments/:cardID`: Update an existing assignment by `cardID`.
   - **DELETE** `/api/assignments/:cardID`: Delete an assignment by `cardID`.

---

### Important Notes:
- Ensure your MongoDB database is running and accessible.
- The server uses Express.js to serve static files and handle API requests dynamically with Fetch API on the frontend.

---

## 🏗️ Project Structure

```
📁 assignment-handler/
├── 📂 public/         # Contains static files
│   ├── 📂 css/        # CSS files
│   ├── 📂 js/         # JavaScript files
│   └── index.html     # Main HTML file
│
├── server.js          # Node.js server file
└── package.json       # Project metadata and dependencies
└── package-lock.json  # Dependency tree lock file
```

---

## 📚 How to Use

### Adding Assignments
- **Click the "Add Assignment" button** to open the modal. Fill out the name, payment amount, and description. Choose an image for your assignment cover, hit submit, and *bam*, it’s added to your list! 🎯

### Profile Settings
- **Personalize your experience** by updating your profile name, username, and profile picture. Just hit the profile settings button in the navigation. Make it your own! 🖌️

### Tags
- **Use the "Add Tag" button** to categorize your assignments. You can add or remove tags anytime to stay organized! 🚀

---

## 📸 Screenshots

### 🗒️ Added Tags (10/06)
![Tags](https://i.imgur.com/kgZE9yQ.png)

### 💻 New UI (09/23)
![Assignment Details](https://i.postimg.cc/dVMQmMsN/image.png)

### 📒 Adding Assignment
![Adding Assignment](https://i.ibb.co/0Qy2nNG/image.png)

### 📝 Edit Assignment
![Edit Assignment](https://i.ibb.co/QcJjbNW/image.png)

---

## 👥 Contributing

Feel like adding a new feature or fixing a bug? Fork the repo, make your changes, and submit a pull request. We welcome all contributions—big or small! 🍕👩‍💻

---

## 📝 License

This project is open-source under the MIT License. Do what you want with it, just don’t forget to drop a star if you like it! ⭐

---
