# MacQuiz
You can visit the website here: https://ebrooks2002.github.io/MacQuiz/

## Overview
The MacQuiz game is a Vue.js-based web application where players test their familiarity with Macalester College's campus by guessing the location depicted in various images. Players choose from three difficulty levels—easy, medium, or hard—which affect the appearance of each image. At the easy level, images are shown in their original form. For the medium level, images undergo pixelation to make identification harder. At the hard level, images are both pixelated and color-inverted, introducing an additional layer of visual complexity. Each image is accompanied by four answer options, one of which is correct, presented in a randomized order each round.

### Homepage
<img width="700" alt="Screen Shot 2024-11-05 at 11 43 19 AM" src="https://github.com/user-attachments/assets/aa48ed1c-6062-451a-b44b-41fec70d4c1d">

### Gameplay
<img width="700" alt="Screen Shot 2024-11-05 at 11 49 28 AM" src="https://github.com/user-attachments/assets/aac68c74-dc25-4300-a122-9a823cd0bf08">

. Players have a 10-second time limit for each guess, with a color-coded countdown visualized through the timerColor data property in Vue.
. As time runs out, the color gradually changes. The core game logic maintains responsive feedback loops—each guess is immediately evaluated, and the score updates accordingly. 
. Correct answers add points, while incorrect answers decrease the player’s lives.
. When a player’s lives reach zero, a “game over” state is triggered via the buttonTrigger flag, displaying a popup that blocks further gameplay actions.

The app’s audio feedback system, integrated within the game’s logic, plays unique sound effects in response to correct answers, incorrect answers, countdown status, and game-over conditions. This auditory feedback is managed through Vue’s conditional rendering, which ensures that sounds align precisely with player actions and on-screen events. Additionally, for smooth game flow, the resetGame function resets data properties—including score, lives, image selection, and timer—to restart the game without requiring a page reload.

When the game is over, players have the option to enter their username and record their score on a leaderboard. The leaderboard and scoring mechanics are implemented as part of the stateful data managed by Vue, which tracks user performance and preserves their scores across sessions. 

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
Install:
  vue 3.2.38
  vuex 4.0.2
  vuex-persist 3.1.3
  firebase 9.14.0
  animate.css 4.1.1
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
