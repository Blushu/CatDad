var loadState = {
    
    preload: function() {        
        // Add loading label to screen
        var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});

        // Load all assets
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
        game.load.spritesheet('catDad', 'assets/catDad_Sheet.png', 32, 32);
        game.load.spritesheet('cat', 'assets/CatSprite_Sheet.png', 18, 19);
        
        // Set Global Variables
        var score = 0;
        var scoreText;
        var jumped = false;
    },
    
    create: function() {
        // call the menu state
        game.state.start('menu');
    },
    
};