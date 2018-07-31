const socket = io();

function getTokenIndex(el) {
  let index = 0;
  while ((el = el.previousSibling)) {
    if (el.tagName === "SPAN") {
      index++;
    }
  }
  return index;
}

function toggleToken(e) {
  if (e.target.tagName !== "SPAN") {
    return;
  }
  const index = getTokenIndex(e.target);
  if (selectedTokens.has(index)) {
    selectedTokens.delete(index);
    e.target.classList.remove("selected");
    socket.emit("deselect", { tokenIndex: index });
  } else {
    selectedTokens.add(index);
    e.target.classList.add("selected");
    socket.emit("select", { tokenIndex: index });
  }
}

function updateToken(tokenIndex) {
  const selected = selectedTokens.has(tokenIndex);
  document
    .querySelector(`.content span:nth-of-type(${tokenIndex + 1})`)
    .classList.toggle("selected", selected);
}

socket.on("select", ({ tokenIndex }) => {
  selectedTokens.add(tokenIndex);
  updateToken(tokenIndex);
});

socket.on("deselect", ({ tokenIndex }) => {
  selectedTokens.delete(tokenIndex);
  updateToken(tokenIndex);
});

function init() {
  document.querySelector(".content").addEventListener("click", toggleToken);
  selectedTokens.forEach(updateToken);
}

addEventListener("DOMContentLoaded", init);
