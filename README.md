# 🎮 Madrasa – Vocabulary Matching Game

An interactive browser-based vocabulary matching game designed for [Madrasa](https://madrasafree.com) — a free, open platform for teaching colloquial Palestinian Arabic to everyone.

Players are presented with Arabic words (in Hebrew transliteration) and must match them to their Hebrew translations by clicking on pairs of cards. The game is integrated into Madrasa's online courses and built to run within the [OpenEdX](https://openedx.org/) platform.

---

## 🌟 Features

- 🃏 **Card Matching Gameplay** – Match Arabic vocabulary cards to their Hebrew translations
- 🔀 **Random Word Selection** – Words are randomly selected each round from a `vocab.json` word bank
- ⏱️ **Timer** – Tracks how long it takes to complete each round
- 🔊 **Audio Support** – Hear the correct pronunciation of each Arabic word
- 🔁 **Restart Button** – Shuffle and restart the game at any time, mid-game or after completion
- 🏆 **Win Screen** – Celebratory end screen with confetti, your time, and an option to review all matched words
- 📋 **Word Review** – After completing the game, toggle a full list of the words you just practiced
- 👩‍🏫 **Instructor Interface** – Instructors can generate new games for specific lessons and units without writing any code
- ⚙️ **Game Generation Automation** – Create multiple game variants based on lesson/unit-specific word lists from the Madrasa course curriculum

---

## 📁 Repository Structure

```
matching-game/
├── index.html          # Main game page
├── app.js              # Core game logic (JavaScript)
├── style.css           # Game styles
├── vocab.json          # Full vocabulary word bank (Arabic ↔ Hebrew, with audio)
├── custom/             # Customizable game instance (e.g., for embedding)
├── instructor/         # Instructor interface for game generation
├── about/              # Project info page (goals, achievements, team)
├── images/             # Game images and assets
├── media/              # Media assets (e.g., trophy SVG, animations)
└── font/               # Custom fonts
```

---

## 📖 Vocabulary Data Format

Words are stored in `vocab.json`. Each entry has the following structure:

```json
{
  "id": 1,
  "arabic": "אִנְשַאללַّה",
  "hebrew": "אם ירצה השם, הלוואי",
  "lesson": 1,
  "unit": 3,
  "part_of_speech": "ביטוי שימושי",
  "audio": "https://madrasa-voice.s3.eu-west-2.amazonaws.com/...",
  "arabic_stt": "ان شاء الله"
}
```

| Field            | Description                                      |
|------------------|--------------------------------------------------|
| `id`             | Unique word identifier                           |
| `arabic`         | Arabic word in Hebrew transliteration            |
| `hebrew`         | Hebrew translation                               |
| `lesson`         | Madrasa course lesson number                     |
| `unit`           | Unit within the lesson                           |
| `part_of_speech` | Grammatical category (in Hebrew)                 |
| `audio`          | URL to the audio pronunciation file              |
| `arabic_stt`     | Arabic script (for speech-to-text reference)     |

---

## 🚀 Getting Started

No build tools or server required. Simply open the game in a browser:

```bash
git clone https://github.com/madrasafree/matching-game.git
cd matching-game
open index.html
```

Or visit the live deployment via [GitHub Pages](https://madrasafree.github.io/matching-game).

---

## 🛠️ Tech Stack

- **HTML5 / CSS3**
- **Vanilla JavaScript**
- **jQuery 3.6**
- **Font Awesome 6** – Icons (restart, sound toggle)
- **vocab.json** – Word bank data source

---

## 👩‍🏫 Instructor Interface

The `instructor/` directory contains a no-code interface that allows Madrasa instructors to:

- Select a specific **lesson** and **unit** from the Madrasa curriculum
- Generate a custom vocabulary matching game for that content
- Embed the resulting game into the OpenEdX course platform without writing code

---

## 👥 Team

**Students:**  
Lina Mansour, Wadad Boulos

**Supervisors:**  
Nadav Wachs, Yaniv Gershon, Gilad Sevitt

---

## 🤝 About Madrasa

[Madrasa](https://madrasafree.com) is a social-community-technological enterprise dedicated to teaching spoken Arabic for free — for everyone. It was founded by Gilad Sevitt with the goal of promoting better communication between the various sectors of society.

- 🌐 [Website](https://madrasafree.com)
- 📘 [Facebook](https://www.facebook.com/madrasafree/)
- 📬 [Contact](https://madrasafree.com/contact)