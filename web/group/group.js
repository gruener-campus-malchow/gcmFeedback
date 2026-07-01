document.addEventListener("alpine:init", () => {
    Alpine.data("group", () => ({
        init() {
            this.id = new URLSearchParams(window.location.search).get("id");
            if (this.id === null) this.id = document.cookie.match(/(?:^|;\s*)groupID=([^;]*)/)?.[1];

            console.log(this.id);

            this.isValid = false; // TODO: fetchAPI("validateID", id)
            if (this.isValid) {
                document.cookie = `groupID=${this.id}; max-age=${60 * 60 * 24}`;
            } else {
                document.cookie = "groupID=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        },

        // TODO: items
    }))
})