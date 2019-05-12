$(document).ready(function(){
    function question (text,answers,correct){
        this.text = text;
        this.answers = answers;
        this.correctAns = correct; //the index number of the correct answer in the answers array
        this.correct;
    }

    var questionCount;
    var correctAnswers;
    var incorrectAnswers;
    var questions;

    var q1 = new question("What was the name of the first Bond film?",["Dr. No", "Casino Royale", "On Her Majesty's Secret Service"], 0);
    var q2 = new question("Which was the first Bond film to star Pierce Brosnan?", ["Tomorrow Never Dies", "Die Another Day", "Goldeneye"], 2);
    var q3 = new question("Which Bond film is set primarily in Japan?", ["Octopussy", "You Only Live Twice", "Die Another Day"], 1);
    var q4 = new question("SPECTRE stands for Special Executive For Counter-Intelligence, Terrorism, Revenge and... what?", ["Extinction","Extortion","Examination"], 1);
    var q5 = new question("What does the “00” signify in 007?",["The rank of commander","A license to kill","A license to carry firearms"],1);
    var q6 = new  question("Who sang the title theme for Diamonds Are Forever?",["Rita Coolidge", "A-Ha", "Shirley Bassey"], 2);
    var q7 = new question("What famous landmark does Grace Jones jump from in A View to a Kill?", ["Big Ben", "The Eiffel Tower", "The Empire State Building"], 1);
    var q8 = new question("Which of the following is NOT a James Bond Villain", ["Le Chiffre", "Erst Stavro Blofeld", "Richmond Valentine", "Auric Goldfinger"],2);
    var q9 = new question("Which Bond film has recorded the biggest figure at the international box office?", ["Skyfall","Quantum of Solace", "Dr. No"], 0);
    var q10 = new question("Which of the following actors did NOT play James Bond", ["Sean Connery", "Idris Elba", "Daniel Craig"], 1);

    questions = [q1,q2,q3,q4,q5,q6,q7,q8,q9,q10];

    function postQuestion(){
        // using the current question count as an index, create question
        $("#question").text(questions[questionCount].text);

        // store index of correct answer
        var correctIndex = questions[questionCount].correctAns;
        

        // create answers in list
        for (answers in questions[questionCount].answers){
            console.log("correct index is "+correctIndex+", current index is " +answers);

            var newAnswer = $("<li>").text(questions[questionCount].answers[answers]);
            newAnswer.addClass("answer");

            // if the answer is the correct answer, add a class to track it
            if (answers == correctIndex){
                newAnswer.addClass("correct");
            }

            //append answer to list
            $("#answers").append(newAnswer);
        }
        // 
    }

    function startGame(){
        // initialize variables
        questionCount=0;
        correctAnswers=0;
        incorrectAnswers=0;
        postQuestion();
    }


    startGame();
})

