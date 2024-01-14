//get the paramater
const path = location.pathname.split('/');
//init function
let init = () => {
    //check we have an ID
    if (path[1] == "")
        alert('no id')
    else {
        //call the fuction to get the body from the database
        xhrCall(path[1]);
        //load it into the editor
    }
}

//click element for the save post. 
document.getElementById('savePost').addEventListener('click', function() {
    //save the edited data back to the database.
    xhrCall(path[1], quill.root.innerHTML, "POST")
});

//XHRcall function
async function xhrCall(postId, content = "", method = 'GET') {
    try {
        //set the URL
        //get it from ENV
        const url = `${apiURL}post?postId=${postId}`;
        //set the options
        const options = {
            method: method.toUpperCase(),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        //check if it is a post
        if (method.toUpperCase() === 'POST') {
            //build the post element
            options.body = JSON.stringify({ postId: postId, content: content });
        }
        //fetch the URL
        const response = await fetch(url, options);
        //check if its ok
        if (response.ok) {
            //get the data
            const responseData = await response.json();
            //update Quill
            if (method.toUpperCase() === 'GET') 
            {
                //simple debug
                document.getElementById('debugDiv').innerHTML = "Data loaded from GET"
                //update quill
                quill.root.innerHTML = responseData.result;
            }
            //check if it is post
            if (method.toUpperCase() === 'POST') 
                document.getElementById('debugDiv').innerHTML = "Data saved via POST"

        } else {
            //error
            const errorData = await response.json();
            alert(`Error: ${errorData.error}`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

//call the init function
init();