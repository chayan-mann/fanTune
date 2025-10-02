# 🎵 fanTune - Your Stream, Their Soundtrack

**fanTune** is a real-time, interactive web application that transforms how content creators engage with their audience through music. It allows streamers to create dedicated music rooms where viewers[...]

The application features a robust multi-room system, admin controls for queue management, and a sleek, modern interface, all powered by a real-time backend to ensure a perfectly synchronized experienc[...]

**Live Demo:** [fantune.chayanmann.in](https://fantune.chayanmann.in/)

---

## ✨ Key Features

- **Multi-Room System:** Admins can create and manage multiple, independent streaming rooms.
- **Real-Time Queue & Voting:** Song submissions and upvotes are reflected instantly for all users in a room without needing a page refresh (powered by Supabase Realtime).
- **Community-Powered Playlists:** The next song to play is democratically chosen based on the highest number of votes.
- **Admin Controls:** Room creators (admins) have full control to play the next song and delete unwanted tracks from the queue.
- **Secure Authentication:** Users can sign in securely using their Google accounts, managed by NextAuth.js.
- **Protected Routes:** Only authenticated users can access rooms, and only admins can create them, thanks to Next.js Middleware.
- **Sleek & Responsive UI:** A modern, dark-themed interface built with Tailwind CSS that looks great on both desktop and mobile devices.
- **Dockerized Deployment:** Easily run the application anywhere using Docker for a consistent and simplified deployment experience.

---

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Database & ORM:** [PostgreSQL](https://www.postgresql.org/) on [Supabase](https://supabase.com/) with [Prisma](https://www.prisma.io/)
- **Real-time:** [Supabase Realtime](https://supabase.com/docs/guides/realtime)
- **Deployment:** [Vercel](https://vercel.com/), **Docker**

---

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later) **(if not using Docker)**
- npm or yarn **(if not using Docker)**
- Docker & Docker Compose **(for containerized setup)**
- A local PostgreSQL instance or a free Supabase project
- A Google Cloud project for OAuth credentials
- A YouTube Data API Key

### Installation & Setup (Non-Docker)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/chayan-mann/fanTune.git

    cd fanTune
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    Create a file named `.env.local` in the root of the project and add the variables mentioned in the `.env.sample` file in the root directory of this repository.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application should now be running at [http://localhost:3000](http://localhost:3000).

---

### 🚢 Dockerized Setup

A Dockerfile and optional `docker-compose.yml` are provided to make running the app even easier.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/chayan-mann/fanTune.git
    cd fanTune
    ```

2.  **Create your environment file:**
    - Copy `.env.sample` to `.env.local` and fill in the required environment variables.

3.  **Build and run using Docker:**
    ```bash
    docker build -t fantune .
    docker run --env-file .env.local -p 3000:3000 fantune
    ```

    _Or, with Docker Compose (if a `docker-compose.yml` is present):_
    ```bash
    docker-compose up --build
    ```

4.  **Access the app:**
    - Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
