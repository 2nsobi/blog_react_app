var firebaseImages = {}

//preloads all images used on website
//MAKE SURE THE VALUES FOR THE IMAGE NAMES IN FIREBASE'S DATABASE MATCH EXACTLY W/ IMAGE NAME IN STORAGE (CAUSE CASE SENSITIVE)
const preLoadAllImages = (database, storageRef) => {
    var promise = new Promise((resolve, reject) => {
        var imageCount = 0;
        var counter = 0;

        const setDownloadLink = (key, value) => {
            storageRef.child(value).getDownloadURL().then((url) => {
                firebaseImages[key.toLowerCase()] = url
                var imageDum = new Image();
                imageDum.onload = function () {
                    counter++
                    console.log(counter)
                    console.log(imageDum.src)
                    if (counter === imageCount) {
                        resolve()
                    }
                }
                imageDum.src = url
            }).catch(function (error) {
                counter++
                if (counter === imageCount) {
                    resolve()
                }
            });
        }

        database.collection('images').get().then((snapshot) => {
            snapshot.forEach((doc) => {
                const data = doc.data()
                const keys = Object.keys(data)

                imageCount = keys.length;
                for (var i = 0; i < imageCount; i++) {
                    setDownloadLink(keys[i], data[keys[i]])
                }
            })
        })
    })

    return promise
}

const getImage = (imageKey) => {
    return firebaseImages[imageKey.toLowerCase()]
}

export default preLoadAllImages
export { getImage }