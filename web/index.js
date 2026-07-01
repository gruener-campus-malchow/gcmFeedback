document.addEventListener("alpine:init", () => {
    Alpine.data("main", () => ({
        hint: "Scanne einen QR-Code oder erstelle ein neues Event",
        error: undefined,

        init() {
            this.$nextTick(() => {
                let id = new URLSearchParams(window.location.search).get("id");
                if (id) this.handleID(id);
            })
        },

        initScanner() {
            this.scanner = new Html5QrcodeScanner("qr-code-scanner", { fps: 10, qrbox: 500 });
            this.scanner.render(this.onScanSuccess.bind(this), this.onScanError);
        },

        onScanSuccess(text) {
            this.handleID(text);
        },

        onScanError(error) {
            this.setError(`QR-Code konnte nicht gescannt werden: ${error}`);
        },

        createNewEvent() {
            let newAdminID = null; // TODO: fetchAPI("newEvent")
            if (!newAdminID) {
                this.setError("Ein neues Event konnte nicht erstellt werden");
                return;
            }

            this.handleID(newAdminID);
        },

        handleID(id) {
            [type, value] = id.split(":");
            switch (type) {
                case "g":
                    window.location.href = `./group/index.html?id=${value || ""}`;
                    break;

                case "a":
                    window.location.href = `./admin/index.html?id=${value || ""}`;
                    break;

                default:
                    this.setError("Ungültige ID");
                    break;
            }
        },

        setError(error) {
            if (this.errorTimeout) clearTimeout(this.errorTimeout);
            this.error = error;
            this.errorTimeout = setTimeout(() => { this.error = undefined }, 4000);
        }
    }))
})
