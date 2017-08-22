// Dimensions of game, ID of element where game will go
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

game.global = {
    score : 0,
    scoreText : '',
    jumped : false,
    facing : 'left',
    control : 'dad',
    controlSwitchable : true,
    switching: false
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