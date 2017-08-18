var playState = {
    
    create: function() {
        
        // update Global Variable for restart
        game.global.score = 0;
        game.global.scoreText = '';
        game.global.jumped = false;
        game.global.facing = 'left';
        
        // Add background
        game.add.sprite(0, 0, 'sky');
        
        
        /*** SIDEWALK ***/
        // walkable sidewalk, bottom half
        bottomSidewalks = game.add.group();
        bottomSidewalks.enableBody = true;
        for (i=0; i<30; i++) {
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
        for (i=0; i<3; i++) {
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
        player.animations.add( 'left', [11,12,13,14,15,16,17], 10, true );
        
        
        
        /*** CAT ***/
        cat = game.add.sprite( player.body.x + 64, game.world.height - 150, 'cat' );
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
            var pizza = pizzas.create(i*70, 0, 'pizza');

            // give them gravity so they fall
            pizza.body.gravity.y = 60;

            // Give each pizza a slightly random bounce value
            pizza.body.bounce.y = ( 0.7 + ( Math.random()*0.2 ) );
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

    },
    
    update: function() {
        
        /*** CHECK FOR WIN ***/
        if (game.global.score == 12) {
            game.state.start('win');
        }
        
        
        /*** CONTROLLER ***/
        // this populates the cursors object with four properties: up, down, left, & right. All instances of Phaser.Key objects
        cursors = game.input.keyboard.createCursorKeys();

 
        /*** PLAYER ***/    
        // Collide the player with platforms
        var hitsideWalk = game.physics.arcade.collide(player, bottomSidewalks);
        var hittrashCan = game.physics.arcade.collide(player, trashCans);
        var hithomeLedge = game.physics.arcade.collide(player, homeLedges);
        
        // reset the player's velocity
        player.body.velocity.x = 0;
        
        if (cursors.left.isDown) {
            // Move Left, Animate Left
            player.body.velocity.x = -170;
            player.animations.play('left');
            game.global.facing = 'left';
        }
        else if (cursors.right.isDown) {
            // Move Right, Animate Right
            player.body.velocity.x = 170;
            player.animations.play('right');
            game.global.facing = 'right';
        }
        else if (game.global.facing === 'right') {
            player.animations.stop();
            player.frame = 0;
        }
        else if (game.global.facing === 'left') {
            player.animations.stop();
            player.frame = 1;       
        }
        
        // JUMP LOGIC 
        if (cursors.up.isUp) { game.global.jumped = false; }
        if (cursors.up.isDown && player.body.touching.down && (hitsideWalk || hittrashCan || hithomeLedge) && game.global.jumped == false) {
            // velocity of 350 px/sec^2
            player.body.velocity.y = -350;
            game.global.jumped = true;
        }
        
        
        /*** CAT ***/
        // Collide cat with platforms
        game.physics.arcade.collide(cat, bottomSidewalks);
        
        if ( player.body.x + 64 >= cat.body.x && player.body.x + 62 <= cat.body.x) {
            cat.body.velocity.x = 0;
            cat.animations.stop();
            cat.frame = 1;
        } else if ( player.body.x - 18 <= cat.body.x && player.body.x - 16 >= cat.body.x ) {
            cat.body.velocity.x = 0;
            cat.animations.stop();
            cat.frame = 0;
        } else if ( player.body.x + 84 < cat.body.x ) {
            cat.body.velocity.x = -140;
            cat.animations.play('left');
        } else if ( player.body.x - 38 > cat.body.x ) {
            cat.body.velocity.x = 140;
            cat.animations.play('right');
        }
        



        /*** PIZZAS ***/    
        // Collide pizzas with platforms
        game.physics.arcade.collide(pizzas, bottomSidewalks);
        game.physics.arcade.collide(pizzas, homeLedges);
        
        // check for pizza collision with the player, if found, pass player and pizza to the 'collectPizza' function
        game.physics.arcade.overlap(player, pizzas, collectPizza, null, this);
        
        function collectPizza (player, pizza) {
            // Removes the pizza from the screen
            pizza.kill();

            // Increment and update the score
            game.global.score++;
            game.global.scoreText.text = 'Pizza: ' + game.global.score + '/12';
        }

        /*** BADGUYS ***/ 
        game.physics.arcade.collide(badGuy, bottomSidewalks);
        if ( badGuy.body.x==0 && badGuy.body.touching.down ) {
            badGuy.body.velocity.x = 100;
            badGuy.animations.play('right');
        } else if (badGuy.body.x==(game.world.width - 32) && badGuy.body.touching.down) {
            badGuy.body.velocity.x = -100;
            badGuy.animations.play('left');
        }

        // Check for badGuy/player collision, if found, pass player and badGuy to gameOver function
        game.physics.arcade.overlap(player, badGuy, gameOver, null, this);
        
        function gameOver (player, badGuy) {
            game.state.start('gameOver');
        }
        
    },
    
};