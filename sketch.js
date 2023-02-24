let unicorn;
let uImg;
let tImg;
let bImg;
let trains = [];
let soundClassifier;

function preload() {
    const options = { probabilityThreshold: 0.95 };

    soundClassifier = ml5.soundClassifier("SpeechCommands18w", options);
    // uImg = loadImage("pragati.png");
    uImg = loadImage("unicorn gif.gif");
    // tImg = loadImage("train.png");
    tImg = loadImage("train green.gif");
    bImg = loadImage("background.jpg");
}

function setup() {
    createCanvas(1530, 740);
    unicorn = new Unicorn();
    soundClassifier.classify(gotCommand);
}

function gotCommand(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results[0].label, results[0].confidence);
    if (results[0].label == "up") {
        unicorn.jump();
    }
}

// function mousePressed() {
//     trains.push(new Train());
// }

function keyPressed() {
    if (key == " ") {
        unicorn.jump();
    }
}

function draw() {
    if (random(1) < 0.005) {
        trains.push(new Train());
    }

    background(bImg);
    for (let t of trains) {
        t.move();
        t.show();
        let score = 0;
        if (unicorn.hits(t)) {
            score += 0;
            console.log("Game Over!");
            noLoop();
        }
    }

    unicorn.show();
    unicorn.move();
}

// score += 1;
// document.querySelector(".scorenumber").textContent = score;