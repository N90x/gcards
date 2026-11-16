let generateButton;
let amountSlider;
let amountDiv;
let typeSelect;
let newButton;

let fetchedData;

async function generateGenres() {
    isLoading = true

    let num = amountSlider.value().toString()
    let typ = typeSelect.selected()

    if (typ == 'Genres') { typ = 'genre' }
    if (typ == 'Stories') { typ = 'story' }
    generateButton.hide()
    amountDiv.hide()
    amountSlider.hide()
    typeSelect.hide()

    newButton.show()

    fetchedData = await httpGet(`https://binaryjazz.us/wp-json/genrenator/v1/${typ}/${num}/`)
    console.log(fetchedData)




}

function getNewList() {
    generateButton.show()
    amountDiv.show()
    amountSlider.show()
    typeSelect.show()

    newButton.hide()

    fetchedData = undefined;
    selectedCard = -1
}

function updateAmountDiv() {
    amountDiv.html(`${amountSlider.value()}`)
    typeSelect.position(centre.x + amountDiv.width + 5, centre.y + 50)

}

function initElemnts() {
    generateButton = createButton('Generate')
    generateButton.size(180, 100)
    generateButton.style('font-size', '18px');
    generateButton.position(centre.x, centre.y - generateButton.height)
    generateButton.mousePressed(generateGenres)

    newButton = createButton('New List')
    newButton.position(centre.x, height - 20)
    newButton.mousePressed(getNewList)
    newButton.hide()


    amountDiv = createButton('10')
    amountDiv.position(centre.x, centre.y + 50)

    amountSlider = createSlider(1, 50, 10)
    amountSlider.position(centre.x, centre.y + 75)

    typeSelect = createSelect()
    typeSelect.option('Genres')
    typeSelect.option('Stories')
    typeSelect.selected('Genres')
    typeSelect.position(centre.x + amountDiv.width + 5, centre.y + 50)

    amountSlider.changed(updateAmountDiv)
}