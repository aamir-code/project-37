var dog,happyDog,database,dog1;
var FeedDrago;
var ADD;
var Food;
var foods;
var foodObj,foodStock;
var fedTime,lastFed;
var input,inpButton,greeting,DogName;
var bathroom,bedroom,garden;
var currentTime;
var ReadState;
var game;

function preload() {
    dog = loadImage("dogImg.png")
    happyDog = loadImage("dogImg1.png")
    bathroom = loadImage("Wash Room.png")
    bedroom = loadImage("Bed Room.png")
    garden = loadImage("Garden.png")

}
function setup() {
    createCanvas(750,350)
    database = firebase.database()

    foodStock = database.ref("Food");
    foodStock.on("value",readStock);

    ReadState = database.ref("gameState");
    ReadState.on("value",function(data){
        gameState = data.val()
    });

    foodObj = new Foodd()

    dog1 = createSprite(600,150,30,30);
    dog1.scale = 0.15;
    dog1.addImage(dog)

    ADD = createButton("More Food");
    ADD.position(700,95);
    ADD.mousePressed(addFoods)

    FeedDrago = createButton("Feed");
    FeedDrago.position(800,95);
    FeedDrago.mousePressed(feedDog)
  
    input = createInput("name");
    input.position(930,350);
    
    
    inpButton = createButton("Give");
    inpButton.position(930,370);
    inpButton.mousePressed(addName);

    

}

function draw() {
    background(200,2028,785);
    textSize(15)
    fill(0)
    

    fedTime = database.ref("FeedTime");
    fedTime.on("value",function(data){

        lastFed = data.val()
    })
    if(lastFed >= 12) {
        text("Last Fed :"+lastFed%12+"PM",350,30)

    }else if(lastFed==0) {
        text("Last Fed :12AM",350,30)

    }else{
        text("Last Fed :"+lastFed+"AM",350,30)
    }
    

    currentTime=hour();
    
    if(currentTime==(lastFed+1)) {
        foodObj.garden()
        text("playing",350,20);
        FeedDrago.hide();
        ADD.hide();
        dog1.hide();
        update("Playing");

    }else if(currentTime==(lastFed+2)) {
        foodObj.bedroom()
        text("sleeping",350,20);
        FeedDrago.hide();
        ADD.hide();
        dog1.hide();
        update("Sleeping");

    }else if(currentTime > (lastFed+2)&&currentTime <= (lastFed+3)) {
        foodObj.bathroom()
        text("bathing",350,20);
        FeedDrago.hide();
        ADD.hide();
        dog1.hide();
        update("Bathing");

    }else{
        update("Hungry");
        foodObj.display()
        
    }
    drawSprites();
    
}
function update(state){
    database.ref("/").update({
        gameState:state
    })
}
function readStock(data) {
    foods = data.val();
}

function feedDog() {
    dog1.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1)

    database.ref("/").update({
        Food:foodObj.getFoodStock(),
        FeedTime:hour()
    })
}
function addFoods() {
    foods++
    database.ref("/").update({
        Food:foods
    })
    foodObj.updateFoodStock(foodObj.getFoodStock()+1)

}
function addName() {
    input.hide();
    inpButton.hide();
    DogName = input.value()
    greeting = createElement("h3");
    greeting.html("My name is "+DogName);
    greeting.position(700,350);
}