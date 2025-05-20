# Developer Portfolio

A modern, responsive developer portfolio website with a code editor theme. Features dark and light mode support, smooth animations, and a clean, professional design.

## Features

- Dark and Light mode themes
- Code editor-inspired design
- Fully responsive layout
- Smooth animations and transitions
- Interactive project cards
- Modern web technologies
- Hidden mini-games (Easter Egg)

## Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- JavaScript (ES6+)
- Google Fonts
- Intersection Observer API

## Project Structure

```
dev-portfolio/
├── index.html
├── css/
│   ├── main.css
│   ├── theme.css
│   ├── animations.css
│   └── components/
│       ├── navbar.css
│       ├── buttons.css
│       └── cards.css
├── js/
│   └── main.js
└── assets/
    ├── images/
    │   └── project-thumbnails/
    ├── icons/
    └── favicons/
```

## Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. Customize the content and styling to match your preferences

## Customization

### Theme Colors

The color scheme can be modified in `css/theme.css`. The project uses CSS variables for easy customization:

```css
:root {
    /* Dark mode colors */
    --bg-primary: #1e1e1e;
    --bg-secondary: #252526;
    /* ... other variables ... */
}

body.light-mode {
    /* Light mode colors */
    --bg-primary: #ffffff;
    --bg-secondary: #f3f3f3;
    /* ... other variables ... */
}
```

### Typography

The project uses Google Fonts. You can change the fonts by modifying the font imports in `index.html` and updating the font variables in `css/main.css`.

## Contributing

Feel free to submit issues and enhancement requests!

## Hidden Features

### Easter Egg Mini-Games

The portfolio includes a hidden mini-games feature that can be accessed in two ways:

1. **Secret Button**: Look for a small green dot in the bottom right corner of the page. Hover over it to make it more visible, then click to open the games modal.

2. **Konami Code**: Enter the famous Konami Code sequence on your keyboard: ↑ ↑ ↓ ↓ ← → ← → B A

The mini-games feature includes:

- **Snake Game**: Control the snake with arrow keys to eat food and grow longer.
- **Tetris**: Classic block-stacking game with keyboard controls.
- **Memory Game**: Find matching pairs of cards with the fewest moves.
- **Terminal Adventure**: A text-based adventure game with commands to explore a virtual world.

These games are designed to showcase interactive JavaScript programming while adding a fun element to the portfolio.

## License

This project is licensed under the MIT License - see the LICENSE file for details.