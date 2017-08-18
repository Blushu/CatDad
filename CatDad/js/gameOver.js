var gameOverState = {
    
    create: function() {
        // Game Over Text
        var gameOverLabel = game.add.text(80, 80, 'GAME OVER...', { font: '50px Arial', fill: '#00FF00' } );
        // Explanation
        var emptyLabel = game.add.text(80, 160, 'Cat is still hungry! Try again?', { font: '25px Arial', fill: '#ffffff' } );
        // Instructions to start
        var startLabel = game.add.text(80, game.world.height-80, 'press the spacebar to restart', { font: '25px Arial', fill: '#ffffff' } );
        
        // define the "spacebar" key
        var spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // when spacebar is pressed, call the restart function
        spacebarKey.onDown.addOnce(this.restart, this);          
    },
    
    restart: function() {
        game.state.start('menu');
    },
    
};