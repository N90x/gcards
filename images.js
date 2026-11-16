let imgs = []

let imageNames = [
    'star', 'trashcan', 'forward'
]

//let iconColour = 'White'
let iconColour = 'Black'

async function loadImages() {
    for (let name of imageNames) {
        let path = `/assets/icons/${iconColour}/1x/${name}.png`
        imgs[name] = await loadImage(path)
    }
}