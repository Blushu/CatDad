// Create the game (dimensions, renderer (Phaser.AUTO detects WEBGL/CANVAS/HEADLESS and reacts appropriately), ID of element where canvas will be injected)
var game = new Phaser.Game( 800 , 600 , Phaser.AUTO , 'gameDiv' );

// Global Variables
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

// Call the bootstate to enable physics
game.state.start('boot');