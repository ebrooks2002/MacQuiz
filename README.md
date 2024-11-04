# MacQuiz
You can visit the website here: https://ebrooks2002.github.io/MacQuiz/

MacQuiz is a web-based quiz game where players are shown images of Macalester College’s campus and must guess where they were taken. Players can select between easy, medium, or hard difficulty. For easy difficulty, the images aren’t manipulated; for medium difficulty, they are pixelated; for hard, they are both pixelated and color-inverted. Players get 10 seconds to make a guess. Players have 3 lives, meaning that once they get three answers wrong, they lose. Once players lose, they can enter a username, and their score will be kept on a leaderboard. The game includes sound effects for when a player gets an answer wrong or right, for the timer, and for when a player loses.

It is made with Vue 3 as well as other libraries that are mentioned later in the README. 

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
