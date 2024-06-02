document.addEventListener("DOMContentLoaded", function () {

    const addAssignment = new bootstrap.Modal('#addAssignment');
    const detailsAssignment = new bootstrap.Modal("#detailsAssignment")
    const assignmentNameInput = document.getElementById('assignmentName');
    const assignmentPaymentInput = document.getElementById('paymentAmount');
    const modalSubmit = document.getElementById('modal-submit');
    const cardContainer = document.getElementById('card-container');
    const assignmentHelp = document.querySelector('#assignmentHelp');
    const cardTitle = document.getElementById('card-title');
    const cardText = document.getElementById('card-text');
    const assignmentList = [];
    const inputCover = document.getElementById('input-cover');
    const coverPic = document.getElementById('cover-pic')
    let coverPicURL = 'https://semantic-ui.com/images/wireframe/image.png';
    let isCover = false;
    const wordLimit = 20;
    const newCardCover = document.getElementById('newCardCover');
    const detailsCover = document.getElementById('detailsCover')


    inputCover.onchange = function cardCoverChanger() {

        const coverFile = inputCover.files[0];

        if (coverFile) {
            const coverUrl = URL.createObjectURL(coverFile);
            coverPic.style.backgroundImage = `url(${coverUrl})`
            coverPic.style.backgroundColor = `white`
            isCover = true;
            coverPicURL = coverUrl;

            console.log(inputCover.files[0], inputCover.files[1]);

        }
    }



    function createChild(AssValue, AssName) {
        let element = document.createElement("div");

        let dots = "";

        if (AssName.length > wordLimit) {
            dots = "...";
        }


        element.innerHTML = `<div id="assignmentCard" class="card" style="width: 18rem;">
        <img src="${coverPicURL}" style="height: 200px; object-fit: cover; background-position: center" id = "newCardCover" class="card-img-top" alt="...">    
        <div class="card-body">
            
                <h5 class="card-title" id="assignmentCardName">${AssName.slice(0, wordLimit)}${dots}</h5>
                <p class="card-text">NRS ${AssValue}</p>
                <a href="#" class = "handleButton btn btn-success">Handle</a>
            </div>
        </div>`
        let newAssignment = { name: AssName, value: AssValue, cover: coverPicURL }
        assignmentList.push(newAssignment);
        console.log(assignmentList);
        console.log(coverPicURL);
        return element
    }

    document.getElementById('addButton').addEventListener("click", () => {
        addAssignment.show();

    });

    modalSubmit.addEventListener("click", function (e) {

        e.preventDefault()

        if (assignmentNameInput.value.length < 1 || assignmentPaymentInput.value <= 1) {
            assignmentHelp.innerHTML = `Money > 1, Name.Length < 25`;
            assignmentHelp.style.color = 'red'

        } else {
            assignmentHelp.innerHTML = `Recommended cover ratio is 3:2`;
            assignmentHelp.style.color = 'grey'

            cardContainer.appendChild(
                createChild(assignmentPaymentInput.value, assignmentNameInput.value, coverPicURL)
            );



            const buttons = document.querySelectorAll('.handleButton');

            buttons.forEach((button, index) => {
                button.addEventListener("click", () => {
                    detailsAssignment.show();
                    cardTitle.innerHTML = assignmentList[index].name;
                    cardText.innerHTML = assignmentList[index].value;
                    detailsCover.src = assignmentList[index].cover;

                })
            });
            addAssignment.hide();


        }




        document.getElementById('consoler').addEventListener('click', () => {
            console.log(assignmentList);
        });
    }
    )
});