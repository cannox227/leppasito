function extractVideoId(value) {
    try {
        const url = new URL(value);

        if (url.hostname === 'youtu.be') {
            return url.pathname.slice(1) || null;
        }

        if (url.hostname.endsWith('youtube.com')) {
            return url.searchParams.get('v');
        }
    } catch {
        return null;
    }

    return null;
}

function pickVideo(videos, random = Math.random()) {
    return videos[Math.floor(random * videos.length)];
}

function shuffleVideos(videos, random = Math.random) {
    const shuffled = [...videos];

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(random() * (index + 1));
        [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }

    return shuffled;
}

function getVideoTitle(data) {
    return typeof data?.title === 'string' ? data.title : '';
}

function chatGptUrl(videoUrl) {
    const prompt = `Explain what this YouTube video is about in English. Video URL: ${videoUrl}`;
    return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
}

if (typeof module !== 'undefined') {
    module.exports = { extractVideoId, pickVideo, shuffleVideos, getVideoTitle, chatGptUrl };
}

if (typeof document !== 'undefined') {
    const button = document.getElementById('shuffle-button');
    const player = document.getElementById('video-player');
    const title = document.getElementById('video-title');
    const understandLink = document.getElementById('understand-link');
    const message = document.getElementById('shuffle-message');
    const wheel = document.getElementById('shuffle-wheel');

    async function shuffleVideo() {
        button.disabled = true;
        player.hidden = true;
        title.textContent = '';
        title.hidden = true;
        understandLink.hidden = true;
        message.textContent = 'Spinning...';
        wheel.classList.remove('is-spinning');
        void wheel.offsetWidth;
        wheel.classList.add('is-spinning');

        try {
            const response = await fetch('./videos.json');
            const videos = await response.json();
            const links = Array.isArray(videos) ? videos : [];
            const selectedLink = shuffleVideos(links)[0] || '';
            const videoId = extractVideoId(selectedLink);

            if (!videoId) {
                throw new Error('No valid YouTube videos found.');
            }

            const titleRequest = fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(selectedLink)}&format=json`)
                .then((result) => result.ok ? result.json() : {})
                .catch(() => ({}));
            const [, metadata] = await Promise.all([
                new Promise((resolve) => setTimeout(resolve, 2200)),
                titleRequest
            ]);

            title.textContent = getVideoTitle(metadata);
            title.hidden = !title.textContent;
            understandLink.href = chatGptUrl(selectedLink);
            understandLink.hidden = false;
            player.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`;
            player.hidden = false;
            message.textContent = 'Enjoy your randomly selected video.';
        } catch (error) {
            wheel.classList.remove('is-spinning');
            message.textContent = error.message;
        } finally {
            button.disabled = false;
        }
    }

    button.addEventListener('click', shuffleVideo);
}
