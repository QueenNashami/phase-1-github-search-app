document.addEventListener('DOMContentLoaded', () => {

const form = document.getElementById('github-form');
const searchInput = document.getElementById('search');
const userList = document.getElementById('user-list');
const reposList = document.getElementById('repos-list');

form.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
        searchUsers(searchTerm);
    }
});

async function searchUsers(username) {
    const response = await fetch(`https://api.github.com/search/users?q=${username}`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    });
    const data = await response.json();
    displayUsers(data.items);
}

async function getUserRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    });
    const data = await response.json();
    displayRepos(data);
}

function displayUsers(users) {
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        const username = user.login;
        const avatarUrl = user.avatar_url;
        const profileUrl = user.html_url;
        li.innerHTML = `
            <img src="${avatarUrl}" alt="${username}" width="50">
            <a href="${profileUrl}" target="_blank">${username}</a>
        `;
        li.addEventListener('click', () => getUserRepos(username));
        userList.appendChild(li);
    });
}

function displayRepos(repos) {
    reposList.innerHTML = '';
    repos.forEach(repo => {
        const li = document.createElement('li');
        const repoName = repo.name;
        const repoUrl = repo.html_url;
        li.innerHTML = `<a href="${repoUrl}" target="_blank">${repoName}</a>`;
        reposList.appendChild(li);
    });
}
});

