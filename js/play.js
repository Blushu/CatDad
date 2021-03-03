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

    /*** AUDIO ***/    
        // Add Audio (nickname, volume 0-1, looping defaults false)
        music = game.add.audio('background1', 0.6, true);
        dadjumpsound = game.add.audio('dadjump');
        dadcontrolsound = game.add.audio('dadcontrol');
        dadbumpsound = game.add.audio('dadbump');
        catjumpsound = game.add.audio('catjump');
        pizzasound = game.add.audio('pizza', 0.8);
        
        // Play background Music
        music.play();
        
    /*** ENVIRONMENT ***/
        
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




    /*** PLAYERS ***/
        /*** DAD ***/
        dad = game.add.sprite( game.world.width*0.8 - 16, game.world.height - 150, 'catDad' );
        game.physics.arcade.enable(dad);
        dad.body.gravity.y = 400;
        dad.body.collideWorldBounds = true;
        dad.animations.add( 'right', [2,3,4,5,6,7,8,9], 10, true );
        dad.animations.add( 'left', [10,11,12,13,14,15,16,17], 10, true );
        
        
        /*** CAT ***/
        cat = game.add.sprite( dad.body.x + 44, game.world.height - 150, 'cat' );
        game.physics.arcade.enable(cat);
        cat.body.gravity.y = 400;
        cat.body.collideWorldBounds = true;
        cat.animations.add('right', [2,3,4], 10, true);
        cat.animations.add('left', [5,6,7], 10, true);


        
        

    /*** COLLECTABLES ***/
        /*** PIZZAS ***/
        pizzas = game.add.group();
        pizzas.enableBody = true;
        // create 12 pizzas evenly spaced apart
		pizza_count = 10;
        for (i = 0; i < pizza_count; i++) {
            // create a pizza in the 'pizzas' group
			var drop_height = (i == 2) ? (game.world.height/2) : (game.world.height/10);
			
			console.log(drop_height);
			
            var pizza = pizzas.create(i*130 + 10, drop_height, 'pizza');
            // give them gravity so they fall
            pizza.body.gravity.y = 80;
            // Give each pizza a slightly random bounce value
            pizza.body.bounce.y = ( 0.2 + ( Math.random()*0.2 ) );
        }
        
        
        
        
        
    /*** ENEMIES ***/
        /*** DOG ***/    
        dog = game.add.sprite(0, game.world.height - 150, 'baddie');
        game.physics.arcade.enable(dog);
        dog.body.gravity.y = 300;
        dog.body.collideWorldBounds = true;
        dog.animations.add('left', [0,1], 6, true);
        dog.animations.add('right', [2,3], 6, true);



    /*** PLAYER DATA ***/
        /*** SCORE ***/
        game.global.scoreText = game.add.text(16, 16, 'Pizza: 0/' + pizza_count, {fontSize: '32px', fill: '#000'});
        game.global.scoreText.fixedToCamera = true;
        game.global.scoreText.cameraOffset.setTo(16, 16);
    },
    
    
    
    
    
    
    
    
    
    
    
    update: function() {   
        
    /*** CHECK FOR WIN ***/
        if (game.global.score === pizza_count) {
			music.destroy();
			game.state.start('win');
        }
        
    /*** GENERAL COLLISIONS ***/
        // Collide pizzas with platforms
        game.physics.arcade.collide(pizzas, bottomSidewalks);
        game.physics.arcade.collide(pizzas, homeLedges);
        game.physics.arcade.collide(pizzas, trashCans);
        // Collide dog with sidewalk
        game.physics.arcade.collide(dog, bottomSidewalks);
        
        
        
        
        
        
        
    /*** INPUT ***/
        cursors = game.input.keyboard.createCursorKeys(); //movement
        spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //switch character
        
    /*** SWITCH FUNCTIONALITY ***/
        if (spacebarKey.isUp) {game.global.controlSwitchable = true} //allow one switch per key press
        
        // Check for switchability
        if (spacebarKey.isDown && game.global.controlSwitchable == true) {
            game.global.controlSwitchable = false; //disable switch until key is released
            switcher(game.global.control);
        }     
        
        // Do the actual switch
        function switcher(controller) {
            switch(controller) {
                case 'dad': game.global.control = 'cat'; break;
                case 'cat': game.global.control = 'dad';
            }
        }
        
        // assign controls to proper character each frame 
        switch(game.global.control) {
            case 'dad':
                game.camera.focusOn(dad);
                controls(dad, cat);
                break;
            case 'cat':
                dadcontrolsound.play();
                game.camera.focusOn(cat);
                controls(cat, dad);
                break;
        }
        
        
    /*** CONTROLS ***/
        function controls (leader, follower) {
            
            // collide with platforms, variables used for jumping
            var hitsideWalk = game.physics.arcade.collide(leader, bottomSidewalks);
            var hittrashCan = game.physics.arcade.collide(leader, trashCans);
            var hithomeLedge = game.physics.arcade.collide(leader, homeLedges);
            // only the leader can climb the platforms
            game.physics.arcade.collide(follower, bottomSidewalks);
            
            leader.body.velocity.x = 0;
            
        // MOVEMENT L & R
            if (cursors.left.isDown) {
                switch (leader) {
                    case dad: leader.body.velocity.x = -220; break;
                    case cat: leader.body.velocity.x = -170;              
                }
                leader.animations.play('left');
                game.global.facing = 'left';
            }
            else if (cursors.right.isDown) {
                switch (leader) {
                    case dad: leader.body.velocity.x = 220; break;
                    case cat: leader.body.velocity.x = 170;              
                }
                leader.animations.play('right');
                game.global.facing = 'right';
            }
            else {
                leader.animations.stop();
                switch (game.global.facing) {
                    case 'left': leader.frame = 1; break;
                    case 'right': leader.frame = 0;
                }
            }
            
             // measure distance between Follower and the Leader
            var distanceFromLeader = ( follower.body.x - leader.body.x );

        // FOLLOW THE LEADER
            if (cursors.left.isDown && (distanceFromLeader > (leader.body.width + 10) ) ) {
                follower.animations.play('left');
                switch (leader) {
                    case dad: follower.body.velocity.x = -220; break;
                    case cat: follower.body.velocity.x = -170;              
                }
            }
            else if (cursors.right.isDown && (distanceFromLeader < -(follower.body.width +10) ) ) {
                follower.animations.play('right');
                switch (leader) {
                    case dad: follower.body.velocity.x = 220; break;
                    case cat: follower.body.velocity.x = 170;              
                }
            }
            // FACE THE LEADER
            else {
                follower.animations.stop();
                follower.body.velocity.x = 0;
                if (distanceFromLeader > (leader.body.width/2) ) {
                    follower.frame = 1;
                }
                else if (distanceFromLeader + 36 < (leader.body.width/2) ) {
                    follower.frame = 0;
                }
            }
            
        // JUMP LOGIC 
            if (cursors.up.isUp) { game.global.jumped = false; } // allow one jump per key press
            if (cursors.up.isDown && leader.body.touching.down && (hitsideWalk || hittrashCan || hithomeLedge) && game.global.jumped == false) {
                game.global.jumped = true;
                switch (leader) {
                    case dad: 
                        leader.body.velocity.y = -250; 
                        dadjumpsound.play();
                        break;
                    case cat:
                        leader.body.velocity.y = -350;
                        catjumpsound.play();
                        break;
                }
            }
            
           
            
        // check for pizza collision with the leader, if found, pass leader and pizza to the 'collectPizza' function
            game.physics.arcade.overlap(leader, pizzas, collectPizza, null, this);

            function collectPizza (leader, pizza) {
                // Removes the pizza from the screen
                pizza.kill();
                pizzasound.play();

                // Increment and update the score
                game.global.score++;
                game.global.scoreText.text = 'Pizza: ' + game.global.score + '/' + pizza_count;
            }
            
        /*** DOG MOVEMENT ***/
            if ( dog.body.x == 0 && dog.body.touching.down ) {
                dog.body.velocity.x = 100;
                dog.animations.play('right');
            } else if (dog.body.x == (game.world.width - 32) && dog.body.touching.down) {
                dog.body.velocity.x = -100;
                dog.animations.play('left');
            }
            
        /*** CHECK FOR GAMEOVER ***/
            // Check for dog/leader collision, if found, pass leader and dog to gameOver function
            game.physics.arcade.overlap(leader, dog, gameOver, null, this);

            function gameOver (/*leader, dog*/) {
                music.destroy();
                game.state.start('gameOver');
            }

            
            
        }
        
    },
    
/*
    render: function () {
        
    },  
*/

    
};