// use official name (bootState) when defining the state
var bootState = {
    
    create: function() {
        // Enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
    
        game.state.start('load');
    },
    
};