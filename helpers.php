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
    function webpack($file, $buildDirectory = 'assets/builds', $devUrl = 'http://localhost:3000/static')
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
