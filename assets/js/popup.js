// Adds a change listener to each popup option to update chrome.storage object.
let checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'));
checkboxes.forEach((box) => {
	box.addEventListener('change', function () {
		chrome.storage.sync.set({
			[box.id]: box.checked,
		});
	});
});

// On opening popup, fetch stored settings and update the UI checkboxes to match.
function restorePopupOptions() {
	chrome.storage.sync.get(
		{
			sidebar: true,
			comments: true,
		},
		function (result) {
			document.getElementById('sidebar').checked = result.sidebar;
			document.getElementById('comments').checked = result.comments;
		}
	);
}

restorePopupOptions();
