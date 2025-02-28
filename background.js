chrome.downloads.search({}, function(items) {
    console.log("Last downloaded file:", items[0]);
});
