
export function ensureStorageSchema(gen: number) {
    console.log("Storage schema generation:", localStorage.gen)
    localStorage.gen ||= 0;
    if (localStorage.gen < gen) {
        console.log(`Clearing schema, latest generation: ${gen}`)
        localStorage.clear();
        sessionStorage.clear();
        localStorage.gen = gen;
    }
}


// TODO: not thread safe, breaks if tabs open too quickly
export function loadPeerID(): string {
    localStorage.tabCount ||= 0;
    let tabCount = parseInt(localStorage.tabCount);
    localStorage.tabCount = tabCount + 1;

    addEventListener('beforeunload', function () {
        let tabCount = parseInt(localStorage.tabCount);
        if (tabCount > 0) {
            localStorage.tabCount = tabCount - 1;
        }
    });

    // Duplicated Tabs will have the same tabID and peerID as their parent Tab; we must force reset those values
    if (!sessionStorage.tabID || window.performance.getEntriesByType("navigation")[0].type == 'back_forward') {
        sessionStorage.tabID = localStorage.tabCount;
        sessionStorage.myPeerID = getTabState("myPeerID");
    }

    console.log("tab id: " + sessionStorage.tabID);
    return sessionStorage.myPeerID;
}


export function getTabState(key: string) {
    let tabID = sessionStorage.tabID;
    return localStorage[`tabState:${tabID}:` + key] || "";
}

export function setTabState(key: string, value: any) {
    let tabID = sessionStorage.tabID;
    sessionStorage[key] = value;
    localStorage[`tabState:${tabID}:` + key] = value;
}
