namespace SpriteKind {
    export const StickA = SpriteKind.create()
    export const StickB = SpriteKind.create()
}
// EVENTI
sprites.onOverlap(SpriteKind.StickA, SpriteKind.Projectile, function (stick, proj) {
    proj.setVelocity(Math.abs(proj.vx) + stick.vx / 5, (proj.vy + stick.vy) / 2)
})
sprites.onOverlap(SpriteKind.StickB, SpriteKind.Projectile, function (stick, proj) {
    proj.setVelocity(0 - Math.abs(proj.vx) + stick.vx / 5, (proj.vy + stick.vy) / 2)
})
function Inizializza () {
    // INIZIO
    ball.x = scene.screenWidth() / 2
    ball.y = scene.screenHeight() / 2
    ball.setVelocity(0, 0)
    stick1.x = 22
    stick1.y = scene.screenHeight() / 2 + 4
    stick2.x = 155
    stick2.y = scene.screenHeight() / 2 + 4
    scene.cameraShake(4, 500)
    ball.setVelocity(50 * (Math.random()>0.5 ? 1 : -1), 50 * Math.random())
}
let PuntiPlayer1 = 0
let PuntiPlayer2 = 0
let stick2: Sprite = null
let stick1: Sprite = null
let ball: Sprite = null
tiles.setTilemap(tilemap`level_0`)
tiles.setWallAt(tiles.getTileLocation(0, 0), true)
// OGGETTI
ball = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 1 1 1 1 1 1 . . . . . 
    . . . . . 1 1 1 1 1 1 . . . . . 
    . . . . . 1 1 1 1 1 1 . . . . . 
    . . . . . 1 1 1 1 1 1 . . . . . 
    . . . . . 1 1 1 1 1 1 . . . . . 
    . . . . . 1 1 1 1 1 1 . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Projectile)
stick1 = sprites.create(img`
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    `, SpriteKind.StickA)
controller.player1.moveSprite(stick1)
stick2 = sprites.create(img`
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    `, SpriteKind.StickB)
controller.player2.moveSprite(stick2)
// INIZIO
Inizializza()
ball.setFlag(SpriteFlag.BounceOnWall, true)
scene.centerCameraAt(scene.screenWidth() / 2, scene.screenHeight() / 2)
forever(function () {
    if (ball.isHittingTile(CollisionDirection.Left)) {
        PuntiPlayer2 += 1
        stick2.say(":)", 1000)
        Inizializza()
    }
    if (ball.isHittingTile(CollisionDirection.Right)) {
        PuntiPlayer1 += 1
        stick1.say(":)", 1000)
        Inizializza()
    }
    info.setScore(PuntiPlayer1 - PuntiPlayer2)
    if (ball.vx * ball.vx + ball.vy * ball.vy > 30000) {
        ball.startEffect(effects.fire)
    }
    if (ball.vx * ball.vx + ball.vy * ball.vy < 30000) {
        effects.clearParticles(ball)
    }
})
