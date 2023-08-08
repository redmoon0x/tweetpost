document.addEventListener("DOMContentLoaded", function() {
    const createButton = document.getElementById("create-button");
    const tweetContainer = document.querySelector(".tweet-container");
    const tweetForm = document.getElementById("tweet-form");
    const generateButton = document.getElementById("generate-btn");
    const profilePicInput = document.getElementById("profile-pic-input");
  
    createButton.addEventListener("click", function() {
      tweetForm.style.display = "block";
    });
  
    generateButton.addEventListener("click", function() {
      const profilePicFile = profilePicInput.files[0]; // Get uploaded file
      const name = document.getElementById("name-input").value;
      const twitterHandle = document.getElementById("handle-input").value;
      const tweetContent = document.getElementById("tweet-input").value;
  
      // Update profile picture if a file is uploaded
      if (profilePicFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const profilePicElement = tweetContainer.querySelector(".profile");
          profilePicElement.src = event.target.result;
        };
        reader.readAsDataURL(profilePicFile);
      }
  
      const nameElement = tweetContainer.querySelector(".name");
      nameElement.textContent = name;
  
      const twitterHandleElement = tweetContainer.querySelector(".twitter-handle");
      twitterHandleElement.textContent = "@" + twitterHandle;
  
      const tweetContentElement = tweetContainer.querySelector(".tweet");
      tweetContentElement.textContent = tweetContent;
  
      // Hide the form after generating the tweet
      tweetForm.style.display = "none";
    });
  });
  const downloadButton = document.getElementById("download-button");

  downloadButton.addEventListener("click", () => {
    const tweetContainer = document.querySelector(".tweet-container");
  
    html2canvas(tweetContainer).then((canvas) => {
      // Create a new canvas to apply rounded corners
      const roundedCanvas = document.createElement("canvas");
      const roundedCtx = roundedCanvas.getContext("2d");
  
      // Set canvas dimensions
      roundedCanvas.width = canvas.width;
      roundedCanvas.height = canvas.height;
  
      // Apply rounded corners using clip
      roundedCtx.beginPath();
      roundedCtx.moveTo(10, 0);
      roundedCtx.lineTo(roundedCanvas.width - 10, 0);
      roundedCtx.quadraticCurveTo(roundedCanvas.width, 0, roundedCanvas.width, 10);
      roundedCtx.lineTo(roundedCanvas.width, roundedCanvas.height - 10);
      roundedCtx.quadraticCurveTo(roundedCanvas.width, roundedCanvas.height, roundedCanvas.width - 10, roundedCanvas.height);
      roundedCtx.lineTo(10, roundedCanvas.height);
      roundedCtx.quadraticCurveTo(0, roundedCanvas.height, 0, roundedCanvas.height - 10);
      roundedCtx.lineTo(0, 10);
      roundedCtx.quadraticCurveTo(0, 0, 10, 0);
      roundedCtx.closePath();
      roundedCtx.clip();
  
      // Draw the image with rounded corners
      roundedCtx.drawImage(canvas, 0, 0);
  
      // Convert rounded canvas to data URL
      const roundedImgData = roundedCanvas.toDataURL("image/png");
  
      // Create a download link
      const downloadLink = document.createElement("a");
      downloadLink.href = roundedImgData;
      downloadLink.download = "tweet_image.png";
      downloadLink.style.display = "none";
  
      document.body.appendChild(downloadLink);
      downloadLink.click();
      
      document.body.removeChild(downloadLink);
    });
  });
  