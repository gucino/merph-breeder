
window.addEventListener('resize', function() {
    checkOverflow();
});

function checkOverflow() {
    var buttonOuter = document.getElementById('button_outer');
    var testButton = document.getElementById('hamburger');

    // Check if screen size is less than 768 pixels
    if (window.innerWidth < 550) {
        // Do something specific for small screens
        // You can modify this block as needed for your requirements
        document.querySelectorAll('#button').forEach(function(button) {
            button.style.display = 'none';
        });
        testButton.style.display = 'inline-block';
    } else {
        // Original overflow check
        if (buttonOuter.scrollWidth > buttonOuter.clientWidth) {
            // Overflow detected
            document.querySelectorAll('#button').forEach(function(button) {
                button.style.display = 'none';
            });
            testButton.style.display = 'inline-block';
        } else {
            // No overflow
            document.querySelectorAll('#button').forEach(function(button) {
                button.style.display = 'inline-block';
            });
            testButton.style.display = 'none';
        }
    }
}


// Initial check on page load
window.addEventListener('load', function() {
    checkOverflow();
});


// fix menu bar once header disappear
document.addEventListener("DOMContentLoaded", function() {
    var heading = document.getElementById("heading");
    var buttonOuter = document.getElementById("button_outer");
    var article = document.querySelector("article"); // Adjust the selector based on your actual structure
    // var bigimage = document.querySelector('.big_image');

    window.addEventListener("scroll", function() {
        var totalPadding = 10 + buttonOuter.offsetHeight;
        if (window.scrollY > heading.offsetHeight) {
            buttonOuter.classList.add("fixed");
            article.style.paddingTop = totalPadding + "px";
            // bigimage.style.paddingTop = totalPadding - 10 + "px";
        } else {
            buttonOuter.classList.remove("fixed");
            article.style.paddingTop = "10px";
            // bigimage.style.paddingTop = "0px";
        }
    });
});

// animated paragraph
document.addEventListener("DOMContentLoaded", function() {
var paragraphs = document.querySelectorAll(".animated-paragraph");

var observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("appear");
            observer.unobserve(entry.target);
        }
    });
});

paragraphs.forEach(paragraph => {
    observer.observe(paragraph);
});
});

// imgae transition
$(document).ready(function() {
var currentImageIndex = 0;

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % $('.image-wrapper img').length;
    var translateValue = -currentImageIndex * 100 + '%';
    $('.image-wrapper').css('transform', 'translateX(' + translateValue + ')');
}

// Set an interval to show the next image every 3 seconds
setInterval(showNextImage, 60000);
});

// move image
document.addEventListener('scroll', function () {
    if (window.location.pathname.split('/').pop() === 'index_breed.html') {
        // Get the scroll position
        var scrollPosition = window.scrollY;
        
        // determine movement speed
        var windowHeight = window.innerHeight;
        var speed_move = 0.001 * windowHeight

        // Calculate the new position for moving-image1 based on scroll position
        var newPosition = (scrollPosition * speed_move); // Adjust the multiplier to control the speed
        var newPosition_2 = (scrollPosition * speed_move * -1); // Adjust the multiplier to control the speed
        
        // Limit the movement to the center
        center_limit = (document.querySelector('.moving-image1').offsetWidth / 2)
        var container_width = document.querySelector('.container').offsetWidth
        center_limit_1 = (container_width / 2) - center_limit
        newPosition = Math.min(newPosition, center_limit_1);
        cenetr_limit_2 = ((container_width / 2) - (center_limit)) * -1
        newPosition_2 = Math.max(newPosition_2 , cenetr_limit_2);


        // Apply the new position to moving-image1
        document.querySelector('.moving-image1').style.transform = 'translateX(' + newPosition + 'px)';
        document.querySelector('.moving-image2').style.transform = 'translateX(' + newPosition_2 + 'px)';
        
        // make transparent
        if (center_limit_1 == newPosition) {
            document.querySelector('.moving-image1').style.opacity = 0.9;
            document.querySelector('.moving-image2').style.opacity = 0.9;
        } else {
            document.querySelector('.moving-image1').style.opacity = 1;
            document.querySelector('.moving-image2').style.opacity = 1;
        }
        // Check if newPosition is greater than or equal to center_limit_1
        if (newPosition >= center_limit_1) {
            // If true, set the exact position for the third image (snake_6.jpg)
            document.querySelector('.moving-image3').style.opacity = 1;
            document.querySelector('.moving-image3').style.left = center_limit_1 + 'px';
        } else {
            // If not true, hide the third image
            document.querySelector('.moving-image3').style.opacity = 0;
        }
    }


});


function sortProducts() {
    var productList = document.querySelector('.product-list');
    var products = Array.from(document.querySelectorAll('.product-item'));

    // Sort by what
    var sortBy = document.getElementById('sortDropdown').value;

    // Add class for animation before sorting
    products.forEach(function (product) {
        product.classList.add('animate');
    });
    
    products.sort(function (a, b) {
        var valueA, valueB;

        // Extract values based on the selected sort criteria
        if (sortBy === 'priceAsc' || sortBy === 'priceDesc') {
            valueA = parseInt(a.querySelector('li:nth-child(5)').textContent.split(': ')[1]);
            valueB = parseInt(b.querySelector('li:nth-child(5)').textContent.split(': ')[1]);
        } else if (sortBy === 'hatchAsc' || sortBy === 'hatchDesc') {
            valueA = new Date(a.querySelector('li:nth-child(3)').textContent.split(': ')[1]).getTime();
            valueB = new Date(b.querySelector('li:nth-child(3)').textContent.split(': ')[1]).getTime();
        } else if (sortBy === 'codeAsc' || sortBy === 'codeDesc') {
            valueA = a.querySelector('li:nth-child(1)').textContent.split(': ')[1].toLowerCase();
            valueB = b.querySelector('li:nth-child(1)').textContent.split(': ')[1].toLowerCase();
        }

        // Determine the order based on the selected sort criteria
        if (sortBy.includes('Asc')) {
            if (typeof valueA === 'string') {
                return valueA.localeCompare(valueB);
            } else {
                return valueA - valueB;
            }
        } else {
            if (typeof valueA === 'string') {
                return valueB.localeCompare(valueA);
            } else {
                return valueB - valueA;
            }
        }
    });

    // Rearrange the product items in the DOM
    products.forEach(function (product) {
        productList.appendChild(product);
    });

    // Remove class after sorting (to trigger the animation)
    setTimeout(function () {
        products.forEach(function (product) {
            product.classList.remove('animate');
        });
    }, 250); // Adjust the timeout based

}


function performSearch() {
    var searchTerm = document.getElementById('searchBar').value.toLowerCase();
    var searchTermsArray = searchTerm.split(' ').filter(Boolean);
    var genderFilter = document.getElementById('genderFilter').value.toLowerCase();
    var productItems = document.querySelectorAll('.product-item');
    console.log('search: ' + searchTerm)
    console.log(searchTerm === '')

    // Identify products that match the criteria
    var productsToShow = [];
    var productsNotShow = [];
    productItems.forEach(function (product) {
        var productTitle = product.querySelector('.product-title').textContent.toLowerCase();
        var listItems = product.querySelectorAll('ul li');
        var productGender = product.querySelector('ul li:nth-child(2)').textContent.toLowerCase().split(': ')[1]; // Assuming gender is the second list item
        var matchFound = (searchTerm === '' || searchTermsArray.some(function (term) {
            return productTitle.includes(term) || Array.from(listItems).some(function (li) {
                return li.textContent.toLowerCase().includes(term);
            });
        })) && (genderFilter === '' || genderFilter === productGender);

        if (matchFound) {
            productsToShow.push(product);
            // product.style.display = 'block';
        } else {
            productsNotShow.push(product);
            // product.style.display = 'none';
        }
    });
    // Apply the 'animate' class to the visible products
    productItems.forEach(function (product) {
        // product.style.display = 'block';
        product.classList.add('animate');
    });

    // Apply the 'animate' class to the visible products
    productsNotShow.forEach(function (product) {
        setTimeout(function () {
            product.style.display = 'none';
        }, 500); 
    });
    // Apply the 'animate' class to the visible products
    productsToShow.forEach(function (product) {
        product.style.display = 'block';
        // product.classList.remove('animate');
        setTimeout(function () {
            product.classList.remove('animate');
        }, 500); 
    });
}








function toggleMenu() {
    
    var sideMenu = document.getElementById("sideMenu");
    var computedStyle = window.getComputedStyle(sideMenu);
    var currentLeft = parseInt(computedStyle.getPropertyValue('left')) || 0;

    if (currentLeft === 0) {
        sideMenu.style.left = "-200px"; // Slide out
    } else {
        sideMenu.style.left = "0"; // Slide in
    }
}

function closeMenu() {
    var sideMenu = document.getElementById("sideMenu");
    sideMenu.style.left = "-200px"; // Slide out
}
function closeMenuAndRedirect(url) {
    var sideMenu = document.getElementById("sideMenu");
    
    // Set up a transitionend event listener
    sideMenu.addEventListener('transitionend', function() {
        // This function will be called when the transition (animation) is complete
        window.location.href = url;
    });

    // Start the slide-out animation
    sideMenu.style.left = "-200px";
}

