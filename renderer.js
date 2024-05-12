const information = document.getElementById("info");

information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`;
information.addEventListener("click", async () => {
  await window.versions.ping();
});

// show printers
(async () => {
  await window.versions.getPrinters((_, printers) => {
    const printerList = document.getElementById("printers");

    const text = [...printers].map(({ name }) => name).join(", ");

    printerList.innerText = text;
  });
})();

// print 1
const current = document.getElementById("current");
const options = {
  silent: false,
  printBackground: true,
  color: false,
  margin: {
    marginType: "printableArea",
  },
  landscape: false,
  pagesPerSheet: 1,
  collate: false,
  copies: 1,
  header: "Header of the Page",
  footer: "Footer of the Page",
};

current.addEventListener("click", async () => {
  await window.versions.print(options);
});

// print 2
const url = document.getElementById("url");
const options2 = {
  silent: true,
  landscape: false,
  pagesPerSheet: 1,
  collate: false,
  copies: 1,
  header: "Header of the Page",
  footer: "Footer of the Page",
};

url.addEventListener("click", async () => {
  await window.versions.printSilently(options2);
});
