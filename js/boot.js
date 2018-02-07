// use official name (bootState) when defining the state
var bootState = {
    
    create: function() {
        
        // Enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Call the loadstate
        game.state.start('load');
    },
    
};