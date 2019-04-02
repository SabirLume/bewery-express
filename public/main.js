var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var heart = document.getElementsByClassName("fa-heart");
var trash = document.getElementsByClassName("fa-trash");

document.getElementById("submit").addEventListener("click", brew);

function brew(e) {
  e.preventDefault();
  let input = document.getElementById("input").value;
  fetch(`https://api.openbrewerydb.org/breweries?by_state=${input}`)
    .then(response => response.json())
    .then(res => {
      //looping through the list of brewerys and giving them a p element
      res.forEach(function(brewery) {
        // making container for description and make it equal to p element forEach response
        document.getElementById("p").innerHTML = brewery.name;
      });
    })
    .catch(err => {
      console.log(`error ${err}`);
    });
}

Array.from(thumbUp).forEach(function(element) {
  element.addEventListener("click", function() {
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const msg = this.parentNode.parentNode.childNodes[3].innerText;
    const thumbUp =
      parseFloat(this.parentNode.parentNode.childNodes[5].innerText) + 1;
    fetch("messagesUp", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        msg: msg,
        thumbUp: thumbUp
      })
    })
      .then(response => {
        if (response.ok) return response.json();
      })
      .then(data => {
        console.log(data);
        window.location.reload(true);
      });
  });
});
Array.from(thumbDown).forEach(function(element) {
  element.addEventListener("click", function() {
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const msg = this.parentNode.parentNode.childNodes[3].innerText;
    const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[9].innerText) +1 ;
    fetch("messagesDown", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        msg: msg,
        thumbDown: thumbDown
      })
    })
      .then(response => {
        if (response.ok) return response.json();
      })
      .then(data => {
        console.log(data);
        window.location.reload(true);
      });
  });
});

Array.from(heart).forEach(function(element) {
  element.addEventListener("click", function() {
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const msg = this.parentNode.parentNode.childNodes[3].innerText;
    const heart = parseFloat(this.parentNode.parentNode.childNodes[13].innerText) + 1;
    fetch("messagesHeart", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        msg: msg,
        heart: heart
      })
    })
      .then(response => {
        if (response.ok) return response.json();
      })
      .then(data => {
        console.log(data);
        window.location.reload(true);
      });
  });
});

Array.from(trash).forEach(function(element) {
  element.addEventListener("click", function() {
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const msg = this.parentNode.parentNode.childNodes[3].innerText;
    fetch("messages", {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        msg: msg
      })
    }).then(function(response) {
      window.location.reload();
    });
  });
});
