//code logic

//click on start reset button
    //yes->Reload page
    //no->1->create random fruit
            //2->show trailleft box
            //3->change text reset game
let play=false;//initially whenn page loads we are not playing
let trialsleft;
let fruitsarray=['apple','banana','pear','pineapple','watermelon','kiwi','orange','cherry','strawberry'];
let step;
let action;//for setInteval function
$(function(){
    //click start game
    $("#startreset").click(function(){
        //we are palying
        if(play==true)
        location.reload();
        else{
            
            $("#gameover").hide();//hide gameover box if u were already playing


            play=true;//game initiated
            
            score=0;//set score to 0
            $("#scorevalue").html(score);

            $("#health").show();//diplay health box
            trialsleft=3;
            addheart();

            $("#startreset").html("Reset Game");//change button text to reset game

            sendFruit();
        }
    });

$("#fruitid").mouseover(function(){
    score++;
    $("#scorevalue").html(score);
    // document.getElementById("sound").play();
    $("#sound")[0].play();
    
    //stop fruit ans hide it
    clearInterval(action);
    $("#fruitid").hide("explode",500);//this type of hide() comes with jQuery UI

    //send new fruit
    setTimeout(sendFruit,500);

    

});

function addheart()//function to add heart
{
    $("#health").empty();
    for(i=0;i<trialsleft;i++)//add hearts to health box
            {
                $("#health").append('<img src="images/heart.png" class="heart">');
            }
}

function sendFruit()
{
    $("#fruitid").show();
    chooseFruit(); //generate random fruit
    $("#fruitid").css({'top': -50,'left': Math.round(500*Math.random())});  //generate random postion for fruit inside playarea

    //generate random step
    step=5+Math.round(5*Math.random());// we dont need 0 thats why we added 1

    //move down fruits 
    action=setInterval(function(){
        $("#fruitid").css('top',$("#fruitid").position().top+step);

        //check if fruit is too  low
        if($("#fruitid").position().top > $("#playarea").height())
        {
            //check if trail are left
            if(trialsleft>1)
            {
            $("#fruitid").show();
            chooseFruit(); //generate random fruit
            $("#fruitid").css({'top': -50,'left': Math.round(500*Math.random())});  //generate random postion for fruit inside playarea
        
            //generate random step
            step=5+Math.round(5*Math.random());// we dont need 0 thats why we added 1
            trialsleft--;
            addheart();
            }
            else{//gameover
                play=false;
                $("#startreset").html("Start Game");
                $("#gameover").show();
                $("#gameover").html('<p>Game Over!!!!!</p><p>Your Score is '+ score+'</p>');
               $("#health").hide();
                stopAction();
            }
        }
        
    },10); //fruit is going down by 1 step every 10 miliseconds

}

function chooseFruit()
{
    $("#fruitid ").attr('src','images/'+fruitsarray[Math.round(8*Math.random())]+'.png');
}

function stopAction(){//stop dropping fruit
    clearInterval(action);
    $("#fruitid").hide();
    }

});