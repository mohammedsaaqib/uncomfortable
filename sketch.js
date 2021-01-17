var dog;
var dogImg_normal,dogImg_happy;
var database;
var foodCount,foodStock;

function preload(){

   dogImg_normal=loadImage("Images/Dog.png");
   dogImg_happy=loadImage("Images/happy dog.png");
  }

//Function to set initial environment
function setup() {
  database = firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg_normal);
  dog.scale=0.15;

  foodStock = database.ref('Food');
  foodStock.on("value", function readStock(data){
    foodCount=data.val();
  })
 
}

// function to display UI
function draw() {
  background(46,139,87);
 
  if(keyWentDown(UP_ARROW)){
    if(foodCount<=0){
      foodCount=0;
    }else{
      foodCount=foodCount-1;
    } 
    database.ref('/').update({
      Food:foodCount
    })
    dog.addImage(dogImg_happy);
  }

  
  if(keyWentUp(UP_ARROW)){
    
    dog.addImage(dogImg_normal);
  }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodCount,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}
