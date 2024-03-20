const playlistUrl = "http://localhost:3000/tubekids/playlists";
    const page = document.getElementsByClassName("page-content")[0];
    let userId = localStorage.getItem("userId");


    const getEmbedUrl = (videoUrl) => {
    var videoIdMatch = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    
    if (videoIdMatch && videoIdMatch[1]) {
        var videoId = videoIdMatch[1];
        var embedUrl = "https://www.youtube.com/embed/" + videoId;
        return embedUrl;
    } else {
        return null;
    }
}
    const populateFeed = async() => {

        const res = await fetch (
            playlistUrl + "/user/" + userId, 
            {
                method: 'GET'
            }
        );

        const playlists = await res.json();
        
        const playlist = playlists.find(playlist=>playlist.name ==='General');

        console.log(playlist);
        page.innerHTML = "";

        playlist.videos.forEach(video => {
            const newVideo = document.createElement('div');
            newVideo.classList.add("video-card");
            newVideo.innerHTML =
            `
            <h3>${video.name}</h3>
            <iframe 
            src="${getEmbedUrl(video.url)}?rel=0&modestbranding=1&loop=1" title="${video.name}" frameborder="0" allow="accelerometer; encrypted-media; gyroscope" allowfullscreen>
                <style>
                .ytp-chrome-top, .ytp-title-channel, .ytp-title-text, .ytp-youtube-buttom {
                    opacity: 0 !important;
                    height: 0 !important;
                }</style>
            </iframe>

            `

            page.append(newVideo);
        })
    };


populateFeed();