var dog,sadDog,happyDog;
var database,lastfed,foodobj,foods;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);

  database = firebase.database()
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodobj = new food()

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feeddog);

  addfood=createButton("Add Food");
  addfood.position(800,95);
  addfood.mousePressed(addfoods)

}

function draw() {
  background(46,139,87);
  drawSprites();

  fedtime = database.ref('feedtime');
  fedtime.on("value",function(data){
    lastfed = data.val();
  });


  fill(255,255,254);
  textSize(15);
  if(lastfed>=12){
    text("Last Feed : " + lastfed%12 + " PM",350,30);
   }else if(lastfed==0){
     text("Last Feed : 12 AM", 350 ,30)
   }else{
     text("Last Feed : " + lastfed + "AM", 350, 30);
   }

}

//function to read food Stock
function readfoodstock(data){

   foodstock = data.val()

}


//function to update food stock and last fed time
function feeddog(){
  dog.addImage(happyDog);

 foodobj.updatefoodstack(foodobj.getfoodstock()-1);
 database.ref('/').update({
   food:foodobj.getfoodstock(),
   feedtime:hour()
 }) 
}

//function to add food in stock

function addfoods(){
  foods++;
  database.ref('/').update({
  })
 }