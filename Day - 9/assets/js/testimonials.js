const testimonial = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://api.npoint.io/c321db8ebe9b6b07eb83", true);

  xhr.onload = function () {
    if (xhr.status == 200) {
      resolve(JSON.parse(xhr.response));
    } else {
      reject("Error Loaded Data");
    }
  };

  xhr.onerror = function () {
    reject("404 Not Found");
  };

  xhr.send();
});

async function showTestimonial() {
  try {
    const response = await testimonial;
    let testimonialHtml = ``;

    response.forEach((item) => {
      testimonialHtml += `
      <div class="testimonial">
        <img src="${item.image}" alt="testimonial" class="profile-testimonial">
        <p class="quote">${item.content}</p>
        <p class="author">- ${item.author}</p>
        <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
      </div>`;
    });

    document.getElementById("testimonials").innerHTML = testimonialHtml;
  } catch (error) {
    console.log(error);
  }
}

async function filterTestimonials(rating) {
  try {
    const response = await testimonial;
    let testimonialHtml = ``;

    const dataFilter = response.filter((data) => data.rating === rating);
    if (dataFilter.length === 0) {
      testimonialHtml = `<h1> Data not found!</h1>`;
    } else {
      dataFilter.forEach((item) => {
        testimonialHtml += `
        <div class="testimonial">
          <img src="${item.image}" alt="testimonial" class="profile-testimonial">
          <p class="quote">${item.content}</p>
          <p class="author">- ${item.author}</p>
          <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
        </div>`;
      });
    }

    document.getElementById("testimonials").innerHTML = testimonialHtml;
  } catch (error) {
    console.log(error);
  }
}

// Fungsi untuk menampilkan semua testimoni
function allTestimonial() {
  showTestimonial();
}

// Callback function to display all testimonials on page load
showTestimonial();
