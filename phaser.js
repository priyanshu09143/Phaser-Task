// Create a new Game Scene
let gameScene = new Phaser.Scene("Game")

// Load Assets files

gameScene.preload = function () {
    this.load.image("background", "assets/background.jpg")
    this.load.image("ball", "assets/ball.png")
    this.load.audio('bounce', 'assets/bounce.mp3');
  
}

let btn = document.querySelector("#btn")
let showList = document.querySelector("#show")
let session = document.querySelector("#sID")
let sTime = document.querySelector("#sTime")
let eTime = document.querySelector("#eTime")
let Data = []
// Initialize the game
gameScene.create = function () {
    this.add.sprite(400, 300, "background");
    let ball = this.add.sprite(400, 514, "ball");
    ball.setScale(0.1);

    let counterText = this.add.text(400, 100, 'Counter: ', { fill: '#ffffff' });
    counterText.setOrigin(0.5);
    let tween;
    let timer; 
    function startAnimationAndCounter() {
        let audio = new Audio('assets/bounce.mp3');
        let startTime = new Date()
        let counterValue = Phaser.Math.Between(30, 120);
        counterText.setText('Counter: ' + counterValue);
        let charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let sessionId = '';
        for (let i = 0; i < 10; i++) {
            let randomIndex = Math.floor(Math.random() * charset.length);
            sessionId += charset[randomIndex];
        }
        

        ball.setPosition(400, 514)
        // Start animation
        tween = gameScene.tweens.add({
            targets: ball,
            y: 250,
            duration: 1000,
            ease: 'Power2',
            yoyo: true,
            repeat: counterValue,
            repeatDelay: 0,
            onUpdate : function(){
                if(ball.y === 514) audio.play()
            }
        });

        // Start counter
        timer = gameScene.time.addEvent({
            callback: function () {
                if (counterValue > 0) {
                    counterValue--;
                    counterText.setText('Counter: ' + counterValue);
                }
                if (counterValue === 0) {
                    timer.remove(false); // Stop the timer when the counter reaches 0
                    tween.stop(); // Stop the animation when the counter reaches 0
                    let stopTime = new Date();
                    session.innerHTML = sessionId
                    sTime.innerHTML = (`${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString()} `);
                    eTime.innerHTML = (`${stopTime.toLocaleDateString()} ${stopTime.toLocaleTimeString()} `);
                    Data.push({
                        sessionId,
                        startTime,
                        stopTime
                    })
                    if (document.getElementById("list")){
                        let tr = document.createElement("tr")
                        let td1 = document.createElement("td")
                        let td2 = document.createElement("td")
                        let td3 = document.createElement("td")
                        td1.innerHTML = sessionId
                        td2.innerHTML = startTime
                        td3.innerHTML = stopTime
                        tr.appendChild(td1)
                        tr.appendChild(td2)
                        tr.appendChild(td3)
                        list.appendChild(tr)
                        document.body.appendChild(document.querySelector("#list"))
                    }
                    
                }
            },
            delay: 1000,
            callbackScope: gameScene,
            loop: true
        });
    }
    btn.onclick = () => {
        startAnimationAndCounter()
    }
}
function createList() {
    console.log(!document.getElementById("list"))
    if (!document.getElementById("list")){
        let list = document.createElement("table")
        list.setAttribute("id", "list")
        let tr = document.createElement("tr")
        let th1 = document.createElement("th")
        let th2 = document.createElement("th")
        let th3 = document.createElement("th")
        th1.innerHTML = "Session ID"
        th2.innerHTML = "Start Time"
        th3.innerHTML = "End Time"
        tr.appendChild(th1)
        tr.appendChild(th2)
        tr.appendChild(th3)
        list.appendChild(tr)
   
    Data.forEach((element, index) => {
        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        td1.innerHTML = element.sessionId
        td2.innerHTML = element.startTime
        td3.innerHTML = element.stopTime
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        list.appendChild(tr)
    });
    document.body.appendChild(list)
}

}

show.onclick = () => {
    createList()
}
// Set the configuration of the game

let Config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 }, // Set gravity to make the ball fall
            debug: false // Set to true for debugging physics
        }
    },
    scene: gameScene
}

// Create a new game, pass the configuration

let game = new Phaser.Game(Config)