const database = firebase.database().ref();

const allMessages = document.querySelector("#all-messages");
const BlogTitleElem = document.querySelector("#BlogTitle");
const MessageElem = document.querySelector("#message");
const sendBtn = document.querySelector("#send-btn");
sendBtn.onclick = updateDB;

function updateDB(event) {
    //prevent default behavior
    event.preventDefault();

    //make a temporary object called data
    let data = {
        BLOGTITLE: BlogTitleElem.value,
        MESSAGE: MessageElem.value
    };

    //print for good measure
    console.log(data);

    database.push(data);

    MessageElem.value="";
    BlogTitleElem.value="";
}

/**
 * @TODO add the addMessageToBoard function as an event
 * handler for the "child_added" event on the database
 * object
 */
database.on("child_added", addMessageToBoard);

/**
 * @TODO create a function called addMessageToBoard that
 * takes one parameter rowData which:
 *      - console.logs the data within rowData
 *      - creates a new HTML element for a single message
 *        containing the appropriate data
 *      - appends this HTML to the div with id
 *        #all-messages (we should have a reference already!)
 * 
 */
function addMessageToBoard(rowData){
    console.log(rowData);

    let data = rowData.val();

    console.log(data);

    //get the singleMessageElem
    let singleMessage = makeSingleMessageHTML(data.BLOGTITLE, data.MESSAGE);

    //append singleMessage to #all-messages
    allMessages.append(singleMessage);
}

function makeSingleMessageHTML(usernameTxt, messageTxt){
    //create a parent div
    let parentDiv = document.createElement("div");
    
    //add a .single-message class
    parentDiv.setAttribute("class", "single-message");

    let blogTitleH4 = document.createElement("h4");

    blogTitleH4.classList.add("single-message-title");

    blogTitleH4.innerHTML = usernameTxt + " ---> ";

    parentDiv.append(blogTitleH4);

    let messageH4 = document.createElement("h4");

    messageH4.innerHTML = messageTxt;

    parentDiv.append(messageH4);

    return parentDiv;
}

/**
 * @BONUS add an onkeyup event handler to the form HTML
 * element so the user can also submit the form with the
 * Enter key
 * 
 * @BONUS use an arrow function
 */
const form = document.querySelector("form");
form.onkeyup = (event) => {
    event.preventDefault();

    if (event.keyCode === 13){
        updateDB(event);
    }
}