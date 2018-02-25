import { Page } from "./page";

const pages = ["World_Instance", "Raids"].map(page => new Page(page));

async function downloadPages() {
    await Promise.all(pages.map(page => page.download()));
}

downloadPages();