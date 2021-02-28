function ageindays() {
    var today = new Date();
    var year = today.getFullYear();
    var useryear = prompt("Enter your birth year?");
    var age = (year - useryear) * 365;
    var element = document.createElement("h1");
    var div = document.getElementById("ageindays");
    var result = "You are " + age + " days old";
    div.appendChild(element).textContent = result;
    div.appendChild(element).style.color = 'blue';

}

function reset() {
    document.getElementById("ageindays").innerHTML = null;
}

function generatecat() {
    let image = document.createElement("img");
    let div = document.getElementById("generatecat");
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif";
    image.width = 300;
    image.height = 300;
    div.appendChild(image);
}