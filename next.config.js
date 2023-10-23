const withNextIntl = require("next-intl/plugin")("./lib/i18n.ts")

/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true
    }
}

module.exports = withNextIntl(nextConfig)
