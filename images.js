let imgs = []

let imageNames = [
    'star', 'trashcan', 'forward'
]

//let iconColour = 'White'
let iconColour = 'Black'

async function loadImages() {
    for (let name of imageNames) {
        let path = `icons/${name}.png`
        imgs[name] = await loadImage(path)
    }
}
