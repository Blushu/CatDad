var loadState = {
    
    preload: function() {        
        // Add loading label to screen
        var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});

        // Load all assets
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('sideWalkTL', 'assets/Sidewalk/TopL.png');
        game.load.image('sideWalkTR', 'assets/Sidewalk/TopR.png');
        game.load.image('sideWalkBL', 'assets/Sidewalk/bottomL.png');
        game.load.image('sideWalkBR', 'assets/Sidewalk/bottomR.png');
        game.load.image('trashCan', 'assets/Objects/trashCan.png');
        game.load.image('home', 'assets/Home.png');
        game.load.image('homeLedge', 'assets/Ledges/homeLedge.png');
        game.load.image('homeLedgeTop', 'assets/Ledges/homeLedgeTop.png');
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