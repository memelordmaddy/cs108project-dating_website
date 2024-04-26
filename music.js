

<audio id="audio" style="display: none;" loop>
            <source src="music.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
        
        <script>
            window.addEventListener("load", function() {
                var audio = document.getElementById("audio");
                
                // Check if playback time is stored in sessionStorage
                var storedTime = sessionStorage.getItem("audioPlaybackTime");
                if (storedTime) {
                    audio.currentTime = parseFloat(storedTime);
                }
                
                // Start or resume audio playback
                audio.play();
                
                // Store current playback time in sessionStorage when navigating away from the page
                window.addEventListener("beforeunload", function() {
                    sessionStorage.setItem("audioPlaybackTime", audio.currentTime);
                });
            });
        </script>