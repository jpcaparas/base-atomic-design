<?php
if (! function_exists('webpack')) {
    /**
     * Get the path to an asset file handled with Webpack.
     *
     * @param  string  $file
     * @param  string  $buildDirectory
     * @param  string  $devUrl
     * @return string
     *
     * @throws \InvalidArgumentException
     */
    function webpack($file, $buildDirectory = 'public/assets/builds', $devUrl = 'http://localhost:3000/static')
    {
        static $manifest;
        static $manifestPath;

        if (is_null($manifest) || $manifestPath !== $buildDirectory) {
            // Check manifest file exists
            if (file_exists($buildDirectory.'/manifest.json')) {
                $manifest = json_decode(file_get_contents($buildDirectory.'/manifest.json'), true);
                $manifestPath = $buildDirectory;
            } else {
                return $devUrl.'/'.$file;
            }
        }

        if (isset($manifest[$file])) {
            return '/'.trim($buildDirectory.'/'.$manifest[$file], '/');
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <!-- Base (These 3 meta tags need to be *first*) -->
        <meta charset="utf-8"/>
        <meta http-equiv="x-ua-compatible" content="ie=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

        <!-- SEO/Marketing -->
        <meta name="keywords" content="comma, seperated, values"/><!-- TODO -->
        <meta name="description" content="Description Here (150 chars)"/><!-- TODO -->
        <meta name="subject" content="your website's subject"/><!-- TODO -->
        <meta name="author" content=""/><!-- TODO -->
        <!-- TODO: Remove if not needed
        <meta name="googlebot" content="index,follow"/>
        <meta name="google" content="nositelinkssearchbox"/>
        <meta name="google-site-verification" content="verification_token"/>
        -->
        <meta name="abstract" content=""/><!-- TODO (optional) -->
        <meta name="topic" content=""/><!-- TODO (optional) -->
        <meta name="summary" content=""/><!-- TODO (optional) -->
        <meta name="classification" content="business"/>
        <meta name="url" content="https://example.com/"/><!-- TODO -->
        <meta name="identifier-URL" content="https://example.com/"/><!-- TODO -->
        <meta name="directory" content="submission"/>
        <meta name="category" content=""/><!-- TODO (optional) -->
        <meta name="coverage" content="Worldwide"/>
        <meta name="distribution" content="Global"/>
        <meta name="rating" content="General"/>
        <meta name="referrer" content="never"/>

        <!-- Open Graph -->
        <meta property="fb:app_id" content=""/><!-- TODO (optional) -->
        <meta property="og:url" content="https://example.com/page.html"/><!-- TODO-->
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="Content Title"/><!-- TODO-->
        <meta property="og:image" content="https://example.com/image.jpg"/><!-- TODO-->
        <meta property="og:description" content="Description Here (150 chars)"/><!-- TODO-->
        <meta property="og:site_name" content="Website Name"/><!-- TODO-->
        <meta property="og:locale" content="en_GB"/>

        <!-- Twitter -->
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="@site_account"/><!-- TODO-->
        <meta name="twitter:creator" content="@pixelfusion_nz"/>
        <meta name="twitter:url" content="https://example.com/page.html"/><!-- TODO-->
        <meta name="twitter:title" content="Content Title"/><!-- TODO-->
        <meta name="twitter:description" content="Description Here (150 chars)"/><!-- TODO-->
        <meta name="twitter:image" content="https://example.com/image.jpg"/><!-- TODO-->

        <!-- Google -->
        <meta itemprop="name" content="Content Title"/><!-- TODO-->
        <meta itemprop="description" content="Description Here (150 chars)"/><!-- TODO-->
        <meta itemprop="image" content="https://example.com/image.jpg"/><!-- TODO-->

        <!-- Apple -->
        <meta name="apple-mobile-web-app-title" content="Website Name (8-10 characters)"/><!-- TODO-->

        <title>Content Title | Website Name</title><!-- TODO -->

        <link rel="canonical" href=""/><!-- TODO -->

        <link rel="icon" href="/favicon.ico"/>
        <link rel="stylesheet" href="<?= webpack('app.css') ?>"/>
        <!-- <link rel="manifest" href="manifest.json"> TODO: Remove if not needed -->

        <!-- Prefetching, preloading, prebrowsing -->
        <!-- TODO: Remove if not needed
        <link rel="dns-prefetch" href="//example.com/"/>
        <link rel="preconnect" href="https://www.example.com/"/>
        <link rel="prefetch" href="https://www.example.com/"/>
        <link rel="prerender" href="https://example.com/"/>
        <link rel="subresource" href="styles.css"/>
        <link rel="preload" href="image.png"/>
        -->

        <script src="<?= webpack('polyfill.js') ?>" defer></script>
        <script src="<?= webpack('bundle.js') ?>" defer></script>
    </head>
    <body>
        <header class="header" role="banner">

            <nav class="nav" role="navigation">
                <a class="nav-item current" href="/">Home</a>
                <a class="nav-item" href="/about">About</a>
                <a class="nav-item" href="/contact">Contact</a>
            </nav>

        </header>

        <main role="main">

            <article class="content"></article>

            <aside class="sidebar" role="complementary"></aside>

        </main>


        <footer class="footer" role="contentinfo">
            <p class="copyright">&copy; 2016 COMPANY</p>
            <p class="attribution">
                <a href="//pixelfusion.co.nz">Created by Pixel Fusion</a>
            </p>
        </footer>
    </body>
</html>
