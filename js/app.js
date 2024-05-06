document.addEventListener("DOMContentLoaded", function () {

    const addAssignment = new bootstrap.Modal('#addAssignment');
    const detailsAssignment = new bootstrap.Modal("#detailsAssignment")
    const assignmentNameInput = document.getElementById('assignmentName');
    const assignmentPaymentInput = document.getElementById('paymentAmount');
    const modalSubmit = document.getElementById('modal-submit');
    const cardContainer = document.getElementById('card-container');
    const assignmentHelp = document.getElementById('assignmentHelp');

    function createChild(value, name) {
        let element = document.createElement("div")

        element.innerHTML = `<div id="assignmentCard" class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title" id="assignmentCardName">${name}</h5>
                <p class="card-text">NRS ${value}</p>
                <a href="#" class = "handleButton btn btn-success">Handle</a>
            </div>
        </div>`




        return element
    }

    const cards = []


    document.getElementById('addButton').addEventListener("click", () => {
        addAssignment.show();
    });


    modalSubmit.addEventListener("click", function () {
        // assignmentNameOutput.innerHTML = assignmentNameInput.value;
        // assignmentPaymentOutput.innerHTML = assignmentPaymentInput.value;
        // assignmentCard.style.display = 'block';

        if (assignmentNameInput.value.length <= 4 || assignmentPaymentInput.value <= 1) {
            assignmentHelp.innerHTML = `Please fill in the details properly.`;
            assignmentHelp.style = 'color: red;'
        } else {
            cardContainer.appendChild(
                createChild(assignmentPaymentInput.value, assignmentNameInput.value)
            );

            // Select all elements with class "handleButton" and add event listeners to each
            document.querySelectorAll(".handleButton").forEach(elem => {
                elem.addEventListener("click", () => {
                    detailsAssignment.show();
                });
            });

            addAssignment.hide();
            assignmentHelp.innerHTML = `Make sure the name accurately describes the gig.`;
            assignmentHelp.style = 'color: black;'
        }
    });

});
