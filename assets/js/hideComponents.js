// This code watches for changes to storage (from popup) and hides components in real time
chrome.storage.onChanged.addListener(function (keyChanged, namespace) {
	for (let [key, { oldValue, newValue }] of Object.entries(keyChanged)) {
		hideComponents({ [key]: newValue });
	}
});

// this function gets data from chrome.storage.sync
function getStorageData() {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get(
			{
				sidebar: true,
				comments: true,
			},
			(result) => {
				chrome.runtime.lastError ? reject(chrome.runtime.lastError.message) : resolve(result);
			}
		);
	});
}

// this function takes an object (the result of getStorageData OR the storage onChanged listener) and injects <style> into the document's head to hide or show components
function hideComponents(result) {
	let hiddenStyles = document.createElement('style');
	document.head.appendChild(hiddenStyles);
	Object.entries(result).forEach(([component, hidden]) => {
		let id = component === 'sidebar' ? 'secondary' : component;
		hiddenStyles.innerHTML += hidden
			? `#${id} {visibility: hidden} `
			: `#${id} {visibility: initial} `;
	});
}

// Run code
getStorageData().then(function (result) {
	hideComponents(result);
});
