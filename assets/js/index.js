const API_KEY = "MJxQU2QSeSbw78R8ToBiJ5IH011yJsO43QdzMQ3wkq7FFyspIUCVKH9J";
const API_URL_IMAGES = "https://api.pexels.com/v1/";
const API_URL_VIDEOS = "with https://api.pexels.com/videos/";
const GALLERY_CONTAINER = document.querySelector("#js-images-container");

function createLightbox() {}




// Function to fetch images by category from Pexels API
async function getImagesByCategory(category, page){

    let fetchURL = "";
    fetchURL = `${API_URL_IMAGES}search?query=${category}&per_page=20`;

    try {

        const response = await fetch(fetchURL, {
            headers: {
                "Authorization": API_KEY,
            }
        });

        const jsonResponse = await response.json();
        let photosCollection = jsonResponse.photos;
        console.log(jsonResponse);
        console.log("Photos Collection:", photosCollection);

        createImagesCard(photosCollection);
        startArrows(jsonResponse.next_page, jsonResponse.prev_page);

    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

function startArrows(nextPage, prevPage) {
    const nextArrow = document.querySelector('.js-next-page');
    const prevarrow = document.querySelector('.js-prev-page');
    nextArrow.addEventListener('click', () => {
        if (nextPage) {
            console.log({nextPage});
            // getImagesByCategory(nextPage);
        }
    });
}


function createImagesCard(images){
    images.forEach( image => {
        const imageCard =`
            <div class="image">
                <a href="${image.src.large}" data-lightbox="gallery" >
                    <figure>
                        <img src="${image.src.large}" alt="${image.alt}" loading="lazy">
                    </figure>
                </a>

                <div class="image-info">
                    <h2>Photo by: <a href="${image.photographer_url}"> ${image.photographer} on Pexels</a></h2>
                </div>
            </div>
        `;
        
        GALLERY_CONTAINER.innerHTML += imageCard;
    })

    activateLightbox();

}


function createLightbox(imageUrl, imageAlt) {
    let overlay = document.createElement("div");
    overlay.classList.add("lightbox-overlay");
    document.body.appendChild(overlay);

    let imageContainer = document.createElement("div");
    imageContainer.classList.add("lightbox-image-container");
    overlay.appendChild(imageContainer);

    let image = document.createElement("img");
    image.src = imageUrl;
    image.alt = imageAlt;

    let closer = document.createElement("span");
    closer.classList.add("lightbox-close");
    closer.innerHTML = "&times;";

    let loader = document.createElement("div");
    loader.classList.add("loader");
    for( let i = 0; i < 12; i++) {
        let bar = document.createElement("div");
        bar.classList.add(`bar${i+1}`);
        loader.append(bar);
    }

    imageContainer.append(closer);
    imageContainer.append(image);
    imageContainer.append(loader);
    overlay.append(imageContainer);


    image.onload = () => {
        loader.style.display = "none";
        image.style.opacity = "1";
        closer.style.display = "grid";
    }

    

    closer.addEventListener("click", () => {
        document.body.removeChild(overlay);
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
}


function activateLightbox() {
    if(document.querySelectorAll("a[data-lightbox]")){
        const lightboxButtons = document.querySelectorAll("a[data-lightbox]");
        lightboxButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                const imageUrl = button.getAttribute("href");
                const imageAlt = button.querySelector('img').getAttribute("alt");
                createLightbox(imageUrl, imageAlt);
            });
        });
    }
}





getImagesByCategory("Bikes");

