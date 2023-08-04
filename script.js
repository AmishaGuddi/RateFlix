const addMovie = document.getElementById("addMovie");
const showBox = document.getElementById("Movie");

const detail = document.getElementById("MovieDetails");
const detailTitle = document.getElementById("detailTitle");
const detailImage = document.getElementById("detailImage");
const detailGenre = document.getElementById("detailGenre");
const detailRating = document.getElementById("detailRating");
const detailDesc = document.getElementById("detailDesc");

// --------- Show ---------

const show = () => {
  fetch("http://localhost:5000/Movies", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      data.map((el) => {
        const div1 = document.createElement("div");
        div1.className = "div1";

        const image = document.createElement("img");
        image.src = el.image;
        const description = document.createElement("p");
        description.innerText = el.description;
        const name = document.createElement("h2");
        const genre = document.createElement("h5");
        const rating = document.createElement("h5");
        name.innerText = el.name;
        genre.innerText = `Genre : ${el.genre}`;
        rating.innerText = `Rating : ${el.rating}`;
        const btn1 = document.createElement("button");
        const btn2 = document.createElement("button");
        const btn3 = document.createElement("button");
        btn1.innerText = "Edit";
        btn1.className = "btn btn-danger btn-sm my-1 mx-1";
        btn2.innerText = "Delete";
        btn2.className = "btn btn-danger btn-sm my-1 mx-1";
        btn3.innerText = "Read";
        btn3.className = "btn btn-danger btn-sm my-1 mx-1";

        // --------- Edit ---------

        btn1.addEventListener("click", () => {
          alert(`Want to edit ${el.name} ?`);
          const updatedName = prompt("Enter new name");
          const updatedGenre = prompt("Enter new genre");
          const updatedRating = prompt("Enter new rating");
          const updatedDesc = prompt("Enter new description");
          const updatedImage = prompt("Enter new image url");
          fetch(`http://localhost:5000/Movies/${el.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: updatedName,
              genre: updatedGenre,
              rating: updatedRating,
              description: updatedDesc,
              image: updatedImage,
            }),
          })
            .then((res) => {
              alert("Updated name Successfully");
            })
            .catch((err) => {
              alert("Error occured while updating" + err);
            });
        });

        // -------- Delete --------

        btn2.addEventListener("click", () => {
          alert(`Want to delete ${el.name} ?`);
          fetch(`http://localhost:5000/Movies/${el.id}`, {
            method: "DELETE",
          })
            .then((res) => {
              alert("Deleted the item");
            })
            .catch((err) => {
              alert("Error occured while deleting");
            });
        });

        btn3.addEventListener("click", () => {
          localStorage.setItem("id", JSON.stringify(el.id));
          window.location.href = "./user.html";
        });

        div1.append(
          image,
          name,
          genre,
          rating,
          description,
          btn1,
          btn2,
          btn3
        );
        showBox.append(div1);
      });
    });
};
show();

// -------- Details Page --------

const item = JSON.parse(localStorage.getItem("id"));
const details = async () => {
  await fetch(`http://localhost:5000/Movies/${item}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((el) => {
      detailTitle.innerText = el.name;
      detailGenre.innerText = `Genre : ${el.genre}`;
      detailRating.innerText = `Rating : ${el.rating}`;
      detailDesc.innerText = el.fullDesc;
      detailImage.src = el.image;
    });
};
details()

// --------- Add ---------

addMovie.addEventListener("click", () => {
  const addName = document.createElement("h2");
  const addImage = document.createElement("img");
  const addDesc = document.createElement("p");
  const addGenre = document.createElement("h5");
  const addRating = document.createElement("h5");
  addName.innerText = prompt("Enter Name");
  addImage.src = prompt("Enter Image");
  addGenre.innerText = prompt("Enter Genre");
  addDesc.innerText = prompt("Enter Description");
  addRating.innerText = prompt("Enter Rating");
  fetch("http://localhost:5000/Movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: addName.innerText,
      image: addImage.src,
      description: addDesc.innerText,
      genre: addGenre.innerText,
      rating: addRating.innerText,
    }),
  }).then((res) => {
    if (res.ok) {
      console.log(res);
      alert("Movie added successfully");
    } else {
      alert("Error");
    }
  });
  show();
});

function logout_btn() {
  alert("Logout Successful");
  localStorage.removeItem("token");
  window.location.href = "./index.html";
}
