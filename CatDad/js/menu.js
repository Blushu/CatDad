var menuState = {
    
    create: function() {
        // Game Title
        var nameLabel = game.add.text(80, 80, 'CatDad', { font: '50px Arial', fill: '#ffffff' } );
        // Goal
        var goal = game.add.text(80, 160, 'Cat is hungry! Be a responsible CatDad \nby collecting Cat\'s favorite food, Pizza! \nWatch out for dogs...', { font: '25px Arial', fill: '#ffffff' } );
        // Controls
        var controls = game.add.text(80, 300, 'Use the arrow keys to move Left and Right \nUse the up arrow to Jump', { font: '25px Arial', fill: '#ffffff' } );
        // Instructions to start
        var startLabel = game.add.text(80, 520, 'press the spacebar to start', { font: '25px Arial', fill: '#ffffff' } );
        
        // define the "spacebar" key
        var spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // when spacebar is pressed, call the start function
        spacebarKey.onDown.addOnce(this.start, this);        
    },
    
    start: function() {
        game.state.start('play');
    },

};