import { background } from './components/backgrounds'
import { k, sprites } from './game'


//load sprites 
k.loadSprite("bg", "/sprites/bg.jpg")

//load sound 
k.loadSound("sound-bg", "/sounds/background.mp3")
k.loadSound("bomb", "/sounds/bomb.mp3")
k.loadSound("coin", "/sounds/coin.mp3")

sprites.coins.forEach(coin => {
	k.loadSprite(coin, `/sprites/${coin}.png`)
})
k.loadSprite('bomb', '/sprites/bomb.png')

k.scene("game", () => {
	let life = 3, score = 0
	k.add(background.main)

	const scoreText = k.add([
		k.text("0"),
		k.pos(12, 12),
		k.fixed()
	])
	const loadCoin = () => {
		sprites.coins.forEach(coin => {
			k.add([
				k.sprite(coin, { fill: true, width: 50 }),
				k.pos(k.rand(-10, k.width()), 0),
				k.area(),
				k.opacity(0.1),
				k.fadeIn(1),
				k.offscreen({ destroy: true }),
				{
					coin: coin,
					speed: k.rand(120 * 0.5, 120 * 1.5)
				},
				"coin"
			])
		})
	}
	const loadBomb = () => {
		for (let i = 0; i < 3; i++) {
			k.add([
				k.sprite('bomb', { fill: true, width: 50 }),
				k.pos(k.rand(-10, k.width()), 0),
				k.area(),
				k.opacity(0.1),
				k.fadeIn(1),
				k.offscreen({ destroy: true }),
				{
					speed: k.rand(100 * 0.5, 100 * 1.5)
				},
				"bomb"
			])
		}
	}
	k.onUpdate("coin", (coin) => {
		coin.move(0, coin.speed)
	})
	k.onUpdate("bomb", (bomb) => {
		bomb.move(0, bomb.speed)
	})

	k.onClick("bomb", (bomb) => {
		k.play("bomb", { volume: 0.5 })
		bomb.destroy()
	})

	k.onClick("coin", (coin) => {
		k.play("coin", { volume: 0.5 })
		coin.destroy()
		score += 1
		scoreText.text = `${score}`
	})

	k.loop(2, () => loadCoin())
	k.loop(3, () => loadBomb())
})


k.go("game")
k.play("sound-bg", { volume: 0.2 })