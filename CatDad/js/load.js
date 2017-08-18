var loadState = {
    
    preload: function() {        
        // Add loading label to screen
        var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});

        // Load all assets
        game.load.image('sky', 'assets/sky.png');
        game.load.image('pizza', 'assets/Objects/pizza.png');
        game.load.image('bottomSidewalk', 'assets/Sidewalk/bottomWalk.png');
        game.load.image('topSidewalk', 'assets/Sidewalk/topWalk.png');
        game.load.image('trashCan', 'assets/Objects/trashCan.png');
        game.load.image('home', 'assets/Home.png');
        game.load.image('homeLedge', 'assets/Ledges/homeLedge.png');
        game.load.image('homeLedgeTop', 'assets/Ledges/homeLedgeTop.png');
        game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
        game.load.spritesheet('catDad', 'assets/catDad_Sheet.png', 44, 64);
        game.load.spritesheet('cat', 'assets/CatSprite_Sheet.png', 36, 40);
        
        // Set Global Variables
        var score = 0;
        var scoreText;
        var jumped = false;
    },
    
    init: function () {
            // scale the game 2x
            game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
            game.scale.setUserScale(1, 1);
            // enable crisp rendering
            game.renderer.renderSession.roundPixels = true;
            Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        },
    
    create: function() {
        // call the menu state
        game.state.start('menu');
    },
    
};