document.addEventListener("DOMContentLoaded", function () {
    let username = "username";
    let about = "I am so cool.";
    let name = "Default";
    const defaultPfpURL = `https://static.wikia.nocookie.net/a6dd25e3-8f76-48be-84b9-1656e19682c7/scale-to-width/755`;

    const addAssignment = new bootstrap.Modal('#addAssignment');
    const detailsAssignment = new bootstrap.Modal("#detailsAssignment")
    const editAssignment = new bootstrap.Modal('#editAssignment');
    const profileDetails = new bootstrap.Modal('#profileDetails');
    let detailsPfp = document.getElementById('detailsPfp');
    let modalDetailsPfp = document.getElementById('modalDetailsPfp');
    modalDetailsPfp.src = defaultPfpURL;

    const assignmentNameInput = document.getElementById('assignmentName');
    const assignmentPaymentInput = document.getElementById('paymentAmount');
    const assignmentDescription = document.getElementById('assignmentDescription');
    const detailsUser = document.getElementById('detailsUsername');
    const modalSubmit = document.getElementById('modal-submit');
    const assignmentHelp = document.querySelector('#assignmentHelp');
    const wordLimit = 26;
    let initialCardID = 0;

    const cardContainer = document.getElementById('card-container');
    const myCardContainer = document.getElementById('myCards');

    const cardTitle = document.getElementById('card-title');
    const cardText = document.getElementById('card-text');
    const cardDescription = document.getElementById('card-description');
    let assignmentList = [];
    const inputCover = document.getElementById('input-cover');
    const coverPic = document.getElementById('cover-pic')
    let coverPicURL = 'https://semantic-ui.com/images/wireframe/image.png';

    const newCardCover = document.getElementById('newCardCover');
    const detailsCover = document.getElementById('detailsCover')

    const profileSettings = new bootstrap.Modal('#staticBackdrop');
    const profileSave = document.getElementById('profileSave');
    const profileName = document.getElementById('profileName');
    const profileUserName = document.getElementById('profileUserName');
    const profileAbout = document.getElementById('profileAbout');
    const profileViewer = document.getElementById('profileViewer');
    let profileDetailsUsername = document.getElementById('profileDetailsUsername');
    profileDetailsUsername.innerHTML = "@username"
    const profileDetailsName = document.getElementById('profileDetailsName');
    const pfpInput = document.getElementById('pfp');
    const coverPfp = document.getElementById('coverPfp');
    let coverPfpURL = defaultPfpURL;

    const newAssignmentNameInput = document.getElementById('newAssignmentName');
    const newAssignmentPayInput = document.getElementById('newPaymentAmount');
    const newAssignmentDescription = document.getElementById('newDescription');
    const editCoverImage = document.getElementById('editCoverImage');
    const editCoverInput = document.getElementById('editCoverInput');
    const editSubmit = document.getElementById('edit-submit');
    const assignmentDeleter = document.getElementById('assignmentDeleter');

    const namePlace = document.getElementById('namePlace');
    const usernamePlace = document.getElementById('usernamePlace');
    let navPfp = document.getElementById('navPfp');

    const tagContainer = document.getElementById('tag-container');
    const addTagButton = document.getElementById('addTagButton');
    let currentTag;
    const tagsContainter  = document.getElementById('tags-container');
    let tagList = [];
    let tagFlag = 0;
    const allowedTags = 1;
    let tagsNo = 0;
    let tagResetFlag = 9;
    let tagClick = 0;

    function addTag() {
        tagsNo++;
        const div = document.createElement('div');
        tagResetFlag = 0;
        div.classList.add('input-group', 'mb-3');

        div.innerHTML = `
            <input type="text" class="form-control tag" placeholder="Enter a tag here."
                   aria-label="Tag" id="newTag" aria-describedby="Tag">
            <button class="btn btn-outline-secondary tagRemover" type="button">Remove</button>
        `;

        addTagButton.style.opacity = '0';

        div.querySelector('.tagRemover').addEventListener('click', function () {
            div.remove();
            tagsNo--;
            tagResetFlag = 1;

            if (tagContainer.children.length === 0) {
                addTagButton.style.opacity = '100%';
                tagsNo = 0;
                tagFlag = 0;
            }
        });
        
        return div;
    }

    addTagButton.addEventListener('click', (e) => {
        if (tagsNo < allowedTags) {
            const newTag = addTag();
            tagContainer.appendChild(newTag);
        }
    });

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

    function createChild(AssValue, AssName, coverPicURL, username, initialCardID, currentDate, AssDescription, userPfpURL, tag) {
        let element = document.createElement("div");
        element.id = "assignmentCard";
        let dots = "";

        if(tagResetFlag === 1){
            tag = '';
        }

        if (AssName.length > wordLimit) {
            dots = "...";
        }

        element.innerHTML = `<div class="card" style="width: 20rem;">
            <img src="${coverPicURL}" style="height: 200px; object-fit: cover; background-position: center" id="newCardCover" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title" id="assignmentCardName">${AssName.slice(0, wordLimit)}${dots}</h5>
                <span class="card-full-title d-none">${AssName}</span>
                <p class="card-text d-flex flex-row gap-2">
                <span class="fw-normal fs-6  overflow-hidden">
                <img class="cardPfp" style="width: 44px;height: 44px;object-fit: cover; border-radius: 50%" src = "${userPfpURL}">
                </span>
                <span class="fw-normal fs-6">
                <span class="usernamePlace">${usernamePlace.innerHTML}</span><br>
                <span class="assignmentCardAmount">NRS ${AssValue}</span>
                </span>
                </p>
                <span id="cardID" style="display: none;">${initialCardID}</span>
                <span class="newModalDate" style="display: none" >${currentDate}</span>
                <span class="assignmentDescription d-none" style="" >${AssDescription}</span>
                <span class="assignmentTag d-none" style="" >${tag}</span>
                <span class="d-flex flex-row justify-content-between align-items-center">
                    <a href="#" class="handleButton btn btn-success">Handle</a>
                    <a href="#" role="button" class="editButton p-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M19.09 14.441v4.44a2.37 2.37 0 0 1-2.369 2.369H5.12a2.37 2.37 0 0 1-2.369-2.383V7.279a2.356 2.356 0 0 1 2.37-2.37H9.56"/><path d="M6.835 15.803v-2.165c.002-.357.144-.7.395-.953l9.532-9.532a1.362 1.362 0 0 1 1.934 0l2.151 2.151a1.36 1.36 0 0 1 0 1.934l-9.532 9.532a1.361 1.361 0 0 1-.953.395H8.197a1.362 1.362 0 0 1-1.362-1.362M19.09 8.995l-4.085-4.086"/></g></svg></a>
                </span>
            </div>
        </div>`;

        let newAssignment = { name: AssName, price: AssValue, cover: coverPicURL, user: username, id: initialCardID, date: currentDate, desc: AssDescription, userPfpURL: userPfpURL, tag: tag };
        assignmentList.push(newAssignment);

        return element;
    }

    function createTag(tag) {

        tagFlag = 0;
        let tagButton = document.createElement("div");
        tagButton.classList.add('tagElementParent');
        
       tagButton.innerHTML = `<div>
              <button type="button" class="btn btn-light tagElement">${tag}</button>
        </div>`;

        tagList.push(tag);

        return tagButton;
    }


    function activeIndicator(t) {
        t.classList.add('active');
        hideAllElseCards(t.innerHTML);
    }

    function inactiveIndicator(t) {
        t.classList.remove('active');
        showAllCards();
    }

    function hideAllElseCards(currentTag) {
        const cardList = document.querySelectorAll('#assignmentCard');
        for(let i = 0; i < cardList.length; i++) {
            if(cardList[i].querySelector('.assignmentTag').innerHTML !== currentTag){
                cardList[i].style.display = 'none';
            }
        }
    }

    function showAllCards() {
        const cardList = document.querySelectorAll('#assignmentCard');
        for(let i = 0; i < cardList.length; i++) {
            cardList[i].style.display = 'block';
        }
    }

    modalSubmit.addEventListener("click", function (e) {
        e.preventDefault();       

        function formatDate() {
            const months = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            let currentDate = new Date();
            let day = currentDate.getDate();
            let month = months[currentDate.getMonth()];
            let year = currentDate.getFullYear();

            let daySuffix;
            if (day === 1 || day === 21 || day === 31) {
                daySuffix = "st";
            } else if (day === 2 || day === 22) {
                daySuffix = "nd";
            } else if (day === 3 || day === 23) {
                daySuffix = "rd";
            } else {
                daySuffix = "th";
            }

            return `${day}${daySuffix} ${month} ${year}`;
        }

        let currentDate = formatDate();

        document.getElementsByClassName('recentHeader')[0].innerHTML = "Recently Added";

        if (assignmentNameInput.value.length < 1 || assignmentPaymentInput.value <= 1) {
            assignmentHelp.innerHTML = `Fill in the details.`;
            assignmentHelp.style.color = 'red';
        } else {
            let newTag = document.querySelectorAll('#newTag')

            newTag.forEach(tagInput => {
                if(tagsNo > 0) {
                    currentTag = tagInput.value;
                    tagFlag = 0;

                    for (let i = 0; i < tagList.length; i++) {
                        if (tagList[i] === currentTag) {
                            tagFlag = 1;
                        }
                    }

                    if (tagFlag === 0) {
                        tagsContainter.append(createTag(currentTag));
                        
                        const tagElements = document.querySelectorAll('.tagElement');
                        const clickCounts = {};

                        tagElements.forEach((tagElement, index) => {
                            clickCounts[index] = 0;

                            tagElement.addEventListener('click', (event) => {
                                clickCounts[index]++;

                                if (clickCounts[index] % 2 === 1) {
                                    activeIndicator(event.currentTarget);
                                } else {
                                    inactiveIndicator(event.currentTarget);
                                }
                            });
                        });
                    }
                }
            });
                         
            assignmentHelp.innerHTML = `Recommended cover ratio is 3:2`;
            assignmentHelp.style.color = 'grey';
        
            userPfpURL = coverPfpURL;
    
            const newCard = createChild(assignmentPaymentInput.value, assignmentNameInput.value, coverPicURL, username, initialCardID, currentDate, assignmentDescription.value, userPfpURL, currentTag);
            cardContainer.appendChild(newCard);

            const editButtons = Array.from(document.getElementsByClassName('editButton'))
            editButtons.forEach((element, index) => {
                if (username == assignmentList[index].user) {
                    element.style.display = "block";
                }
                else {
                    element.style.display = "none";
                }
            });

            const currentCardID = initialCardID;
            initialCardID++;

            newCard.querySelector('.handleButton').addEventListener("click", () => {
                detailsAssignment.show();
                document.getElementById('card-title').innerHTML = newCard.querySelector('.card-full-title').textContent;
                document.getElementById('card-text').innerHTML = newCard.querySelector('.assignmentCardAmount').textContent;
                document.getElementById('detailsCover').src = newCard.querySelector('.card-img-top').src;
                document.getElementById('detailsUsername').innerHTML = "@" + newCard.querySelector('.usernamePlace').textContent.slice(1);
                document.getElementById('modalDate').innerHTML = newCard.querySelector('.newModalDate').textContent;
                document.getElementById('card-description').innerHTML = newCard.querySelector('.assignmentDescription').textContent;

                const handleButtons = Array.from(document.getElementsByClassName('handleButton'))
                handleButtons.forEach((element, index) => {
                    if (document.getElementById('profileDetailsUsername').textContent === assignmentList[index].user) {
                        modalDetailsPfp.src = userPfpURL;
                    }
                    else {
                        modalDetailsPfp.src = newCard.querySelector('.cardPfp').src;
                    }
                });
            });

            newCard.querySelector('.editButton').addEventListener('click', () => {
                
                editAssignment.show();

                newAssignmentNameInput.placeholder = newCard.querySelector('.card-full-title').textContent;
                newAssignmentPayInput.placeholder = newCard.querySelector('.assignmentCardAmount').textContent;
                newAssignmentDescription.placeholder = newCard.querySelector('.assignmentDescription').textContent;
                editCoverImage.style.backgroundImage = `url(${newCard.querySelector('.card-img-top').src})`;
        
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

                    let dotsEdit = "";
                    if (newName.length > wordLimit) {
                        dotsEdit = "..."
                    }

                    newCard.querySelector('.card-full-title').textContent = newName;
                    newCard.querySelector('.card-title').textContent = newName.slice(0, wordLimit) + dotsEdit;
                    newCard.querySelector('.assignmentCardAmount').textContent = 'NRS ' + newPay;
                    newCard.querySelector('.card-img-top').src = newCover;
                    newCard.querySelector('.assignmentDescription').textContent = newDesc;

                    editAssignment.hide();
                };

                assignmentDeleter.onclick = function (event) {
                    editAssignment.hide();
                    newCard.remove();
                }
            });

            addAssignment.hide();
        }
    });

    profileSave.addEventListener('click', function (e) {
        usernamePlace.innerHTML = '@' + profileUserName.value;
        namePlace.innerHTML = profileName.value;
        username = profileUserName.value;
        profileDetailsUsername.innerHTML = '@' + profileUserName.value;
        name = profileName.value;
        about = profileAbout.value;
        profileSettings.hide();

        navPfp.src = coverPfpURL;
        detailsPfp.src = coverPfpURL;
        userPfpURL = coverPfpURL;

        const editButtons = Array.from(document.getElementsByClassName('editButton'))
        editButtons.forEach((element, index) => {
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