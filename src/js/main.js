const body = document.querySelector('body');

body.addEventListener('keyup', function(e) {
    
    // Define only for the input with search class
    if (e.target.classList.contains('search')){
        // Select and put it in a variables
        const search = e.target.value.toUpperCase();
        const li = document.querySelectorAll('.project');

        // loop through the list
        for (let i = 0; i < li.length; i++){
            // select the text content
            title = li[i].querySelector('.title');
            sub = li[i].querySelector('.sub-title');
            desc = li[i].querySelector('.desc');
            // Insert all of them
            txtValue = `${title.textContent || title.innerText} ${sub.textContent || sub.innerText} ${desc.textContent || desc.innerText}`

            if (txtValue.toUpperCase().indexOf(search) > -1){
                li[i].style.display = "";
            } else {
                li[i].style.display = 'none';
            }
        }

        // Remove the value if user press Escape
        if(e.code === "Escape"){
            e.target.value = '';
            li.forEach(x => x.style.display = "");
        }

    }

});