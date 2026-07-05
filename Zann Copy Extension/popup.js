const bypassBtn = document.getElementById('bypassBtn');
const btnLabel = document.getElementById('btn-label');
const btnIcon = document.getElementById('btn-icon');
const statusText = document.getElementById('status-text');

function updateUI(isActive) {
    if (isActive) {
        bypassBtn.classList.add('active');
        btnIcon.innerText = "🔓";
        btnLabel.innerText = "Bypass Aktif";
        statusText.innerText = "Status: Terbuka & Bisa Disalin";
        statusText.style.color = "#38bdf8";
    } else {
        bypassBtn.classList.remove('active');
        btnIcon.innerText = "🔒";
        btnLabel.innerText = "Aktifkan Bypass";
        statusText.innerText = "Status: Idle / Terkunci";
        statusText.style.color = "#64748b";
    }
}

async function init() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || tab.url.startsWith('chrome://')) return;

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => window.zannBypassSafe ? window.zannBypassSafe.active : false
    }, (res) => {
        if (res && res[0]) updateUI(res[0].result);
    });
}

bypassBtn.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || tab.url.startsWith('chrome://')) {
        alert("Tidak bisa digunakan di halaman internal browser.");
        return;
    }

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    }, (res) => {
        if (res && res[0]) updateUI(res[0].result);
    });
});

document.addEventListener('DOMContentLoaded', init);