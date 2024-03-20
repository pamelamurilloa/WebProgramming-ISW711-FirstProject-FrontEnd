const apiUrl = "http://localhost:3000/tubekids/playlists";
const videoInput = document.getElementById("video-name");
const urlInput = document.getElementById("video-url");
const videoTable = document.getElementById("video-table");
const title = document.getElementById("video-form-title");
const playlistSelect = document.getElementById("playlist");
const videoForm = document.getElementById("submit-video-changes");
const videoId = document.getElementById("videoId");;
let currentPlaylist;

const userId = "65f98c36b1881269046291a3";

const clearForm = () => {
    videoInput.value = "";
    urlInput.value = "";

    title.innerHTML = "Add new video";
}

const populateSelect = async () => {
    const res = await fetch(
        apiUrl + "/user/" + userId, 
        {
            method: 'GET',
        }
    )
    const playlists = await res.json();

    playlists.forEach(playlist => {
        const option = document.createElement('option');
        option.value = playlist._id;
        option.textContent = playlist.name;
        playlistSelect.append(option);
      });

    populateTable();

}

const populateTable = async() => {
    let playlistId = playlistSelect.value;

    if (playlistId) {
        const res = await fetch(
            apiUrl + "/" + playlistId, 
            {
                method: 'GET'
            }
        )
        currentPlaylist = await res.json();
        videoTable.innerHTML = "";

        currentPlaylist.videos.forEach(video => {
            const row = document.createElement('tr');
            row.innerHTML =
            `
                <td>${video.name}</td>
                <td>${video.url}</td>
                <td>
                    <a  onclick="editVideo('${video._id}')" class="modify edit" ><img src="../utils/images/modify-icon.png" alt="edit"/></a>
                    <a  onclick="deleteVideo('${video._id}')" class="modify delete" ><img src="../utils/images/delete-icon.png" alt="delete"/></a>
                </td>
            `
            videoTable.append(row);
        })
    };
}

// Initial population of the table
populateSelect();
populateTable();


videoForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let playlistId = playlistSelect.value;

    if (title.innerHTML == "Add new video" && videoInput.value != "" && urlInput.value.startsWith("https://www.youtube.com/")) {
        const res = await fetch(
            apiUrl + "/" + playlistId, 
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify({name: videoInput.value, url: urlInput.value})
            }
        )

        console.log(res.json());
        populateTable();
    }
    else if (title.innerHTML != "Add new video") {
        let video = currentPlaylist.videos.find(video => video._id === videoId.value);

        video.name = videoInput.value != "" ? videoInput.value : video.name;
        video.url = urlInput.value.startsWith("https://www.youtube.com/") ? urlInput.value : video.url;

        const res = await fetch(
            apiUrl + "/" + playlistId + "/" + video._id, 
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'PATCH',
                body: JSON.stringify({name: video.name, url: video.url})
            }
        )

        console.log( await res.json());
    
        populateTable();
    }
    
})

const editVideo = async (videoID) => {

    let video = currentPlaylist.videos.find(video => video._id === videoID);

    videoInput.value = video.name;
    urlInput.value = video.url;
    videoId.value = videoID;

    title.innerHTML = "Editing video";
}


const deleteVideo = (videoID) => {
    console.log("the following video is being deleted" + videoID);
}

// // This will populate the playlist select, for now, there is only the playlist "general"

// // Event listener for changes in the playlist selection
// playlistSelect.addEventListener('change', populateTable);


// // <!-- <script>
// // const baseUrl = 'http://localhost:3000/tubekids/videos/65e8cbd529c81399978e32d0'
// // async function getInfo() {
// //     const res = await fetch (baseUrl, {
// //         method: 'GET'
// //     })
// //     console.log(res);
// //     const data = await res.json();
// //     console.log(data);
// // }
// // </script> -->

// const url = 'http://localhost:3000/tubekids/playlists';

// fetch(url, {
//     method: 'GET',
// })
// .then(res => res.json())
// .then(playlists => {

//     for (let categoria of playlists) {
//     let option = document.createElement("option");
//     option.value = categoria.id;
//     option.text = categoria.name;
//     playlistSelect.add(option);
//     }
// })
// .catch(function(error) {
//     console.error("¡Error!", error);
// })

// // This will populate the table "video" with all the videos in the table
// const populateTable = async () => {
//     const selectedPlaylist = playlistSelect.value;
//     const videosTable = document.getElementById('video-table')[0];
//     videosTable.innerHTML = ''; // Clear existing table content


//     const playlistArray = fetch(apiUrl)
//     .then(response => {
//         if (!response.ok) {
//         throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         videos = data;
//     })
//     .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//     });

//     // Populate the table with videos from the selected playlist
//     playlists[selectedPlaylist].forEach(video => {
//         const row = `<tr>
//                     <td>${video.id}</td>
//                     <td>${video.name}</td>
//                     <td>${video.url}</td>
//                     <td>
//                         <a img="../utils/images/modify-icon.png" onclick="editVideo(video.id)" class="modify edit" alt="edit"></a>
//                         <a img="../utils/images/delete-icon.png" onclick="deleteVideo(video.id)" class="modify delete" alt="delete"></a>
//                     </td>
//                     </tr>`;

//         videosTable.insertAdjacentHTML('beforeend', row);
//     });
// }

