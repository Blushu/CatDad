var winState = {
    
    create: function() {
        // Win Text
        var winLabel = game.add.text(80, 80, 'YOU WON!', { font: '50px Arial', fill: '#00FF00' } );
        // Instructions to start
        var startLabel = game.add.text(80, game.world.height-80, 'press the "W" key to restart', { font: '25px Arial', fill: '#ffffff' } );
        
        // define the "W" key
        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        // when W is pressed, call the start function
        wkey.onDown.addOnce(this.restart, this);        
    },
    
    restart: function() {
        game.state.start('menu');
    },
    
};