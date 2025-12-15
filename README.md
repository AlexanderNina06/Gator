# 🐊 Gator — RSS Feed Aggregator CLI

Welcome to **Gator**, a command-line RSS feed aggregator built with **TypeScript** and **PostgreSQL**.

Gator allows users to collect RSS feeds from across the internet, store posts in a database, follow feeds added by other users, and browse recent posts directly from the terminal.

---

## 🚀 Features

* 📡 Add RSS feeds from blogs, news sites, and podcasts
* 🗄️ Store aggregated posts in a PostgreSQL database
* 👥 Follow and unfollow feeds added by other users
* 📰 Browse recent posts from the terminal
* ♻️ Safe to re-run (handles duplicates correctly)
* ⏱️ Background aggregator with configurable intervals

---

## 🛠️ Requirements

To run Gator, you’ll need:

* **Node.js** (v18 or later recommended)
* **npm**
* **PostgreSQL**
* **Git**

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/<your-github-username>/gator.git
cd gator
npm install
```

---

## 🗄️ Database Setup

Gator uses **PostgreSQL** to store feeds, users, and aggregated posts.

### Requirements

* PostgreSQL running locally or remotely
* A database created (for example: `gator`)

### Example connection string

```text
postgres://username:password@localhost:5432/gator
```

---

## ⚙️ Configuration

Gator reads its configuration from a file located in your **home directory**:

```text
~/.gatorconfig.json
```

### Example config file

```json
{
  "db_url": "postgres://username:password@localhost:5432/gator",
  "current_user_name": "your-username"
}
```

### Configuration fields

* **`db_url`** — PostgreSQL connection string
* **`current_user_name`** — Active user for CLI commands

---

## ▶️ Running the CLI

You can run the CLI using npm:

```bash
npm run start
```

Or directly with `tsx`:

```bash
tsx ./src/index.ts <command>
```

---

## 🧾 Available Commands

### 👤 User Commands

```bash
gator register <username>
gator login <username>
gator users
```

* **register** — Create a new user
* **login** — Set the current active user
* **users** — List all registered users

---

### 📡 Feed Commands

```bash
gator addfeed <feed-url> <feed-name>
gator feeds
gator follow <feed-id>
gator unfollow <feed-id>
gator following
```

* **addfeed** — Add a new RSS feed
* **feeds** — List all available feeds
* **follow / unfollow** — Follow or unfollow a feed
* **following** — View feeds you are currently following

---

### 📰 Browse Posts

```bash
gator browse [limit]
```

* Displays the most recent aggregated posts
* Optional **limit** parameter
* Default value is **2**

Example:

```bash
gator browse 5
```

---

### 🤖 Aggregator

```bash
gator agg <interval>
```

Runs the RSS feed aggregator continuously.

Examples:

```bash
gator agg 30s
gator agg 1m
```

* Fetches feeds at the specified interval
* Safely handles duplicate posts
* Respects rate limits
* Runs silently unless an error occurs

Stop the aggregator with:

```text
Ctrl + C
```

---

## 🧠 How It Works

* RSS feeds are fetched periodically
* Posts are parsed and stored in PostgreSQL
* Each post URL is unique, preventing duplicates
* Users can follow feeds added by other users
* Aggregated posts can be browsed from the terminal

---

## 🧪 Development Tips

* Use short intervals like `5s` when debugging
* Use longer intervals like `1m` or more for normal usage
* To reset posts during development:

```sql
TRUNCATE TABLE posts RESTART IDENTITY CASCADE;
```


## 🎉 Final Notes

This project demonstrates:

* Real-world CLI application design
* PostgreSQL persistence
* Background aggregation jobs
* Defensive error handling
* Idempotent RSS scraping

Happy aggregating 🐊
