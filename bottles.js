status = "";
objects = [];

function preload()
{
    img = loadImage('bottles.jpg');
}

function setup()
{
    canvas = createCanvas(640, 520);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
    
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(img, 0, 0, 640, 520);

    if(status != "")
{
    r = random(255);
    g = random(255);
    b = random (255);
    objectDetector.detect(img , gotResult);
    for (i = 0; i < objects.length; i++)
    {
        document.getElementById("status").innerHTML = "Status : Object Detected";
        document.getElementById("number_of_objects").innerHTML = "There are 12 big objects in the image from which cocossd model has detected " + objects.length + " objects.";

        fill(r, g, b);
        percent = floor(objects[i].confidence = 100);
        text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
    }
}

function back()
{
    window.location = 'index.html';
}