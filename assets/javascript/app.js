$(document).ready(function(){
    function question (text,answers,correct, answerText){
        this.text = text;
        this.answers = answers;
        this.correctAns = correct; //the index number of the correct answer in the answers array
        this.answerText = answerText;
        this.correct;
    }

    var questionCount;
    var correctAnswers;
    var incorrectAnswers;
    var questions;
    var time;
    var speed;
    var countSpeed;

    var q1 = new question("What was the name of the first Bond film?",["Dr. No", "Casino Royale", "On Her Majesty's Secret Service"], 0, "Dr. No, the first Bond film, was released in 1962");
    var q2 = new question("Which was the first Bond film to star Pierce Brosnan?", ["Tomorrow Never Dies", "Die Another Day", "Goldeneye"], 2, "Pierce Brosnan made his first appearance as 007 in 1995's Goldeneye");
    var q3 = new question("Which Bond film is set primarily in Japan?", ["Octopussy", "You Only Live Twice", "Die Another Day"], 1, "Most of the film You Only Live Twice was shot in Japan between 1966 & 1967");
    var q4 = new question("SPECTRE stands for Special Executive For Counter-Intelligence, Terrorism, Revenge and... what?", ["Extinction","Extortion","Examination"], 1, "SPECTRE stands for Special Executive For Counter-Intelligence, Terrorism, Revenge, and Extortion");
    var q5 = new question("What does the 00 signify in 007?",["The rank of commander","A license to kill","A license to carry firearms"],1, "The 00 represents a license to kill. The 7 means Bond was the 7th agent to receive this title");
    var q6 = new  question("Who sang the title theme for Diamonds Are Forever?",["Rita Coolidge", "A-Ha", "Shirley Bassey"], 2, "Shirley Bassey sang the title song for 3 Bond films");
    var q7 = new question("What famous landmark does Grace Jones jump from in A View to a Kill?", ["Big Ben", "The Eiffel Tower", "The Empire State Building"], 1, "Grace Jones lept from the Eiffel Tower in the 1985 Bond film");
    var q8 = new question("Which of the following is NOT a James Bond Villain", ["Le Chiffre", "Erst Stavro Blofeld", "Richmond Valentine", "Auric Goldfinger"],2, "Richmond Valentine was the headlining villain from the Kingsmen francise");
    var q9 = new question("Which Bond film has recorded the biggest figure at the international box office?", ["Skyfall","Quantum of Solace", "Dr. No"], 0, "2012 Skyfall netted 1.1 billon dollars at the box office");
    var q10 = new question("Which of the following actors did NOT play James Bond", ["Sean Connery", "Idris Elba", "Daniel Craig"], 1, "Though rumored to be the next Bond, Idris Elba has never been awarded the role.");

    questions = [q1,q2,q3,q4,q5,q6,q7,q8,q9,q10];

    function postQuestion(){

        //empty answers
        $("#answers").empty();

        // using the current question count as an index, create question
        $("#question").text(questions[questionCount].text);

        // store index of correct answer
        var correctIndex = questions[questionCount].correctAns;
        

        // create answers in list
        for (answers in questions[questionCount].answers){

            var newAnswer = $("<li>").text(questions[questionCount].answers[answers]);
            newAnswer.addClass("answer");

            // if the answer is the correct answer, add a class to track it
            if (answers == correctIndex){
                newAnswer.addClass("correct");
            } else {
                newAnswer.addClass("incorrect");
            }

            //append answer to list
            $("#answers").append(newAnswer);
        }

        // add on click functionality
        $(".correct").on("click", function(){
            correctAnswers++;
            $(".correct").off();
            $(".incorrect").off();

            if(correctAnswers == 5){
                clearInterval(countSpeed);
                $("#snip").trigger("play");
                $("#question").text("CONGRATULATIONS! You disabled the bomb. You've lived to die another day");
                $("#answers").empty();
                $("#timer").text("--:--");
                $("#win").trigger("play"); 

            } else{
                $("#question").text("CORRECT! "+ questions[questionCount].answerText);
                setTimeout(postQuestion, 5000);
                questionCount++;
                $("#snip").trigger("play");    
            }
           
        })

        $(".incorrect").on("click", function(){
            incorrectAnswers++;
            $(".correct").off();
            $(".incorrect").off();

            if(incorrectAnswers == 5){
                clearInterval(countSpeed);
                $("#question").text("Better luck next time, Bond.");
                $("#answers").empty();
                $("#timer").text("00:00");
                $("#explode").trigger("play"); 

            } else {
                $("#question").text("WRONG! "+ questions[questionCount].answerText);
                setTimeout(postQuestion, 5000);
                questionCount++;
                speed= speed*3/4;
                $("#zap").trigger("play");
                startTime();                
            }

        })
            
    }

    function timeConverter(t) {

        //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
      
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
      
        if (minutes === 0) {
          minutes = "00";
        }
      
        else if (minutes < 10) {
          minutes = "0" + minutes;
        }
      
        return minutes + ":" + seconds;
    }

    function startTime(){
        clearInterval(countSpeed);
        console.log(speed);
        var mils = speed*1000;
        countSpeed = setInterval(countDown, mils);
    }

    function countDown(){
        time--;
        var convTime = timeConverter(time);
        $("#timer").text(convTime);
        $("#beep").trigger("play");
    };

    function startGame(){
        // initialize variables
        questionCount=0;
        correctAnswers=0;
        incorrectAnswers=0;
        time = 180;
        speed = 1;

        $("#timer").html("3:00");

        $("#question").html("You have three minutes to diffuse the bomb above by snipping 5 of 10 wires.<br> Snip wires by correctly answering the following questions. <br> Incorrect answers will cause the bomb's timer to speed up. <br>GOOD LUCK!");
        
        var startButton = $("<button>");
        startButton.text("START");
        startButton.on("click", function(){
            $("#die").trigger("play");
            postQuestion();
            startTime();
        });
        $("#answers").append(startButton);
    }


    startGame();
})

