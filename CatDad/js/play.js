var playState = {
    
    create: function() {
        
        // update Global Variable for restart
        game.global.score = 0;
        game.global.scoreText = '';
        game.global.jumped = false;
        
        
        game.add.sprite(0, 0, 'sky');
        
        /*
        /*** STAGE ***
        // The platforms group contains the ground and the ledges we can jump on
        platforms = game.add.group();
        // We will enable physics for any object that is created in this group
        platforms.enableBody = true;
        // Here we create the ground, *** takes the position in x and y, and the name of an asset
        var ground = platforms.create(0, game.world.height - 64, 'ground');
        // Scale it to fit the width of the game (orgnl sprite is 400x32)
        ground.scale.setTo(2,2);
        // Stop the ground from falling away when jumped on
        ground.body.immovable = true;
        // Create 2 ledges
        var ledge = platforms.create( 400, 400, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;
        */
        
        
        /*** SIDEWALK ***/
        sidewalkBL = game.add.group();
        sidewalkBL.enableBody = true;
        for (i=0; i<60; i++) {
            var sidewalk = sidewalkBL.create(i*16, game.world.height-9, 'sideWalkBL');
            sidewalk.scale.setTo(2,2);
            sidewalk.body.immovable = true;
        }
        
        sidewalkTL = game.add.group();
        for (i=0; i<60; i++) {
            var sidewalk = sidewalkTL.create(i*16, game.world.height-18, 'sideWalkTL');
            sidewalk.scale.setTo(2,2);
        }
        
        /*** BUILDING ***/
        home = game.add.sprite(200, game.world.height - (273*2 + 16), 'home');
        home.scale.setTo(2,2);
        // BUILDING LEDGES
        homeLedges = game.add.group();
        homeLedges.enableBody = true;
        for (i=0; i<4; i++) {
            var homeLedge = homeLedges.create(210, game.world.height - (184 + i*120), 'homeLedge');
            homeLedge.scale.setTo(2,2);
            homeLedge.body.immovable = true;
        }
        
        /*** TRASH CAN ***/
        trashCans = game.add.group();
        trashCans.enableBody = true;
        for (i=0; i<1; i++) {
            var trashCan = trashCans.create(400, game.world.height - (20*2 + 16), 'trashCan');
            trashCan.scale.setTo(2,2);
            trashCan.body.immovable = true;
        }




        /*** PLAYER ***/
        player = game.add.sprite( game.world.width*0.8 - 16, game.world.height - 150, 'catDad' );
        game.physics.arcade.enable(player);
        player.body.gravity.y = 400;
        player.body.collideWorldBounds = true;
        player.animations.add( 'right', [2,3,4,5,6,7,8,9], 10, true );
        player.animations.add( 'left', [11,12,13,14,15,16,17], 10, true );
        player.scale.setTo(2,2);
        
        /*** CAT ***/
        cat = game.add.sprite( player.body.x + 64, game.world.height - 150, 'cat' );
        game.physics.arcade.enable(cat);
        cat.body.gravity.y = 400;
        cat.body.collideWorldBouncs = true;
        cat.animations.add('right', [2,3,4,5,6,7], 10, true);
        cat.animations.add('left', [8,9,10,11,12,13], 10, true);
        cat.scale.setTo(2,2);




        /*** STARS ***/
        // Create the stars group, add physics to the stars
        stars = game.add.group();
        stars.enableBody = true;

        // create 12 stars evenly spaced apart
        for (i = 0; i < 12; i++) {
            // create a star in the 'stars' group
            var star = stars.create(i*70, 0, 'star');

            // give them gravity so they fall
            star.body.gravity.y = 60;

            // Give each star a slightly random bounce value
            star.body.bounce.y = ( 0.7 + ( Math.random()*0.2 ) );
        }
        
        

        /*** BADGUYS ***/    
        badGuy = game.add.sprite(0, game.world.height - 150, 'baddie');
        game.physics.arcade.enable(badGuy);
        badGuy.body.gravity.y = 300;
        badGuy.body.collideWorldBounds = true;
        badGuy.animations.add('left', [0,1], 6, true);
        badGuy.animations.add('right', [2,3], 6, true);




        /*** SCORE ***/
        scoreText = game.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#000'});

    },
    
    update: function() {
        
        /*** CHECK FOR WIN ***/
        if (game.global.score == 120) {
            game.state.start('win');
        }
        
        
        /*** CONTROLLER ***/
        // this populates the cursors object with four properties: up, down, left, & right. All instances of Phaser.Key objects
        cursors = game.input.keyboard.createCursorKeys();

 
        /*** PLAYER ***/    
        // Collide the player with platforms
        //var hitPlatform = game.physics.arcade.collide(player, platforms);
        var hitsideWalkL = game.physics.arcade.collide(player, sidewalkBL);
        //var hitsideWalkR = game.physics.arcade.collide(player, sidewalkBR);
        var hittrashCan = game.physics.arcade.collide(player, trashCans);
        var hithomeLedge = game.physics.arcade.collide(player, homeLedges);
        

        if (cursors.left.isDown) {
            // Move Left, Animate Left
            player.body.velocity.x = -170;
            player.animations.play('left');
        }
        else if (cursors.right.isDown) {
            // Move Right, Animate Right
            player.body.velocity.x = 170;
            player.animations.play('right');
        }
        else if (player.body.velocity.x > 0) {
            player.body.velocity.x = 0;
            player.animations.stop();
            player.frame = 0;
        }
        else if (player.body.velocity.x < 0) {
            player.body.velocity.x = 0;
            player.animations.stop();
            player.frame = 1;       
        }
        
        // JUMP LOGIC 
        if (cursors.up.isUp) { game.global.jumped = false; }
        if (cursors.up.isDown && player.body.touching.down && (hitsideWalkL || hittrashCan || hithomeLedge) && game.global.jumped == false) {
            // velocity of 350 px/sec^2
            player.body.velocity.y = -350;
            game.global.jumped = true;
        }
        
        
        /*** CAT ***/
        // Collide cat with platforms
        game.physics.arcade.collide(cat, sidewalkBL);
        
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
        



        /*** STARS ***/    
        // Collide Stars with platforms
        game.physics.arcade.collide(stars, sidewalkBL);
        // check for star collision with the player, if found, pass player and star to the 'collectStar' function
        game.physics.arcade.overlap(player, stars, collectStar, null, this);
        
        function collectStar (player, star) {
            // Removes the star from the screen
            star.kill();

            // Increment and update the score
            game.global.score += 10;
            game.global.scoreText.text = 'Score: ' + game.global.score;
        }

        /*** BADGUYS ***/ 
        game.physics.arcade.collide(badGuy, sidewalkBL);
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