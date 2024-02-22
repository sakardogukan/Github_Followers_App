const searchInput = document.getElementById("searchText")
const searchBtn = document.querySelector("#button")
const cardsDiv = document.querySelector(".cards")

console.log(searchInput)
console.log(searchBtn)
console.log(cardsDiv)

searchBtn.addEventListener("click", () => {
    if (searchInput.value) {
        console.log(searchInput.value)
        getData(searchInput.value)
        cardsDiv.innerHTML = ""
    } else {
        alert("Lütfen Github kullanıcı adı giriniz....")
    }
})

async function getData(userName) {
    console.log(userName)
    let URL = `https://api.github.com/users/${userName}/followers?per_page=100`

    try {
        let response = await fetch(URL)
        console.log(response)
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            data.forEach(user => (createElem(user)))
        } else {
            cardsDiv.innerHTML = `<h2 class="text-danger">Kullanıcı Bulunamadı</h2>`
        }

    } catch (error) {
        console.log(error)

    }
    // sakardogukan
}

async function createElem(user) {
    const { login, avatar_url, html_url } = user
    cardsDiv.innerHTML += `
    <div class="col justify-content-center text-center">
        <div class="card border border-dark">
        <img src="${avatar_url}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${login}</h5>
            <a href="${html_url}" target="_blank" class="btn btn-dark">View Profile</a>
        </div>
        </div>
    </div>
    `
}