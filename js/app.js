document.addEventListener("DOMContentLoaded", function () {

    const addAssignment = new bootstrap.Modal('#addAssignment');
    const detailsAssignment = new bootstrap.Modal("#detailsAssignment")
    const assignmentNameInput = document.getElementById('assignmentName');
    const assignmentPaymentInput = document.getElementById('paymentAmount');
    const modalSubmit = document.getElementById('modal-submit');
    const cardContainer = document.getElementById('card-container');
    const assignmentHelp = document.getElementById('assignmentHelp');
    const cardTitle = document.getElementById('card-title');
    const cardText = document.getElementById('card-text');
    const assignmentList = [];

    function createChild(AssValue, AssName) {
        let element = document.createElement("div");

        element.innerHTML = `<div id="assignmentCard" class="card" style="width: 18rem;">
        <img src="https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_960_720.jpg" class="card-img-top" alt="...">    
        <div class="card-body">
            
                <h5 class="card-title" id="assignmentCardName">${AssName}</h5>
                <p class="card-text">NRS ${AssValue}</p>
                <a href="#" class = "handleButton btn btn-success">Handle</a>
            </div>
        </div>`
        let newAssignment = { name: AssName, value: AssValue }
        assignmentList.push(newAssignment);

        return element
    }

    document.getElementById('addButton').addEventListener("click", () => {
        addAssignment.show();
    });

    modalSubmit.addEventListener("click", function () {
        event.preventDefault();
        if (assignmentNameInput.value.length <= 4 || assignmentPaymentInput.value <= 1) {
            assignmentHelp.innerHTML = `Please fill in the details properly.`;
            assignmentHelp.style = 'color: red;'
        } else {
            cardContainer.appendChild(
                createChild(assignmentPaymentInput.value, assignmentNameInput.value)
            );


            const buttons = document.querySelectorAll('.handleButton');

            buttons.forEach((button, index) => {
                button.addEventListener("click", () => {
                    detailsAssignment.show();
                    cardTitle.innerHTML = assignmentList[index].name;
                    cardText.innerHTML = assignmentList[index].value;
                })
            });

        }


        addAssignment.hide();
        assignmentHelp.innerHTML = `Make sure the name accurately describes the gig.`;
        assignmentHelp.style = 'color: black;'


        document.getElementById('consoler').addEventListener('click', () => {
            console.log(assignmentList);
        });
    }
    )
});
