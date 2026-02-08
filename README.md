# ⚡ DualForge Editor

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff.svg?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green.svg)

> **The Ultimate Hybrid:** A powerful split-screen editor combining Markdown simplicity with HTML precision.
>
> **Der ultimative Hybrid:** Ein leistungsstarker Split-Screen-Editor, der die Einfachheit von Markdown mit der Präzision von HTML vereint.

---

## 🌐 Choose Language / Sprache wählen

- [🇺🇸 English Documentation](#-english-documentation)
- [🇩🇪 Deutsche Dokumentation](#-deutsche-dokumentation)

---

<a name="english"></a>
## 🇺🇸 English Documentation

### 📖 About
**DualForge Editor** is a modern, React-based text editor designed for developers and content creators who need more than just standard Markdown. It features a dual-pane interface (Editor & Live Preview), a rich toolbar for both Markdown and HTML helper tools, and advanced extensions like Math formulas, Diagrams, and Admonitions.

### ✨ Key Features

* **⚡ Real-time Split Screen:** Write on the left, see the result instantly on the right.
* **📝 Hybrid Syntax:** Supports standard Markdown (`**bold**`, `# H1`) AND raw HTML (`<div style="...">`).
* **🛠️ Dual Toolbar:**
    * **Markdown Tab (Blue):** Standard formatting, Lists, Tables, Math, TOC.
    * **HTML Tab (Green):** Text alignment, Colors, Iframe generator, Grid layouts, Spoilers.
* **🎨 Rich Media Tools:**
    * **Icon Picker:** Integrated FontAwesome gallery (Searchable).
    * **Emoji Picker:** Insert emojis with a click.
    * **Color Picker:** Hex-code generator for text/backgrounds.
* **📐 Advanced Rendering:**
    * **Math:** LaTeX support via KaTeX (`$$E = mc^2$$`).
    * **Diagrams:** Mermaid support flowcharts & graphs.
    * **Admonitions:** Beautiful alert boxes (`:::tip`, `:::warning`).
    * **TOC:** Auto-generated Table of Contents (`[[toc]]`).
* **🌍 Internationalization (i18n):** One-click switch between **English** and **German**.
* **🧹 Smart Formatter:** Cleans up code, removes trailing spaces, and fixes HTML indentation.
* **▦ Smart Table Generator:** Visual grid editor with intelligent Excel copy-paste support to create complex Markdown tables in seconds.

### 🚀 Installation & Configuration

**Default Port:** `1001`

#### ⚙️ Configuration
Settings are managed centrally via the `.env` file in the root directory.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/el-choco/dualforge-editor.git
    cd dualforge-editor
    ```

2.  **Create or edit the `.env` file:**
    ```env
    VITE_PORT=1001
    VITE_HOST=0.0.0.0
    NODE_ENV=development
    ```

3.  **Start Container:**
    ```bash
    docker compose up -d
    ```

.  **Open in Browser:**
    Go to `http://localhost:1001` (or your configured `VITE_PORT`).

    > **Note:** To change the port, simply update `VITE_PORT` in the `.env` file and restart the container.

#### 💻 Option B: Node.js (Manual)

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start Server:**
    ```bash
    npm run dev
    ```

### 💡 Syntax Guide

| Feature | Syntax | Output |
| :--- | :--- | :--- |
| **TOC** | `[[toc]]` | Generates a Table of Contents |
| **Math** | `$$ x^2 $$` | Renders formatted Formula |
| **Tip Box** | `:::tip`<br>`Text`<br>`:::` | Green Info Box |
| **Spoiler** | `Click <details>...` | Collapsible text |
| **Language** | Toolbar Toggle | Switch UI EN/DE |

### 🛠️ Tech Stack
* **Core:** React 18, Vite
* **Parser:** Marked, DOMPurify
* **Syntax Highlighting:** Highlight.js
* **Math:** KaTeX
* **Icons:** Lucide React, FontAwesome
* **I18n:** i18next

---

<a name="german"></a>
## 🇩🇪 Deutsche Dokumentation

### 📖 Über das Projekt
**DualForge Editor** ist ein moderner, React-basierter Texteditor für Entwickler und Content Creator, die mehr als nur Standard-Markdown benötigen. Er bietet eine zweigeteilte Oberfläche (Editor & Live-Vorschau), eine umfangreiche Toolbar für Markdown- und HTML-Tools sowie erweiterte Funktionen wie mathematische Formeln, Diagramme und Hinweisboxen.

### ✨ Hauptfunktionen

* **⚡ Echtzeit-Split-Screen:** Links schreiben, rechts sofort das Ergebnis sehen.
* **📝 Hybrid-Syntax:** Unterstützt Standard-Markdown (`**fett**`, `# H1`) UND rohes HTML (`<div style="...">`).
* **🛠️ Doppelte Werkzeugleiste:**
    * **Markdown-Tab (Blau):** Formatierung, Listen, Tabellen, Mathe, Inhaltsverzeichnis.
    * **HTML-Tab (Grün):** Textausrichtung, Farben, Iframe-Generator, Grid-Layouts, Spoiler.
* **🎨 Medien-Tools:**
    * **Icon-Galerie:** Integrierte FontAwesome-Suche.
    * **Emoji-Picker:** Emojis per Klick einfügen.
    * **Farbwähler:** Hex-Code-Generator für Text und Hintergründe.
* **📐 Erweitertes Rendering:**
    * **Mathe:** LaTeX-Support via KaTeX (`$$ E = mc^2 $$`).
    * **Diagramme:** Mermaid-Support für Flussdiagramme.
    * **Hinweisboxen:** Schicke Alert-Boxen (`:::tip`, `:::warning`).
    * **TOC:** Automatisch generiertes Inhaltsverzeichnis (`[[toc]]`).
* **🌍 Mehrsprachigkeit (i18n):** Umschalten zwischen **Deutsch** und **Englisch** mit einem Klick.
* **🧹 Smart Formatter:** Bereinigt den Code, entfernt unnötige Leerzeichen und repariert Abstände.
* **▦ Smarter Tabellen-Generator:** Visueller Grid-Editor mit intelligenter Excel-Copy-Paste-Funktion zum blitzschnellen Erstellen komplexer Markdown-Tabellen.

### 🚀 Installation & Konfiguration

**Standard-Port:** `1001`

#### ⚙️ Konfiguration
Alle Einstellungen werden zentral über die `.env` Datei im Hauptverzeichnis verwaltet.

1.  **Repository klonen:**
    ```bash
    git clone https://github.com/el-choco/dualforge-editor.git
    cd dualforge-editor
    ```

2.  **Erstelle oder bearbeite die `.env` Datei:**
    ```env
    VITE_PORT=1001
    VITE_HOST=0.0.0.0
    NODE_ENV=development
    ```

3.  **Container starten:**
    ```bash
    docker compose up -d
    ```

4.  **Im Browser öffnen:**
    Gehe zu `http://localhost:1001` (bzw. dein konfigurierter `VITE_PORT`).

    > **Hinweis:** Um den Port zu ändern, passe einfach `VITE_PORT` in der `.env` Datei an und starte den Container neu.


#### 💻 Option B: Node.js (Manuell)

1.  **Abhängigkeiten installieren:**
    ```bash
    npm install
    ```

2.  **Server starten:**
    ```bash
    npm run dev
    ```

### 💡 Syntax Kurzanleitung

| Funktion | Syntax | Ergebnis |
| :--- | :--- | :--- |
| **Inhalt** | `[[toc]]` | Erstellt Inhaltsverzeichnis |
| **Mathe** | `$$ x^2 $$` | Rendert mathematische Formel |
| **Tipp Box** | `:::tip`<br>`Text`<br>`:::` | Grüne Hinweisbox |
| **Spoiler** | `Klick <details>...` | Ausklappbarer Text |
| **Sprache** | Toolbar Schalter | UI DE/EN umschalten |

### 🛠️ Verwendete Technologien
* **Core:** React 18, Vite
* **Parser:** Marked, DOMPurify
* **Highlighting:** Highlight.js
* **Mathe:** KaTeX
* **Icons:** Lucide React, FontAwesome
* **I18n:** i18next

---

Made with ❤️ by el-choco