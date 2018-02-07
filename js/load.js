var loadState = {
    
    preload: function() {        
        // Add loading label to screen (x & y coordinates, text, style)
        var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});

        // Load all assets
        // Static images (give it a name, file source)
        game.load.image('sky', 'assets/sky.png');
        game.load.image('pizza', 'assets/Objects/pizza.png');
        game.load.image('bottomSidewalk', 'assets/Sidewalk/bottomWalk.png');
        game.load.image('topSidewalk', 'assets/Sidewalk/topWalk.png');
        game.load.image('trashCan', 'assets/Objects/trashCan.png');
        game.load.image('home', 'assets/Home.png');
        game.load.image('homeLedge', 'assets/Ledges/homeLedge.png');
        game.load.image('homeLedgeTop', 'assets/Ledges/homeLedgeTop.png');
        // Spritesheets (give it a name, file source, dimensions to cut up the spritesheet)
        game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
        game.load.spritesheet('catDad', 'assets/catDad_Sheet.png', 44, 64);
        game.load.spritesheet('cat', 'assets/CatSprite_Sheet.png', 36, 40);
        // Sounds (give it a name, file source)
        game.load.audio('background1', 'assets/audio/Set+Fire+to+Creation.mp3');
        game.load.audio('dadjump', 'assets/audio/breathing-jump.wav');
        game.load.audio('pizza', 'assets/audio/pizza.m4a');
        game.load.audio('dadcontrol', 'assets/audio/Ahem.wav');
        game.load.audio('dadbump', 'assets/audio/hum-long.wav');
        game.load.audio('catjump', 'assets/audio/Meow-jump.m4a');
        
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