///started searching books///
const searchBooks = () => {
    const input = document.getElementById('input');
    const inputText = input.value;
    if (input.value === '') {
        document.getElementById('showBooks').innerText = `Searchfield cannot be empty`;
        document.getElementById('cardContainer').textContent = '';
    } else {
        spin('block');
        document.getElementById('cardContainer').textContent = '';
        document.getElementById('showBooks').innerText = '';
        input.value = '';
        const url = `https://openlibrary.org/search.json?q=${inputText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayResult(data.docs));
    }

}
///search book function end/// 



///spinner time interval bonus
const spin = param => {
    document.getElementById('spinner').style.display = param;
}
///spinner added///


///Display Search Result///
const displayResult = allData => {
    document.getElementById('showBooks').innerText = `${allData.length} search result founds`
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.textContent = '';
    if (allData.length === 0) {
        document.getElementById('showBooks').innerText = `No Books Found on these keyword.Try another`;
        spin('none');
    } else {
        // for each loop started
        allData.forEach(data => {
            // creating cards
            const div = document.createElement('div');
            div.classList.add('col-md-4');
            div.innerHTML = `
            <div class="card p-2 m-3">
                <img style="height: 15rem;" class="img-fluid" src="https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg">
                <h3>${data.title}</h3>
                <p class="p-0 m-0"><span class="fw-bold">Author:</span> ${data.author_name ? data.author_name : 'No name'?.slice(0, 100)}</p>
                <p class="p-0 m-0"><span class="fw-bold">Publisher:</span> ${data.publisher ? data.publisher : 'No name'?.slice(0, 100)}</p>
                <p class="p-0 m-0"><span class="fw-bold">First publish :</span> ${data.first_publish_year ? data.first_publish_year : 'No year'?.slice(0, 100)}</p>
            </div>
            `
            // appending div to create cards
            cardContainer.appendChild(div);
        });
        // for each loop bonus end
        spin('none');

    }

}
                            // End //



