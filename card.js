let selectedCard = -1



function newCard() {
    selectedCard++
    if (selectedCard == fetchedData.length) {
        selectedCard--
        console.log('Out of cards')
        return
    }
}

let favourites = []
let bin = []

function favouriteCard() {
    favourites.push(fetchedData[selectedCard])
    fetchedData.splice(selectedCard, 1)
    selectedCard--
}

function binCard() {
    fetchedData.splice(selectedCard, 1)
    selectedCard--
    console.log(selectedCard)
}

let cardH = 250
let cardW = cardH * 1.5
let cardOffset = 1.5
let pileOffset = 3
let drawHoverZone = { x: 0, y: 0 };
let drawIsHovered = false

let favHov, binHov;

let favBarX = 0;

function drawCards() {
    // Pile positions
    let rPile = { x: centre.x + cardW / 1.5, y: centre.y - cardH / 3 }
    let lPile = { x: centre.x - cardW / 1.5, y: centre.y - cardH / 3 }

    // Drawpile
    let remainingCards = fetchedData.length - (selectedCard + 1)
    drawHoverZone = {
        x: (rPile.x - cardW / 2) + ((remainingCards - 1) * pileOffset),
        y: (rPile.y - cardH / 2) + ((remainingCards - 1) * pileOffset)
    }

    drawIsHovered = mouseInBounds(drawHoverZone.x, drawHoverZone.y, cardW, cardH)

    push()
    translate(rPile.x, rPile.y)
    fill(colours.cardBack)
    stroke(0)
    strokeWeight(2)

    for (let i = 0; i < remainingCards; i++) {
        if (i == remainingCards - 1) { // Top card
            if (drawIsHovered) { fill(colours.hov) }
        }

        rect(i * pileOffset, i * pileOffset, cardW, cardH)
    }

    if (drawIsHovered) {
        fill(0)
        noStroke()
        //text('Draw Card', 10, 10)
    }
    pop()

    // Face up pile
    favHov = false, binHov = false;
    if (selectedCard >= 0) {

        push()
        translate(lPile.x, lPile.y)
        for (let i = 0; i <= selectedCard; i++) {
            let x = i * pileOffset, y = i * pileOffset;
            fill(colours.cardFront)
            stroke(0)
            rect(x, y, cardW, cardH)

            if (i == selectedCard) {
                fill(0)
                noStroke()
                textWrap(WORD)
                text(fetchedData[selectedCard], x, y, cardW)

            }

        }
        pop()

        let topCardPos = { x: lPile.x + selectedCard * pileOffset, y: lPile.y + selectedCard * pileOffset }

        noSmooth()
        image(imgs['star'], topCardPos.x - cardW / 2 + 20, topCardPos.y + cardH / 2 - 20)
        image(imgs['trashcan'], topCardPos.x + cardW / 2 - 20, topCardPos.y + cardH / 2 - 25)

        let favButton = { x: topCardPos.x - cardW / 2, y: topCardPos.y + cardH / 2 - 40 }
        let binButton = { x: topCardPos.x + cardW / 2 - 40, y: topCardPos.y + cardH / 2 - 40 }
        if (mouseInBounds(favButton.x, favButton.y, 40, 40)) {
            /*noFill()
            rect(favButton.x + 20, favButton.y + 20, 40, 40)
            fill(0)*/
            favHov = true
        }
        if (mouseInBounds(binButton.x, binButton.y, 40, 40)) {
            /*noFill()
            rect(binButton.x + 20, binButton.y + 20, 40, 40)
            fill(0)*/
            binHov = true
        }
    }
}

let favouriteScroll = 0
let favWidth = 100
function mouseWheel(e) {
    if (mouseX < favWidth) {
        favouriteScroll -= e.deltaY / 2
        favouriteScroll = Math.min(favouriteScroll, 0)
        //console.log(favouriteScroll)
    }
}

function drawFavouritesBar() {
    // Favourites
    push()
    
    let barSpeed = 5
    //if (favourites.length>0) {    
    if (mouseX < favWidth) {
        //console.log('fav bar showing')

        if (favBarX < favWidth) {
            favBarX += barSpeed
        }
    } else {
        if (favBarX > 0) {
            favBarX -= barSpeed
        }
    }

    if (favBarX > 0) {
        rectMode(CORNER)
        fill(colours.backGroundSec)
        rect(0, 0, favBarX, height)

        fill(0)
        textAlign(LEFT, TOP)
        textSize(12)

        let displayString = favourites.join('\n\n')
        textWrap(WORD)

        text(
            displayString,
            favBarX - favWidth + 10,
            75 + favouriteScroll,
            favWidth - 20
        )

        noSmooth()
        image(
            imgs['star'],
            favBarX - favWidth / 2,
            25 + favouriteScroll
        )
    }

    image(imgs['forward'], favBarX + 15, 25)
    //}
    pop()
}
function mousePressed() {
    if (drawIsHovered) {
        newCard()
    }

    if (favHov) {
        favouriteCard()
    }

    if (binHov) {
        binCard()
    }
}