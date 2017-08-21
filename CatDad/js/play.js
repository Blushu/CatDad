var playState = {
    
    create: function() {
        
        // Set world bounds larger than the actual canvas       
        game.world.setBounds(0, 0, 1600, 1200);
        
        // update Global Variable for restart
        game.global.score = 0;
        game.global.scoreText = '';
        game.global.jumped = false;
        game.global.facing = 'left';
        game.global.control = 'dad';
        
        // Add background
        background = game.add.sprite(0, 0, 'sky');
        background.scale.setTo(2,2);
        
        
        
        /*** SIDEWALK ***/
        // walkable sidewalk, bottom half
        bottomSidewalks = game.add.group();
        bottomSidewalks.enableBody = true;
        for (i=0; i<60; i++) {
            var sidewalk = bottomSidewalks.create( (i*32 - 8), (game.world.height - 18), 'bottomSidewalk');
            sidewalk.body.immovable = true;
        }
        // decorative sidewalk, top half
        topSidewalks = game.add.group();
        for (i=0; i<60; i++) {
            var sidewalk = topSidewalks.create( (i*32 - 16), (game.world.height - 36), 'topSidewalk');
        }
        
        /*** BUILDING ***/
        home = game.add.sprite(200, game.world.height - (546 + 34), 'home');
        // BUILDING LEDGES
        homeLedges = game.add.group();
        homeLedges.enableBody = true;
        for (i=0; i<4; i++) {
            var homeLedge = homeLedges.create(210, game.world.height - (204 + i*120), 'homeLedge');
            homeLedge.body.immovable = true;
        }
        
        /*** TRASH CAN ***/
        trashCans = game.add.group();
        trashCans.enableBody = true;
        for (i=0; i<1; i++) {
            var trashCan = trashCans.create(400, game.world.height - (40 + 30), 'trashCan');
            trashCan.body.immovable = true;
        }




        /*** PLAYER ***/
        player = game.add.sprite( game.world.width*0.8 - 16, game.world.height - 150, 'catDad' );
        game.physics.arcade.enable(player);
        player.body.gravity.y = 400;
        player.body.collideWorldBounds = true;
        player.animations.add( 'right', [2,3,4,5,6,7,8,9], 10, true );
        player.animations.add( 'left', [10,11,12,13,14,15,16,17], 10, true );
        
        
        /*** CAT ***/
        cat = game.add.sprite( player.body.x + 44, game.world.height - 150, 'cat' );
        game.physics.arcade.enable(cat);
        cat.body.gravity.y = 400;
        cat.body.collideWorldBouncs = true;
        cat.animations.add('right', [2,3,4], 10, true);
        cat.animations.add('left', [5,6,7], 10, true);




        /*** PIZZAS ***/
        pizzas = game.add.group();
        pizzas.enableBody = true;
        // create 12 pizzas evenly spaced apart
        for (i = 0; i < 12; i++) {
            // create a pizza in the 'pizzas' group
            var pizza = pizzas.create(i*130 + 10, (game.world.height/2), 'pizza');
            // give them gravity so they fall
            pizza.body.gravity.y = 60;
            // Give each pizza a slightly random bounce value
            pizza.body.bounce.y = ( 0.2 + ( Math.random()*0.2 ) );
        }
        
        

        /*** BADGUYS ***/    
        badGuy = game.add.sprite(0, game.world.height - 150, 'baddie');
        game.physics.arcade.enable(badGuy);
        badGuy.body.gravity.y = 300;
        badGuy.body.collideWorldBounds = true;
        badGuy.animations.add('left', [0,1], 6, true);
        badGuy.animations.add('right', [2,3], 6, true);




        /*** SCORE ***/
        game.global.scoreText = game.add.text(16, 16, 'Pizza: 0/12', {fontSize: '32px', fill: '#000'});
        game.global.scoreText.fixedToCamera = true;
        game.global.scoreText.cameraOffset.setTo(16, 16);
    },
    
    
    
    
    update: function() {   
        
        /*** CHECK FOR WIN ***/
        if (game.global.score === 12) {
            game.state.start('win');
        }
        
        /*** PIZZAS ***/
        // Collide pizzas with platforms
        game.physics.arcade.collide(pizzas, bottomSidewalks);
        game.physics.arcade.collide(pizzas, homeLedges);
        game.physics.arcade.collide(pizzas, trashCans);
        game.physics.arcade.collide(badGuy, bottomSidewalks);
        
        
        
        
        
        
        /*** CONTROLLER ***/
        cursors = game.input.keyboard.createCursorKeys();
        
        spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        // allow one switch per key press
        if (spacebarKey.isUp) {game.global.controlSwitchable = true}
        
        // SWITCH BEGINS
        if (spacebarKey.isDown && game.global.controlSwitchable == true) {
            game.global.controlSwitchable = false; //disable switch until key is released
            switcher(game.global.control);
        }     
        
        function switcher(controller) {
            if (controller == 'dad') {
                game.global.control = 'cat'; //toggle controls to other character
            }
            else if (controller == 'cat') {
                game.global.control = 'dad'; //toggle controls to other character
            }
        }
        
        // assign controls to proper character each frame       
        if (game.global.control === 'dad') {
        
            game.camera.focusOn(player);
            controls(player, cat);
        }
        else if (game.global.control === 'cat') {
            
            game.camera.focusOn(cat);
            controls(cat, player);
        }
        
        
        
        
        
        
        
        
        
        
        
        

        function controls (leader, follower) {
            
            var hitsideWalk = game.physics.arcade.collide(leader, bottomSidewalks);
            var hittrashCan = game.physics.arcade.collide(leader, trashCans);
            var hithomeLedge = game.physics.arcade.collide(leader, homeLedges);
            game.physics.arcade.collide(follower, bottomSidewalks);
            
            leader.body.velocity.x = 0;
            
            if (cursors.left.isDown) {
                if (leader == cat) {
                    leader.body.velocity.x = -220;
                } else {
                    leader.body.velocity.x = -170;
                }
                leader.animations.play('left');
                game.global.facing = 'left';
            }
            else if (cursors.right.isDown) {
                if (leader == cat) {
                    leader.body.velocity.x = 220;
                } else {
                    leader.body.velocity.x = 170;
                }
                leader.animations.play('right');
                game.global.facing = 'right';
            }
            else if (game.global.facing === 'left') {
                leader.animations.stop();
                leader.frame = 1;       
            }
            else if (game.global.facing === 'right') {
                leader.animations.stop();
                leader.frame = 0;
            }
            
            // JUMP LOGIC 
            if (cursors.up.isUp) { game.global.jumped = false; }
            if (cursors.up.isDown && leader.body.touching.down && (hitsideWalk || hittrashCan || hithomeLedge) && game.global.jumped == false) {
                game.global.jumped = true;
                if (leader == cat) {
                    leader.body.velocity.y = -350;
                } else {
                    leader.body.velocity.y = -250;
                }
            }
            
            // measure distance between Follower and the Leader
            var distanceFromPlayer = ( follower.body.x - leader.body.x );

            // Follow the Leader
            if (cursors.left.isDown && (distanceFromPlayer > (leader.body.width + 10) ) ) {
                follower.body.velocity.x = -170;
                follower.animations.play('left');
            }
            else if (cursors.right.isDown && (distanceFromPlayer < -(follower.body.width +10) ) ) {
                follower.body.velocity.x = 170;
                follower.animations.play('right');
            }
            else {
                follower.animations.stop();
                follower.body.velocity.x = 0;
                if (distanceFromPlayer > (leader.body.width/2) ) {
                    follower.frame = 1;
                }
                else if (distanceFromPlayer + 36 < (leader.body.width/2) ) {
                    follower.frame = 0;
                }
            }
            
            // check for pizza collision with the player, if found, pass player and pizza to the 'collectPizza' function
            game.physics.arcade.overlap(leader, pizzas, collectPizza, null, this);

            function collectPizza (leader, pizza) {
                // Removes the pizza from the screen
                pizza.kill();

                // Increment and update the score
                game.global.score++;
                game.global.scoreText.text = 'Pizza: ' + game.global.score + '/12';
            }
            
            /*** BADGUYS ***/ 
            if ( badGuy.body.x == 0 && badGuy.body.touching.down ) {
                badGuy.body.velocity.x = 100;
                badGuy.animations.play('right');
            } else if (badGuy.body.x == (game.world.width - 32) && badGuy.body.touching.down) {
                badGuy.body.velocity.x = -100;
                badGuy.animations.play('left');
            }

            // Check for badGuy/leader collision, if found, pass leader and badGuy to gameOver function
            game.physics.arcade.overlap(leader, badGuy, gameOver, null, this);

            function gameOver (leader, badGuy) {
                game.state.start('gameOver');
            }
            
        }
        
    },
    
    
    

    render: function () {
        
    },  

    
};