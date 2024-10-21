"use strict";

const username = document.getElementById("username_input");
const search = document.getElementById("search");
const data = document.getElementById("info");
const quickInfo = document.getElementById("quick_sum");
quickInfo.style.display = "none";

const URL = "https://api.github.com/users/";

search.addEventListener("click", () => {
  data.textContent = "";
  const user = username.value.toLowerCase();
  getGitInfo(URL + "" + user);
});

async function getGitInfo(URL) {
  data.innerHTML = "";
  const response = await fetch(URL);
  if (response.ok) {
    quickInfo.style.display = "block";
    const userinfo = await response.json();
    quickInfo.innerHTML = `
        <img src="${userinfo["avatar_url"]}" alt="Profile Picture" >
        <h3>${userinfo["login"]}</h3>
        <h5>${userinfo["id"]}</h5>`;
    for (const key in userinfo) {
      const insert = document.createElement("p");
      insert.id = key;
      const value = userinfo[key];
      if (typeof value === "string" && value.substring(0, 8) === "https://") {
        insert.innerHTML = `${key}: <a target="_blank" href=${value}>${value}</a>`;
      } else if (
        typeof value === "string" &&
        value.substring(0, 4) === "www."
      ) {
        insert.innerHTML = `${key}: <a target="_blank" href=https://${value}>${value}</a>`;
      } else insert.innerHTML = `${key}: ${value}`;
      data.appendChild(insert);
    }
  } else {
    console.error(`ERROR ${response.status}`);
    const insert = document.createElement("p");
    insert.id = "error";
    insert.innerHTML = `ERROR: Unable to find user ${username.value.toLowerCase()}`;
    quickInfo.innerHTML = "";
    quickInfo.style.display = "none";
    data.appendChild(insert);
  }
}
