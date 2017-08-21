// Dimensions of game, ID of element where game will go
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

game.global = {
    score : 0,
    scoreText : '',
    jumped : false,
    facing : 'left',
    control : 'dad',
    controlSwitchable : true,
    switching: false,
    originalTime: 0,
    currentTime: 0,
    originalX: 0,
    originalY: 0,
    deltaX: 0,
    deltaY: 0,
    deltaTime: 0,
    duration: 1
};

// Add each state
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);
game.state.add('gameOver', gameOverState);

// Start the game by calling the boot state
game.state.start('boot');