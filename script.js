
// It ensures that page loads first and then script works. pageLoad function is for index.html and 
// displaySelectedBrands fucntion is for category pages. 

window.addEventListener('DOMContentLoaded', function() {
    pageLoad(); 
    displaySelectedBrands(); 
});

function pageLoad() {

    // Check if the form and its elements exist before proceeding
    var formHandle = document.forms.brand_form;
    console.log(formHandle);

    if (!formHandle) {
        console.log("Form not found, skipping brand display.");
        return; 
    }

    // Accessing brand checkboxes
    var check_name = formHandle.brand; 

    // Catching each button by their id
    var lip_cat = document.getElementById("lipstick");
    var blu_cat = document.getElementById("blush");
    var mas_cat = document.getElementById("mascara");
    var fou_cat = document.getElementById("foundation");
    var eye_cat = document.getElementById("eyeliner");

    var head_brand = document.getElementById("heading_brand");

    // All buttons are calling function redirect on click
    lip_cat.onclick = redirect;
    blu_cat.onclick = redirect;
    mas_cat.onclick = redirect;
    fou_cat.onclick = redirect;
    eye_cat.onclick = redirect;

    function redirect() {

        // Created and empty array and stored in a variable check_values
        var check_values = [];

       // Whenever user selects a checkbox, it will push the value of that checkbox in the array check_values
        for (var i = 0; i < check_name.length; i++) {
            if (check_name[i].checked) {
                check_values.push(check_name[i].value);
            }
        }

        // If user doesn't select any brand, then it will give an alert saying "Please select at least one brand"
        if (check_values.length === 0) {
            head_brand.style.color = "red";

            // It will not redirect to any web page
            return false;
        }
        
        // This is used to set the array check_values as a JSON object and store it in the local storage so that when we click on a button
        // and it redirects to another web page then we can get this array from local storage and any changes in the CSS will display
        localStorage.setItem("selectedBrands", JSON.stringify(check_values));


    }
    
}


function displaySelectedBrands() {
    // For displaying brands on category pages (lipstick.html, blush.html, etc.)

    // Only run this code on category pages (e.g., lipstick.html, blush.html)
    if (!window.location.pathname.includes("Lipstick.html") &&
        !window.location.pathname.includes("Blush.html") &&
        !window.location.pathname.includes("Mascara.html") &&
        !window.location.pathname.includes("Eyeliner.html") &&
        !window.location.pathname.includes("Foundation.html")) {
        console.log("Not a product page, skipping brand display.");
        return;
    }
    
    var selectedBrands = JSON.parse(localStorage.getItem("selectedBrands")) || [];
    console.log("Selected Brands:", selectedBrands);

    // Identify the current page and set logic for sections
    var macDiv = document.getElementById("mac_sec");
    var lorealDiv = document.getElementById("loreal_sec");
    var maybellineDiv = document.getElementById("maybelline_sec");

    // Exit if the page doesn't have product sections (e.g., index.html)
    if (!macDiv || !lorealDiv || !maybellineDiv){
     
    console.log("Product sections not found on this page.");
    return;

    } 

    // Hide all sections initially
    macDiv.style.display = "none";
    lorealDiv.style.display = "none";
    maybellineDiv.style.display = "none";

    // Show sections based on selected brands
    if (selectedBrands.includes("mac")) {
        macDiv.style.display = "block";
    }
    if (selectedBrands.includes("loreal")) {
        lorealDiv.style.display = "block";
    }
    if (selectedBrands.includes("maybelline")) {
        maybellineDiv.style.display = "block";
    }

    // Adjust border styles for better display when multiple sections are shown
    if (selectedBrands.length > 1) {
        macDiv.style.borderRight = "2px solid #F2CDFF";
        lorealDiv.style.borderRight = "2px solid #F2CDFF";
    } else {
        macDiv.style.borderRight = "none";
        lorealDiv.style.borderRight = "none";
    }

}