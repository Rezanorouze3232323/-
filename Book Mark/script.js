const modal = document.querySelector("#modal");
const modalShow = document.querySelector("#show-modal");
const modalClose = document.querySelector("#close-modal");
const bookmarkFrom = document.querySelector("#bookmark-form");
const websiteNameEl = document.querySelector("#Website-name");
const websiteUrlEl = document.querySelector("#Website-url");
const bookmarksContainer = document.querySelector("#bookmark-container");

let bookmarks = {};

// Show Modal
function showModal() {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
}

// Modal Event Listeners
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", function () {
  modal.classList.remove("show-modal");
});
window.addEventListener("click", function (e) {
  if (e.target === modal) modal.classList.remove("show-modal");
});

// Validate Form
function Validate(nameValue, urlValue) {
  const expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  const regex = new RegExp(expression);

  if (nameValue && urlValue) {
    if (urlValue.match(regex)) {
      alert("اضافه شد");
      return true;
    }
    if (!urlValue.match(regex)) {
      alert("آدرس رو اشتباه دادی");
      return false;
    }
  } else {
    alert("تمامی فیلد هارو پر کنید، لطفا");
    return false;
  }
}

// Build Bookmarks DOM
function buildBookmarks() {
  // Remove all bookmark element
  bookmarksContainer.textContent = "";
  // Build items
  Object.keys(bookmarks).forEach(function (id) {
    console.log(id, bookmarks[id]);
    const { name, url } = bookmarks[id];
    // Item
    const item = document.createElement("div");
    item.classList.add("item");
    // Close Icon
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("bx", "bxs-trash");
    closeIcon.setAttribute("title", "حذف کردن");
    closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`);
    // Favicon / Link Container
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    // Favicon
    const favIcon = document.createElement("img");
    favIcon.setAttribute(
      "src",
      `https://www.google.com/s2/favicons?domain=${url}&sz=${256}`
    );
    // Link
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    // Append to bookmark container
    item.append(closeIcon, linkInfo);
    linkInfo.append(favIcon, link);
    bookmarksContainer.appendChild(item);
  });
}

// Fetch Bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorage if available
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    // Create bookmarks object in local storage
    const id = `https://www.google.com/`;
    bookmarks[id] = {
      name: "گوگل",
      url: "https://www.google.com/",
    };
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

// Delete Bookmark
function deleteBookmark(id) {
  if (bookmarks[id]) {
    delete bookmarks[id];
  }
  // Update bookmark array in localStorage, repopulate DOM
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}

// Handle Data from Form
function storeBookmark(e) {
  e.preventDefault();
  let nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  nameValue = nameValue === "" ? false : nameValue;
  urlValue = urlValue === "" ? false : urlValue;

  if (!Validate(nameValue, urlValue)) {
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };

  bookmarks[urlValue] = bookmark;

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkFrom.reset();
  websiteNameEl.focus();
}

// Event Listeners
bookmarkFrom.addEventListener("submit", storeBookmark);

// On Load, Fetch Bookmarks
fetchBookmarks();
