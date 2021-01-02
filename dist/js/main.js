const requestRoom = new XMLHttpRequest();
const ulItem = document.querySelector('ul.style');
const requestButton = document.querySelector('button.request')

// function to create an HTML element
function createElement(name, property = null, value = null) {
    const element = document.createElement(name);
    if (property && value) {
        element[property] = value;
    }
    return element
}

/* 
1. When ajax is ready .onreadystatechange function will run
2. There 4 stages (.readyState) 1-3 means it is still in progress, while 4 means that request was made and we have received data
3. .status - 200, 300, 404, 500
200 - everything went well,
404 - file not found
500 - there is an error with getting the file
*/
requestRoom.onreadystatechange = () => {
    if (requestRoom.readyState === 4) {
        if (requestRoom.status === 200) {
            const jsObject = JSON.parse(requestRoom.responseText);
            let tempInnerText = '';
            requestButton.style.display = "none";
            for (let i = 0; i < jsObject.length; i++) {
                const roomNumber = jsObject[i].room;
                const roomAvailability = jsObject[i].availability;
                let tempLi = '';
                if (roomAvailability == "full") {
                    tempLi += `<li class="full">Room ${roomNumber} - ${roomAvailability}</li>`
                } else {
                    tempLi += `<li>Room ${roomNumber} - ${roomAvailability}</li>`
                }
                tempInnerText += tempLi;
            }
            ulItem.innerHTML = tempInnerText;
            ulItem.style.display = 'block';
        }
    }
}
// 'GET' or 'POST'
// 'Location of file that we are trying to get'
requestRoom.open('GET', 'data/employees.json', true);

requestRoom.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
// When button is pressed we send the XML Request.
requestButton.addEventListener('click', (e) => {
    requestRoom.send();
})