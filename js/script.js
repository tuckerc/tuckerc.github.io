"use strict";

let counter = 1;

const destinationSubmit = document.getElementById("destinationSubmit");
destinationSubmit.addEventListener("click", (e) => {
  e.stopPropagation();

  // get form inputs
  const destinationName = document.getElementById("destinationName");
  const location = document.getElementById("location");
  const photo = document.getElementById("photo");
  const description = document.getElementById("description");

  if (
    destinationName.value != "" &&
    destinationName.value != null &&
    location.value != "" &&
    location.value != null
  ) {
    // make new destination card
    const newDestinationCard = makeCard(
      photo,
      destinationName,
      location,
      description
    );

    // append new destination to destinationsContainer
    const destinationsContainer = document.getElementById(
      "destinationsContainer"
    );
    destinationsContainer.appendChild(newDestinationCard);

    // clear the form
    destinationName.value = "";
    location.value = "";
    photo.value = "";
    description.value = "";

    e.preventDefault();
  }
});

// function for making a new destination card
function makeCard(photo, destinationName, location, description) {
  // create new destination card
  const newDestinationCard = document.createElement("div");
  newDestinationCard.classList.add("card", "m-1");

  // card image
  const cardImg = document.createElement("img");
  cardImg.setAttribute("src", "https://picsum.photos/200?random=" + counter++);
  if (photo.value != "" && photo.value != null) {
    cardImg.setAttribute("src", photo.value);
  }
  cardImg.classList.add("card-img-top", "img-fluid", "border");
  cardImg.setAttribute("alt", description.value);
  newDestinationCard.appendChild(cardImg);

  // card body
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  const cardTitle = document.createElement("h5");
  cardTitle.textContent = destinationName.value;
  cardTitle.classList.add("card-title", "text-center");
  cardBody.appendChild(cardTitle);
  const cardSubTitle = document.createElement("h6");
  cardSubTitle.classList.add(
    "card-subtitle",
    "text-muted",
    "mb-2",
    "text-center"
  );
  cardSubTitle.textContent = location.value;
  cardBody.appendChild(cardSubTitle);
  const cardDescription = document.createElement("p");
  cardDescription.textContent = description.value;
  cardDescription.classList.add("card-text", "text-center");
  cardBody.appendChild(cardDescription);

  // button container
  const buttonContiner = document.createElement("div");
  buttonContiner.classList.add("d-flex", "justify-content-center");

  // update button
  const updateButton = document.createElement("a");
  updateButton.classList.add("btn", "btn-warning", "m-2");
  updateButton.textContent = "Update";
  updateButton.addEventListener("click", updateCardForm);
  buttonContiner.appendChild(updateButton);

  // delete button
  const deleteButton = document.createElement("a");
  deleteButton.classList.add("btn", "btn-danger", "m-2");
  deleteButton.textContent = "Remove";
  deleteButton.addEventListener("click", (e) => {
    const card = e.target.parentNode.parentNode.parentNode;
    card.parentNode.removeChild(card);
  });
  buttonContiner.appendChild(deleteButton);

  // append button container
  cardBody.appendChild(buttonContiner);

  // append card body
  newDestinationCard.appendChild(cardBody);

  return newDestinationCard;
}

// function for updating a card
function updateCardForm(e) {
  const thisCard = e.target.parentElement.parentElement.parentElement;
  const thisImage = thisCard.childNodes[0].cloneNode(true);
  const thisName = thisCard.childNodes[1].childNodes[0].cloneNode(true);
  const thisLocation = thisCard.childNodes[1].childNodes[1].cloneNode(true);
  const thisDescription = thisCard.childNodes[1].childNodes[2].cloneNode(true);
  const formContainer = document.getElementById("form-container");
  const tempForm = formContainer.childNodes[1].cloneNode(true);
  tempForm.classList.add("p-2");
  const tempUpdateButton = tempForm.childNodes[9].cloneNode(true);
  tempUpdateButton.textContent = "Update";
  tempUpdateButton.removeAttribute("id");
  tempUpdateButton.classList.remove("btn-primary");
  tempUpdateButton.classList.add("btn-warning");
  const oldFormButton = tempForm.childNodes[9];
  tempForm.replaceChild(tempUpdateButton, oldFormButton);
  const tempWrapper = document.createElement("div");
  tempWrapper.appendChild(tempForm);
  thisCard.innerHTML = tempWrapper.innerHTML;
  thisCard.children[0].children[2].children[1].value = thisImage.src;
  thisCard.children[0].children[0].children[1].required = false;
  thisCard.children[0].children[0].children[1].value = thisName.textContent;
  thisCard.children[0].children[1].children[1].required = false;
  thisCard.children[0].children[1].children[1].value = thisLocation.textContent;
  thisCard.children[0].children[3].children[1].value =
    thisDescription.textContent;

  // add event listener to new form update button
  const updateButton = thisCard.childNodes[0].childNodes[9];
  updateButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    // update image src if different
    const newImage = thisCard.children[0].children[2].children[1];

    // update name if different
    const newName = thisCard.children[0].children[0].children[1];

    // update location if different
    const newLocation = thisCard.children[0].children[1].children[1];

    // update description if different
    const newDescription = thisCard.children[0].children[3].children[1];

    const newCard = makeCard(newImage, newName, newLocation, newDescription);
    thisCard.innerHTML = newCard.innerHTML;
  });
}
