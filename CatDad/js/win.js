var winState = {
    
    create: function() {    
        // Win Text
        var winLabel = game.add.text(80, 80, 'YOU WON!', { font: '50px Arial', fill: '#00FF00' } );
        // Explanation
        var fullLabel = game.add.text(80, 160, 'Cat is full and happy, \nand CatDad gains a sense of accomplishment...', { font: '25px Arial', fill: '#ffffff' } );
        // Instructions to start
        var startLabel = game.add.text(80, 520, 'press the spacebar to restart', { font: '25px Arial', fill: '#ffffff' } );
        
        // define the "spacebar" key
        var spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // when spacebar is pressed, call the restart function
        spacebarKey.onDown.addOnce(this.restart, this);   
    },
    
    restart: function() {
        game.state.start('menu');
    },
    
};