# adaptive-video
JavaScript allows to specify multiple sources of videos for different screen resolutions.

<h1>Goal: <small>deliver smaller videos on smaller devices without preloading (without affecting the page load time)</small></h1>
  <p>This JavaScript allows to specify multiple sources of videos for different screen resolutions. The sources for different screen sizes can be specified as follows:</p>
  
  <pre>&lt;div class="video-inside"
    data-src="./video/grillingshrimp.mp4"
    data-src-1808="./video/grillingshrimp2.mp4"
    data-src-1200="./video/grillingshrimp3.mp4"
    data-src-768="./video/grillingshrimp4.mp4"&gt;&lt;/div&gt;</pre>
    
  <h2>Live demo: http://utilmind.com/demos/2019/adaptive-video/</h2>

  <h2>How it works:</h2>
  <ol>
    <li>Getting the page resolution;</li>
    <li>Getting attributes of each embedded video to find the source which best fits;</li>
    <li>Displaying the video which fits best for current page sizes;</li>
    <li>Hooking window.resize event to recalculate all embedded videos in a moment after resize (with little delay). That's making videos responsive to resize of the browser window.</li>
  </ol>
