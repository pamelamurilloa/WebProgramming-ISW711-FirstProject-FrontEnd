const apiUrl = "http://localhost:3000/tubekids/playlists";
const videoInput = document.getElementById("video-name");
const urlInput = document.getElementById("video-url");
const videoTable = document.getElementById("video-table");
const title = document.getElementById("video-form-title");
const playlistSelect = document.getElementById("playlist");
const videoForm = document.getElementById("submit-video-changes");
const videoId = document.getElementById("videoId");;
let currentPlaylist;

const userId = "65fa852db94c1e6a89608399";

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


const deleteVideo = async (videoId) => {
    let playlistId = playlistSelect.value;

    const res = await fetch(
        apiUrl + "/" + playlistId + "/" + videoId, 
        {
            method: 'DELETE',
        }
    )
    console.log(res.json());
    populateTable();
}

// Initial population of the table
populateSelect();
populateTable();


