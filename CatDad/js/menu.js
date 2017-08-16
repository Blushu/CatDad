var menuState = {
    
    create: function() {
        // Game Title
        var nameLabel = game.add.text(80, 80, 'CatDad', { font: '50px Arial', fill: '#ffffff' } );
        // Instructions to start
        var startLabel = game.add.text(80, game.world.height-80, 'press the "W" key to start', { font: '25px Arial', fill: '#ffffff' } );
        
        // define the "W" key
        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        // when W is pressed, call teh start function
        wkey.onDown.addOnce(this.start, this);        
    },
    
    start: function() {
        game.state.start('play');
    },

};