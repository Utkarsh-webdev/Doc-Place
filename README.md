# DocTime 🩺

DocTime is a full-stack doctor appointment booking platform that connects patients with verified healthcare professionals. Patients can browse doctors, book appointments, and pay online, while doctors and admins manage appointments through a dedicated dashboard.

**Live Demo:** [doc-time-5k2x.vercel.app](https://doc-time-5k2x.vercel.app/)

---

## 🚀 Features

### For Patients
- Browse and search doctors by specialty
- View doctor profiles, fees, and availability
- Book, cancel, and track appointments
- Secure online payments via **Razorpay / Stripe**
- JWT-based authentication and profile management

### For Doctors
- Manage personal availability and appointment slots
- View and update appointment status (completed/cancelled)
- Track earnings and appointment history

### For Admins
- Add, update, and manage doctor profiles
- View and manage all appointments across the platform
- Dashboard overview of platform activity (patients, doctors, appointments)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS |
| Admin / Doctor Panel | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JSON Web Tokens (JWT) |
| Payments | Razorpay / Stripe |
| Deployment | Vercel |

---

## 📁 Project Structure

```
Doc-Place/
├── client/     # Patient-facing React app
├── admin/      # Combined Admin + Doctor dashboard (React)
└── server/     # Express + MongoDB REST API
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local instance or Atlas)
- Razorpay / Stripe API keys

### 1. Clone the repository
```bash
git clone https://github.com/Utkarsh-webdev/Doc-Place.git
cd Doc-Place
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file inside `server/`:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
```

Run the server:
```bash
npm run server
```

### 3. Client Setup
```bash
cd ../client
npm install
npm run dev
```

### 4. Admin Panel Setup
```bash
cd ../admin
npm install
npm run dev
```

---

## 📸 Screenshots

> _Add screenshots of the Home, Doctors, Appointment, and Admin Dashboard pages here._

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/Utkarsh-webdev/Doc-Place/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Utkarsh Jha**
- GitHub: [@Utkarsh-webdev](https://github.com/Utkarsh-webdev)
