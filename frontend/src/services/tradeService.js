import api from "../api/api";


export function getTrades() {
    return api.get("/trades/");
}


export function createTrade(payload) {
    return api.post(
        "/trades/",
        payload
    );
}


export function updateTrade(
    tradeId,
    payload
) {
    return api.put(
        `/trades/${tradeId}`,
        payload
    );
}


export function deleteTrade(tradeId) {
    return api.delete(
        `/trades/${tradeId}`
    );
}


export function uploadTradeScreenshot(
    tradeId,
    formData
) {
    return api.post(
        `/trades/${tradeId}/screenshot`,
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data"
            }
        }
    );
}


function getDownloadFilename(
    response,
    fallbackFilename
) {
    const contentDisposition =
        response.headers[
            "content-disposition"
        ];

    if (!contentDisposition) {
        return fallbackFilename;
    }

    const utf8FilenameMatch =
        contentDisposition.match(
            /filename\*=UTF-8''([^;]+)/i
        );

    if (utf8FilenameMatch?.[1]) {
        return decodeURIComponent(
            utf8FilenameMatch[1]
        );
    }

    const filenameMatch =
        contentDisposition.match(
            /filename="?([^";]+)"?/i
        );

    return (
        filenameMatch?.[1]
        || fallbackFilename
    );
}


function saveBlobResponse(
    response,
    fallbackFilename
) {
    const filename =
        getDownloadFilename(
            response,
            fallbackFilename
        );

    const blobUrl =
        window.URL.createObjectURL(
            response.data
        );

    const downloadLink =
        document.createElement("a");

    downloadLink.href = blobUrl;
    downloadLink.download = filename;
    downloadLink.style.display = "none";

    document.body.appendChild(
        downloadLink
    );

    downloadLink.click();
    downloadLink.remove();

    window.URL.revokeObjectURL(
        blobUrl
    );
}


async function downloadTradesExport(
    endpoint,
    fallbackFilename
) {
    const response = await api.get(
        endpoint,
        {
            responseType: "blob"
        }
    );

    saveBlobResponse(
        response,
        fallbackFilename
    );

    return response;
}


export function downloadTradesCsv() {
    return downloadTradesExport(
        "/exports/trades/csv",
        "tradepilot_trades.csv"
    );
}


export function downloadTradesPdf() {
    return downloadTradesExport(
        "/exports/trades/pdf",
        "tradepilot_report.pdf"
    );
}


export function downloadTradesExcel() {
    return downloadTradesExport(
        "/exports/trades/excel",
        "tradepilot_trades.xlsx"
    );
}