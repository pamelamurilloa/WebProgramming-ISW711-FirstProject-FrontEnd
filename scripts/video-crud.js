const clearForm = () => {
    videoInput = document.getElementById("video-name");
    urlInput = document.getElementById("video-url");
    title = document.getElementById("video-form-title");

    videoInput.value = "";
    urlInput.value = "";

    title.text = "Add new video";
}

const editVideo = (videoID) => {
    console.log("the following video is being edited" + videoID);

    videoInput = document.getElementById("video-name");
    urlInput = document.getElementById("video-url");
    title = document.getElementById("video-form-title");

    // video = GET VIDEO FROM BACKEND

    // videoInput.value = video.name;
    // urlInput.value = video.url;

    title.text = "Editing video";
}

const deleteVideo = (videoID) => {
    console.log("the following video is being deleted" + videoID);
}

// This will populate the playlist select, for now, there is only the playlist "general"
const playlistSelect = document.getElementById("playlist");
// Event listener for changes in the playlist selection
// playlistSelect.addEventListener('change', populateTable);

// const url = 'http://localhost:3000/tubekids/playlist';

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

// This will populate the table "video" with all the videos in the table
// const populateTable = () => {
//     const selectedPlaylist = playlistSelect.value;
//     const videosTable = document.getElementById('video-table')[0];
//     videosTable.innerHTML = ''; // Clear existing table content

//     const apiUrl = `http://localhost:3000/tubekids/playlist/${selectedPlaylist}`;

//     fetch(apiUrl)
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

// // Initial population of the table
// populateTable();