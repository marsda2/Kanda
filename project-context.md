# Kanda Project Context & Guidelines

## 1. Brand Essence & Core Concept
**Kanda** is conceptualized as a sanctuary within the urban environment—"La pausa perfecta". It is a coffee shop and bakery that focuses on providing a space where time stops, allowing visitors to disconnect from the city's noise and reconnect with themselves and their surroundings.

**Core Themes:**
- **Calm & Disconnection:** A refuge from the city's rush.
- **Quality & Craftsmanship:** "Pureza botánica" (botanical purity) and "el grano perfecto" (the perfect bean). High-quality ingredients and uncompromising quality.
- **Community & Connection:** Fostering a welcoming environment for everyone, including pets ("Ellos también son familia").

## 2. Tone of Voice & Copywriting
The tone of voice is warm, inviting, premium, yet accessible. It blends sophisticated descriptions with friendly, colloquial touches to make the user feel at home.

- **Keywords/Phrases:** "Tu cafecito perfecto", "flow", "un rinconcito de calma", "recargar energías", "la pausa perfecta".
- **Language:** Spanish (Cuba/Latin America context but neutral enough for broad appeal).
- **Style:** 
  - **Headlines:** Short, punchy, bold, often uppercase, and evocative (e.g., "NUESTRA HISTORIA", "THE VIBE").
  - **Body Text:** Descriptive, sensory, relaxing, and sincere. Uses italics for quotes or special little phrases that talk directly to the user (e.g., *"Tu cafecito perfecto para recargar energías y seguir tu día con flow."*).
- **Inclusivity:** Strongly pet-friendly, referring to pets as "familia" (family) and highlighting initiatives to help street animals.

## 3. Visual Identity & Styling (Tailwind CSS)
The design language is modern, organic, and elegant, characterized by rounded/organic shapes, smooth animations, and an earthy color palette.

### Color Palette
- **Primary Dark Green:** `#173018` (Used for main headings, primary buttons, strong accents).
- **Olive/Gold Accent:** `#705d00` (Used for highlights, borders, stars/icons, and sub-badges).
- **Backgrounds:** `#f9f9f9` (Main background, off-white), `#eeeeee` (Secondary background, subtle contrast).
- **Text/Body:** `#434841` (Soft dark green/gray for readable body text), `#1a1c1c` (Base text color).
- **Muted Accents:** `#c3c8be` (Light sage green for subtle elements like vegan icons or background text).

### Typography
- **Headlines (`font-headline`):** Used for titles, typically styled with `font-extrabold` or `font-bold`, uppercase, and tight tracking (`tracking-tighter`, `tracking-tight`).
- **Body (`font-body`):** Used for paragraphs, descriptions, and regular text. Clean, readable, and often styled with `font-light` or `leading-relaxed`.

### UI Components & Aesthetics
- **Shapes:** Heavy use of rounded corners (`rounded-2xl`, `rounded-md`) and organic, asymmetrical shapes for images and backgrounds (e.g., `rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%]`).
- **Animations:** Extensive use of `framer-motion` (now `motion/react`) for smooth entrance animations (fade up/in, slow translations). Use of slow CSS spin animations for background organic shapes.
- **Gradients & Shadows:** Very subtle shadows (`shadow-sm`) and occasional gradient text or buttons for a premium feel.
- **Layouts:** Spacious layouts with generous padding (`py-24`, `max-w-7xl`, `gap-16`) to emphasize the feeling of "breathing room" and calm.

## 4. Development Standards
- **Framework:** Next.js (App Router), React 19+.
- **Styling:** Tailwind CSS v4.
- **Animations:** `motion/react` (Framer Motion).
- **Icons:** `lucide-react`.
- **Database/Backend:** Supabase (e.g., used for "Kanda Club" email signups).
- **Structure:** Modular components in `src/components`, keeping pages in `src/app` relatively clean.

## 5. Key Features & Sections
- **Menu:** Divided into clear categories with a focus on visual presentation (horizontal scrolling carousels for featured items) and clear tagging (Vegan, Featured).
- **Kanda Club:** A loyalty program ("Tómate 9 y el 10 va por Kanda") accessed via a modal.
- **Pet Friendly:** Dedicated messaging emphasizing the welcoming nature for pets and the brand's social responsibility.
- **Community (The Vibe):** Integration with Instagram to showcase the real-life atmosphere of the cafe.

---
*Note for LLMs: When generating new code, copy, or components for Kanda, strictly adhere to the color variables, typography classes, and the relaxed, inviting tone of voice outlined in this document.*
