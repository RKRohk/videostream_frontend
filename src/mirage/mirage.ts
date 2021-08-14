import { createServer } from "miragejs";
export const makeServer = async ({ environment = "test" } = {}) => {

    let server = createServer({
        environment,

        routes() {
            this.get("/api/videos", () => [
                "movie.mp4"
            ])

            this.post("/api/room", () => ({ room: { name: "abcd" } }))

            this.passthrough("/sample-manifest.mpd")
        },
    })
    return server
}