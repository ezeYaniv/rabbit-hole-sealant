window.addEventListener('load', () => {
	hideSidebar();
	hideComments();
});

window.addEventListener('focus', () => {
	hideSidebar();
	hideComments();
});

function hideSidebar() {
	let relatedSection = document.getElementById('secondary');
	relatedSection.style.visibility = 'hidden';
}

function hideComments() {
	let comments = document.getElementById('comments');
	comments.style.display = 'none';
}

