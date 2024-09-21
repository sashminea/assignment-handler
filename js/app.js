document.addEventListener("DOMContentLoaded", function () {
    // Data

    let username = "username";
    let about = "I am so cool.";
    let name = "Default";



    // Modals

    const addAssignment = new bootstrap.Modal('#addAssignment');
    const detailsAssignment = new bootstrap.Modal("#detailsAssignment")
    const editAssignment = new bootstrap.Modal('#editAssignment');
    const profileDetails = new bootstrap.Modal('#profileDetails');
    let detailsPfp = document.getElementById('detailsPfp');

    // Add Assignment

    const assignmentNameInput = document.getElementById('assignmentName');
    const assignmentPaymentInput = document.getElementById('paymentAmount');
    const assignmentDescription = document.getElementById('assignmentDescription');
    const detailsUser = document.getElementById('detailsUsername');
    const modalSubmit = document.getElementById('modal-submit');
    const assignmentHelp = document.querySelector('#assignmentHelp');
    const wordLimit = 20;
    let initialCardID = 0;

    // Workspace

    const cardContainer = document.getElementById('card-container');
    const myCardContainer = document.getElementById('myCards');

    // Workspace Card

    const cardTitle = document.getElementById('card-title');
    const cardText = document.getElementById('card-text');
    const cardDescription = document.getElementById('card-description');
    let assignmentList = [

    ];
    const inputCover = document.getElementById('input-cover');
    const coverPic = document.getElementById('cover-pic')
    let coverPicURL = 'https://semantic-ui.com/images/wireframe/image.png';

    const newCardCover = document.getElementById('newCardCover');
    const detailsCover = document.getElementById('detailsCover')

    // Modal Profile Settings Elements

    const profileSettings = new bootstrap.Modal('#staticBackdrop');
    const profileSave = document.getElementById('profileSave');
    const profileName = document.getElementById('profileName');
    const profileUserName = document.getElementById('profileUserName');
    const profileAbout = document.getElementById('profileAbout');
    const profileViewer = document.getElementById('profileViewer');
    const profileDetailsUsername = document.getElementById('profileDetailsUsername');
    const profileDetailsName = document.getElementById('profileDetailsName');
    const pfpInput = document.getElementById('pfp');
    const coverPfp = document.getElementById('coverPfp');
    let coverPfpURL = `https://static.wikia.nocookie.net/a6dd25e3-8f76-48be-84b9-1656e19682c7/scale-to-width/755`;

    // Edit Assignments

    const newAssignmentNameInput = document.getElementById('newAssignmentName');
    const newAssignmentPayInput = document.getElementById('newPaymentAmount');
    const newAssignmentDescription = document.getElementById('newDescription');
    const editCoverImage = document.getElementById('editCoverImage');
    const editCoverInput = document.getElementById('editCoverInput');
    const editSubmit = document.getElementById('edit-submit');
    const assignmentDeleter = document.getElementById('assignmentDeleter');

    // Nav Bar Profile Elements ( Profile Details )

    const namePlace = document.getElementById('namePlace');
    const usernamePlace = document.getElementById('usernamePlace');
    let navPfp = document.getElementById('navPfp');

    document.getElementById('addButton').addEventListener("click", () => {
        addAssignment.show();
    });

    inputCover.onchange = function cardCoverChanger() {
        const coverFile = inputCover.files[0];
        if (coverFile) {
            const coverUrl = URL.createObjectURL(coverFile);
            coverPic.style.backgroundImage = `url(${coverUrl})`;
            coverPic.style.backgroundColor = `white`;
            coverPicURL = coverUrl;
        }
    }

    pfpInput.onchange = function profilePictureChanger() {
        const pfpFile = pfpInput.files[0];
        if (pfpFile) {
            const pfpUrl = URL.createObjectURL(pfpFile);
            coverPfp.src = pfpUrl;
            coverPfpURL = pfpUrl;

        }
    }





    function createChild(AssValue, AssName, coverPicURL, username, initialCardID, currentDate, AssDescription) {



        let element = document.createElement("div");
        let dots = "";



        if (AssName.length > wordLimit) {
            dots = "...";
        }

        element.innerHTML = `<div id="assignmentCard" class="card" style="width: 18rem;">
            <img src="${coverPicURL}" style="height: 200px; object-fit: cover; background-position: center" id="newCardCover" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title" id="assignmentCardName">${AssName.slice(0, wordLimit)}${dots}</h5>
                <p class="card-text"><span class="fw-normal fs-6"><span class="usernamePlace">${usernamePlace.innerHTML}</span><br><span class="assignmentCardAmount">NRS ${AssValue}</span></span></p>
                <span id="cardID" style="display: none;">${initialCardID}</span>
                <span class="newModalDate" style="display: none" >${currentDate}</span>
                <span class="assignmentDescription" style="display: none" >${AssDescription}</span>
                <span class="d-flex flex-row justify-content-between align-items-center">
                    <a href="#" class="handleButton btn btn-success">Handle</a>
                    <a href="#" role="button" class="editButton p-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M19.09 14.441v4.44a2.37 2.37 0 0 1-2.369 2.369H5.12a2.37 2.37 0 0 1-2.369-2.383V7.279a2.356 2.356 0 0 1 2.37-2.37H9.56"/><path d="M6.835 15.803v-2.165c.002-.357.144-.7.395-.953l9.532-9.532a1.362 1.362 0 0 1 1.934 0l2.151 2.151a1.36 1.36 0 0 1 0 1.934l-9.532 9.532a1.361 1.361 0 0 1-.953.395H8.197a1.362 1.362 0 0 1-1.362-1.362M19.09 8.995l-4.085-4.086"/></g></svg></a>
                    
                    </span>
            </div>
        </div>`;

        let newAssignment = { name: AssName, price: AssValue, cover: coverPicURL, user: username, id: initialCardID, date: currentDate, desc: AssDescription };
        assignmentList.push(newAssignment);
        console.log(assignmentList);
        return element;
    }

    // Add Assignment Starts
    modalSubmit.addEventListener("click", function (e) {


        let newDate = new Date();
        let currentDate = new Date().toLocaleString();

        e.preventDefault();
        document.getElementsByClassName('recentHeader')[0].innerHTML = "Recently Added";
        if (assignmentNameInput.value.length < 1 || assignmentPaymentInput.value <= 1) {
            assignmentHelp.innerHTML = `Fill in the details.`;
            assignmentHelp.style.color = 'red';
        } else {
            assignmentHelp.innerHTML = `Recommended cover ratio is 3:2`;
            assignmentHelp.style.color = 'grey';




            const newCard = createChild(assignmentPaymentInput.value, assignmentNameInput.value, coverPicURL, username, initialCardID, currentDate, assignmentDescription.value);
            cardContainer.appendChild(newCard);




            const editButtons = Array.from(document.getElementsByClassName('editButton'))
            editButtons.forEach((element, index) => {
                console.log(username, assignmentList[index].user);

                if (username == assignmentList[index].user) {
                    element.style.display = "block";
                }
                else {
                    element.style.display = "none";
                }

            });


            const currentCardID = initialCardID; // Capture the current card ID for closure
            initialCardID++;

            // Handle Button Event
            newCard.querySelector('.handleButton').addEventListener("click", () => {
                detailsAssignment.show();
                document.getElementById('card-title').innerHTML = newCard.querySelector('.card-title').textContent;
                document.getElementById('card-text').innerHTML = newCard.querySelector('.assignmentCardAmount').textContent;
                document.getElementById('detailsCover').src = newCard.querySelector('.card-img-top').src;
                document.getElementById('detailsUsername').innerHTML = newCard.querySelector('.usernamePlace').textContent.slice(1);
                document.getElementById('modalDate').innerHTML = newCard.querySelector('.newModalDate').textContent;
                document.getElementById('card-description').innerHTML = newCard.querySelector('.assignmentDescription').textContent;

                console.log(newCard.querySelector('.newModalDate').textContent);
            });

            // Edit Button Event
            newCard.querySelector('.editButton').addEventListener('click', () => {
                editAssignment.show();


                // Set placeholders
                newAssignmentNameInput.placeholder = newCard.querySelector('.card-title').textContent;
                newAssignmentPayInput.placeholder = newCard.querySelector('.assignmentCardAmount').textContent;
                newAssignmentDescription.placeholder = newCard.querySelector('.assignmentDescription').textContent;
                editCoverImage.style.backgroundImage = `url(${newCard.querySelector('.card-img-top').src})`;
                console.log("hey ", newCard.querySelector('.card-img-top').src)

                editCoverInput.onchange = function () {
                    const newCoverFile = editCoverInput.files[0];
                    if (newCoverFile) {
                        const newCoverUrl = URL.createObjectURL(newCoverFile);
                        coverPicURL = newCoverUrl;
                        editCoverImage.style.backgroundImage = `url(${newCoverUrl})`;
                    }
                };

                editSubmit.onclick = function (event) {
                    event.preventDefault();
                    const newName = newAssignmentNameInput.value || assignmentNameInput.value;
                    const newPay = newAssignmentPayInput.value || assignmentPaymentInput.value;
                    const newCover = coverPicURL;
                    const newDesc = newAssignmentDescription.value || assignmentDescription.value;

                    assignmentList[currentCardID] = { name: newName, price: newPay, cover: newCover, user: username, id: currentCardID, desc: newDesc };

                    newCard.querySelector('.card-title').textContent = newName;
                    newCard.querySelector('.assignmentCardAmount').textContent = 'NRS ' + newPay;
                    newCard.querySelector('.card-img-top').src = newCover;
                    newCard.querySelector('.assignmentDescription').textContent = newDesc;
                    console.log(newDesc);
                    editAssignment.hide();
                };

                assignmentDeleter.onclick = function (event) {
                    editAssignment.hide();
                    newCard.style = `display: none`;
                }
            });



            addAssignment.hide();
        }
    });


    // let myNewCard;

    // console.log(assignmentList);
    // assignmentList.forEach((card, index) => {
    //     myNewCard = createChild(card.price, card.name, card.cover, card.user, card.id);
    //     myCardContainer.appendChild(myNewCard);
    // });

    // Handle Button Event
    // myNewCard.querySelector('.handleButton').addEventListener("click", () => {
    //     detailsAssignment.show();
    //     document.getElementById('card-title').innerHTML = myNewCard.querySelector('.card-title').textContent;
    //     document.getElementById('card-text').innerHTML = myNewCard.querySelector('.assignmentCardAmount').textContent;
    //     document.getElementById('detailsCover').src = myNewCard.querySelector('.card-img-top').src;
    //     document.getElementById('detailsUsername').innerHTML = myNewCard.querySelector('.usernamePlace').textContent.slice(1);;
    // });

    // Profile Update Starts
    profileSave.addEventListener('click', function (e) {
        usernamePlace.innerHTML = '@' + profileUserName.value;
        namePlace.innerHTML = profileName.value;
        username = profileUserName.value;
        name = profileName.value;
        about = profileAbout.value;
        profileSettings.hide();
        console.log(username);


        navPfp.src = coverPfpURL;
        detailsPfp.src = coverPfpURL;



        const editButtons = Array.from(document.getElementsByClassName('editButton'))
        editButtons.forEach((element, index) => {
            console.log(username, assignmentList[index].user, assignmentList);

            if (username == assignmentList[index].user) {
                element.style.display = "block";
            }
            else {
                element.style.display = "none";
            }

        });
    });

    profileViewer.addEventListener("click", (e) => {
        e.preventDefault();
        profileDetails.show();

        profileDetailsUsername.innerHTML = usernamePlace.textContent;
        profileDetailsName.innerHTML = namePlace.textContent;

    });
});
