import kaplay from "kaplay"

export const k = kaplay({
    focus: true,
    loadingScreen: true,
    touchToMouse: true,
    background: [0, 0, 0]
})
export const sprites = {
    coins: ["btc", "doge", "shiba", "team", "notcoin"],
    bomb: 1
}