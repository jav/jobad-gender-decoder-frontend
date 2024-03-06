/*
    The two default confgs are:
    process.env.NODE_ENV = "production"
    process.env.NODE_ENV = "development"

    config will be a map of config keys
    value will depend on "production" = true|false

    The rationale for this file is that I haven't figured out how to combine
    .env and gh-pages build yet. This is a workaround for that.
    */

    const production = process.env.NODE_ENV === "production"

    const config = {
        API_BASE_URL: production ? "https://europe-north1-writing-coach.cloudfunctions.net/jobAdApi" : "http://localhost:8080",
    }
    export default config
    